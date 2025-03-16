import { StyledChatRoomsListContainer } from './ChatRoomsListContainer';
import { ChatRoom } from '../chatroom/ChatRoom';
import { UseGetChatRooms } from '../../../../queries/chatQueries';
import Loader from '../../../../components/loader/Loader';
import { StyledChatRoomsListHeader } from './ChatRoomsListHeader';
import {UseGetProfile} from "../../../../queries/userQueries"
import {useToast} from "../../../../context/ToastContext"
import {ToastType} from "../../../../components/toast/Toast"

interface ChatRoomsListProps {
  onSelectedChatroom: (chatroom: string) => void;
}

const ChatRoomsList = ({ onSelectedChatroom }: ChatRoomsListProps) => {
  const {data: currentUser} = UseGetProfile();
  const { data: chatrooms, isLoading, isError, error } = UseGetChatRooms();
  const {showToast} = useToast();

  if (isLoading) return <Loader />;

  if (isError) {
    showToast(error.message, ToastType.ERROR);
    return null;
  }

  if(chatrooms.length === 0 || !currentUser) return (
    <div>
      Welcome to your Inbox!
    </div>
  )

  if (isLoading){
    return (
      <Loader />
    )
  }

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
