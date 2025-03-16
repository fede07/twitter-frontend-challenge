import { StyledChatRoomsListContainer } from './ChatRoomsListContainer';
import { ChatRoom } from '../chatroom/ChatRoom';
import { UseGetChatRooms } from '../../../../queries/chatQueries';
import Loader from '../../../../components/loader/Loader';
import { StyledChatRoomsListHeader } from './ChatRoomsListHeader';
import {useToast} from "../../../../context/ToastContext"
import {ToastType} from "../../../../components/toast/Toast"
import {useEffect ,useState} from "react"

interface ChatRoomsListProps {
  onSelectedChatroom: (chatroom: string) => void;
}

const ChatRoomsList = ({ onSelectedChatroom }: ChatRoomsListProps) => {
  // const currentUser = useUser();
  const { data: chatrooms, isLoading, isError, error } = UseGetChatRooms();
  const [empty, setEmpty] = useState(false);
  const {showToast} = useToast();

  useEffect(() => {
    if(!isLoading && chatrooms.length === 0){
      setEmpty(true)
      console.log("chatrooms", chatrooms)
    } else {
      setEmpty(false)
    }
  }, [chatrooms])

  if (isLoading) return <Loader />;

  if (isError) {
    showToast(error.message, ToastType.ERROR);
    return null;
  }

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
      {empty ? (
        <>
          <p>Welcome to your inbox!</p>
          <p>When you follow people and they follow you back, they will appear in this list.</p>
        </>
      ) : (chatrooms.map((id: string) => (
        <ChatRoom
          key={id}
          userId={id}
          onSelectedChatroom={onSelectedChatroom}
        />
      )))
      }
    </StyledChatRoomsListContainer>
  );
};

export default ChatRoomsList;
