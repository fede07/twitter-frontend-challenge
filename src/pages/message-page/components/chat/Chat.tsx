import { useEffect, useState } from 'react';
import { socket } from '../../../../socket';
import { generateRoomId } from '../../../../util/chat';
import { UseGetProfile } from '../../../../queries/userQueries';
import LabeledInput from '../../../../components/labeled-input/LabeledInput';
import { UseGetChatMessages } from '../../../../queries/chatQueries';
import Loader from '../../../../components/loader/Loader';
import { useToast } from '../../../../context/ToastContext';
import { ToastType } from '../../../../components/toast/Toast';
import {StyledMessage} from "./StyledMessage"
import {StyledMessageContainer} from "./MessageContainer"
import {StyledChatContainer} from "./ChatContainer"

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

  useEffect(() => {
    setRoomId(generateRoomId(user?.id || '', chatroomId || ''));
  }, [user, chatroomId]);

  const { data: history, isLoading: isLoadingMessages } = UseGetChatMessages(
    roomId!,
    !!chatroomId
  );

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

    socket.emit('join-chat', { recipientId: chatroomId });

    socket.on('joined-chat', () => {
      setRoomId(generateRoomId(user.id, chatroomId));
    });

    socket.on('chat-message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('new-message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
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
    setInput('');
  };

  if (!chatroomId) {
    return <div>Select a chatroom to start chatting!</div>;
  }

  return (
    <div>
      <StyledChatContainer>
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
      </StyledChatContainer>
      <LabeledInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        title={''}
        placeholder={'Start Writing!'}
        required={false}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
