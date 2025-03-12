import { StyledChatRoomsListContainer } from './ChatRoomsListContainer';
import { ChatRoom } from '../chatroom/ChatRoom';
import { UseGetChats } from '../../../../queries/chatQueries';
import Loader from '../../../../components/loader/Loader';
import { StyledChatRoomsListHeader } from './ChatRoomsListHeader';
import {UseGetProfile} from "../../../../queries/userQueries"

interface ChatRoomsListProps {
  onSelectedChatroom: (chatroom: string) => void;
}

const ChatRoomsList = ({ onSelectedChatroom }: ChatRoomsListProps) => {
  const { data: chatrooms, isLoading, isError, error } = UseGetChats();
  const {data: currentUser} = UseGetProfile();

  if (isLoading) return <Loader />;

  if (isError) return <div>Error: {error?.message}</div>;

  if(chatrooms.length === 0 || !currentUser) return (
    <div>
      Welcome to your Inbox!
    </div>
  )

  console.log(chatrooms)

  return (
    <StyledChatRoomsListContainer>
      <StyledChatRoomsListHeader>
        Messages
      </StyledChatRoomsListHeader>
      {chatrooms.map((id: string) => (
        <ChatRoom
          key={id}
          userId={id}
          onSelectedChatroom={onSelectedChatroom}
        />
      ))}
    </StyledChatRoomsListContainer>
  );
};

export default ChatRoomsList;
