import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../../socket';
import { generateRoomId } from '../../../../util/chat';
import {
  UseGetMyProfile,
  UseGetProfileView,
} from '../../../../queries/userQueries';
import { UseGetChatMessages } from '../../../../queries/chatQueries';
import Loader from '../../../../components/loader/Loader';
import { useToast } from '../../../../context/ToastContext';
import { ToastType } from '../../../../components/toast/Toast';
import { StyledMessage } from './StyledMessage';
import { StyledMessageContainer } from './MessageContainer';
import ButtonAlt from '../../../../components/button-alt/ButtonAlt';
import { SendHorizontal, Undo2 } from 'lucide-react';
import { StyledChatInputContainer } from './ChatInputContainer';
import { StyledChat } from './StyledChat';
import { StyledChatContainer } from './ChatContainer';
import Input from '../../../../components/input/Input';
import { InputSize } from '../../../../components/input/StyledInput';
import {
  ButtonAltSize,
  ButtonAltVariant,
} from '../../../../components/button-alt/StyledButtonAlt';
import StyledEmptyChat from './EmptyChat';
import ProfileInfo from '../../../profile/ProfileInfo';
import { StyledChatTopContainer } from './ChatTopContainer';
import {StyledHiderWrapper} from "../HiderWrapper"

interface ChatProps {
  chatroomId: string | null;
  back?: () => void;
  isHidden?: boolean;
}

interface Message {
  text: string;
  senderId: string;
}

export const Chat = ({ chatroomId, back, isHidden = false }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [roomId, setRoomId] = useState<string | null>(null);
  const { data: user } = UseGetMyProfile();
  const { showToast } = useToast();
  const chatRef = useRef<HTMLDivElement>(null);
  const { data: profileView } = UseGetProfileView(chatroomId!);


  if (!chatroomId) {
    console.log('chatroomId is null');
  }

  useEffect(() => {
    setRoomId(generateRoomId(user?.id || '', chatroomId || ''));
  }, [user, chatroomId]);

  /*
  TODO: Implement infinite scrolling for messages. Use "GetInfiniteChatMessages"
   from "chatQueries"
  */

  const { data: history, isLoading: isLoadingMessages } = UseGetChatMessages(
    roomId!,
    !!chatroomId
  );

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (history && !isLoadingMessages) {
      setMessages((prevMessages) => [
        ...prevMessages,
        ...history.map((msg: Message) => ({
          text: msg.text,
          senderId: msg.senderId,
        })),
      ]);
    }
  }, [history, isLoadingMessages]);

  useEffect(() => {
    if (!chatroomId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.once('connect', () => {
      socket.emit('join-chat', { recipientId: chatroomId });
    });

    socket.on('error', (err) => {
      showToast(err.message, ToastType.ALERT);
    });

    socket.on('new-message', handleChatMessage);

    return () => {
      socket.emit('leaveChatroom', chatroomId);
      socket.off('chat-message');
      socket.off('new-message');
      socket.disconnect();
    };
  }, [chatroomId]);

  const sendMessage = () => {
    if (input.trim() === '' || !chatroomId) {
      return;
    }
    socket.emit(
      'chat-message',
      { roomId, message: input },
      (ack: { success: boolean }) => {
        if (ack?.success) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, senderId: user?.id },
          ]);
          setInput('');
        } else {
          showToast('Failed to send message', ToastType.ALERT);
          setInput('');
        }
      }
    );
    setInput('');
    scrollToBottom();
  };

  const handleChatMessage = (message: Message) => {
    if (!message || message.text.trim() === '') return;
    if (message.senderId === user?.id) return;
    setMessages((prevMessages) => [...prevMessages, message]);
    scrollToBottom();
  };

  // TODO: Add Translation
  if (!chatroomId) {
    return (
      <StyledEmptyChat>
        <ButtonAlt
          variant={ButtonAltVariant.DEFAULT}
          size={ButtonAltSize.SMALL}
          onClick={back}
        >
          <Undo2 />
        </ButtonAlt>
        <div>
          <h2>Select a Message</h2>
          <p>
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </p>
        </div>
      </StyledEmptyChat>
    );
  }

  // if(isHidden) {
  //   return null
  // }

  return (
    <StyledChatContainer isHidden={isHidden}>
      <StyledChatTopContainer>
        <StyledHiderWrapper isHidden={!isHidden} >
          <ButtonAlt
            variant={ButtonAltVariant.DEFAULT}
            size={ButtonAltSize.SMALL}
            onClick={back}
          >
            <Undo2 />
          </ButtonAlt>
        </StyledHiderWrapper>

        <ProfileInfo
          username={profileView.username}
          name={profileView.name}
          profilePicture={profileView.profilePicture}
        />
      </StyledChatTopContainer>

      <StyledChat ref={chatRef}>
        {isLoadingMessages ? (
          <Loader />
        ) : (
          messages.map((msg, index) => {
            if (msg.senderId && msg.senderId !== '') {
              return (
                <StyledMessageContainer key={index}>
                  <StyledMessage key={index} isUser={user?.id === msg.senderId}>
                    {msg.text}
                  </StyledMessage>
                </StyledMessageContainer>
              );
            }
            return null;
          })
        )}
      </StyledChat>
      <StyledChatInputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'Start Writing!'}
          size={InputSize.SMALL}
        />
        <ButtonAlt
          onClick={sendMessage}
          variant={ButtonAltVariant.DEFAULT}
          size={ButtonAltSize.SMALL}
        >
          <SendHorizontal />
        </ButtonAlt>
      </StyledChatInputContainer>
    </StyledChatContainer>
  );
};
