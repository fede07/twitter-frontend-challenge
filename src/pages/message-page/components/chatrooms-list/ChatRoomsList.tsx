import { StyledChatRoomsListContainer } from './ChatRoomsListContainer';
import { ChatRoom } from '../chatroom/ChatRoom';
import {
  UseGetChatRooms,
  UseGetMutualFollows,
} from '../../../../queries/chatQueries';
import Loader from '../../../../components/loader/Loader';
import { StyledChatRoomsListHeader } from './ChatRoomsListHeader';
import { useToast } from '../../../../context/ToastContext';
import { ToastType } from '../../../../components/toast/Toast';
import { useEffect, useState } from 'react';
import {StyledEmptyChatListContainer} from "./EmptyChatListContainer"

interface ChatRoomsListProps {
  onSelectedChatroom: (chatroom: string) => void;
  isHidden?: boolean;
}

const ChatRoomsList = ({ onSelectedChatroom, isHidden }: ChatRoomsListProps) => {
  // const currentUser = useUser();
  const {
    data: chatrooms,
    isLoading: isLoadingChatRooms,
    isError,
    error,
  } = UseGetChatRooms();
  const { data: mutualFollows, isLoading: isLoadingMutual } =
    UseGetMutualFollows();
  const [isLoading, setIsLoading] = useState(true);
  const [empty, setEmpty] = useState(true);
  const { showToast } = useToast();
  const [newChatrooms, setNewChatrooms] = useState<string[]>([]);

  useEffect(() => {
    if (isLoadingChatRooms || isLoadingMutual) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoadingChatRooms, isLoadingMutual, chatrooms, mutualFollows]);

  useEffect(() => {
    if (!isLoading && chatrooms.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [chatrooms, isLoading]);

  useEffect(() => {
    if (mutualFollows && chatrooms) {
      setNewChatrooms(
        mutualFollows.filter((id: string) => !chatrooms.includes(id))
      );
      setEmpty(false);
    }
  }, [mutualFollows, chatrooms]);

  if (isLoading) return <Loader />;

  if (isError) {
    showToast(error.message, ToastType.ERROR);
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  // if (isHidden) {
  //   return null;
  // }

  return (
    <StyledChatRoomsListContainer isHidden={isHidden} >
      <StyledChatRoomsListHeader>Messages</StyledChatRoomsListHeader>
      {empty ? (
        <StyledEmptyChatListContainer>
          <h2>Welcome to your inbox!</h2>
          <p>
            When you follow people and they follow you back, they will appear in
            this list.
          </p>
        </StyledEmptyChatListContainer>
      ) : (
        chatrooms.map((id: string) => (
          <ChatRoom
            key={id}
            userId={id}
            onSelectedChatroom={onSelectedChatroom}
          />
        ))
      )}

      {newChatrooms.length > 0 ? (
        <StyledEmptyChatListContainer>
          <h2>Suggested Chats</h2>
        </StyledEmptyChatListContainer>
      ) : (<></>)}

      {newChatrooms.map((id: string) => (
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
