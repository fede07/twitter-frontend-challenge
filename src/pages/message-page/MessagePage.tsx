import ChatRoomsList from './components/chatrooms-list/ChatRoomsList';
import { Chat } from './components/chat/Chat';
import { useState } from 'react';
import StyledEmptyChat from "./components/chat/EmptyChat"

const MessagePage = () => {
  const [selectedChatroom, setSelectedChatroom] = useState<string | null>(null);

  const handleClick = (chatroom: string) => {
    setSelectedChatroom(chatroom);
  };

  return (
    <>
      <ChatRoomsList onSelectedChatroom={handleClick} />
      {!selectedChatroom ? (
        <StyledEmptyChat>
          <h2>Select a Message</h2>
          <p>
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </p>
        </StyledEmptyChat>
      ) : (
        <Chat chatroomId={selectedChatroom} />
      )}
    </>
  );
};

export default MessagePage;
