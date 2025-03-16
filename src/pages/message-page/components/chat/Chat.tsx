import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../../socket';
import { generateRoomId } from '../../../../util/chat';
import {UseGetProfile ,UseGetProfileView} from '../../../../queries/userQueries';
import { UseGetChatMessages } from '../../../../queries/chatQueries';
import Loader from '../../../../components/loader/Loader';
import { useToast } from '../../../../context/ToastContext';
import { ToastType } from '../../../../components/toast/Toast';
import { StyledMessage } from './StyledMessage';
import { StyledMessageContainer } from './MessageContainer';
import ButtonAlt from '../../../../components/button-alt/ButtonAlt';
import { SendHorizontal } from 'lucide-react';
import { StyledChatInputContainer } from './ChatInputContainer';
import { StyledChat } from './StyledChat';
import { StyledChatContainer } from './ChatContainer';
import Input from '../../../../components/input/Input';
import { InputSize } from '../../../../components/input/StyledInput';
import {ButtonAltSize ,ButtonAltVariant} from "../../../../components/button-alt/StyledButtonAlt"
import StyledEmptyChat from "./EmptyChat"
import ProfileInfo from "../../../profile/ProfileInfo"

interface ChatProps {
  chatroomId: string | null;
}

interface Message {
  text: string;
  senderId: string;
}

export const Chat = ({ chatroomId }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [roomId, setRoomId] = useState<string | null>(null);
  const { data: user } = UseGetProfile();
  const { showToast } = useToast();
  const chatRef = useRef<HTMLDivElement>(null);
  const { data: profileView } = UseGetProfileView(chatroomId!)

  if(!chatroomId) {
    console.log("chatroomId is null");
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
  }

  useEffect(() => {
    scrollToBottom();
  } ,[messages]);

  useEffect(() => {
    if (history && !isLoadingMessages) {
      setMessages(
        history.map((msg: Message) => ({
          text: msg.text,
          senderId: msg.senderId,
        }))
      );
      console.log(history);
    }
  }, [history, isLoadingMessages]);

  useEffect(() => {
    if (!chatroomId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.once('connect', () => {
      console.log('Socket connected');
      socket.emit('join-chat', { recipientId: chatroomId });
    })

    socket.emit('join-chat', { recipientId: chatroomId });

    socket.on('joined-chat', () => {
    });

    socket.on('chat-message', (message: Message) => {
      if(!message.text || message.text.trim() === '') return;
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit('chat-message', { roomId: chatroomId, message });
    });

    socket.on('error', (err) => {
      showToast(err.message, ToastType.ALERT);
    });

    return () => {
      socket.emit('leaveChatroom', chatroomId);
      socket.off('chat-message');
      socket.disconnect();
    };
  }, [chatroomId]);

  const sendMessage = () => {
    if (input.trim() === '' || !chatroomId) {
      return;
    }
    socket.emit('chat-message', { roomId, message: input });
    setMessages((prevMessages) => [...prevMessages, { text: input, senderId: user?.id || '' }])
    setInput('');
  };

  // TODO: Implement "New Message" Button
  // TODO: Add Translation
  if (!chatroomId) {
    return (
      <StyledEmptyChat>
        <h2>Select a Message</h2>
        <p>Choose from your existing conversations, start a new one, or just keep swimming.</p>
      </StyledEmptyChat>
    )
  }

  console.log(profileView)

  return (
    <StyledChatContainer>
      <ProfileInfo username={profileView.username} name={profileView.name} profilePicture={profileView.profilePicture} />
      <StyledChat ref={chatRef}>
        {isLoadingMessages ? (
          <Loader />
        ) : (
          messages.map((msg, index) => (
            <StyledMessageContainer>
              <StyledMessage key={index} isUser={user?.id === msg.senderId}>
                {msg.text}
              </StyledMessage>
            </StyledMessageContainer>
          ))
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
