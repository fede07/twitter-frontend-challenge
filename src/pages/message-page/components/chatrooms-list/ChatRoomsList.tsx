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

interface ChatRoomsListProps {
  onSelectedChatroom: (chatroom: string) => void;
}

const ChatRoomsList = ({ onSelectedChatroom }: ChatRoomsListProps) => {
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
  const [empty, setEmpty] = useState(false);
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
      console.log('chatrooms', chatrooms);
    } else {
      setEmpty(false);
    }
  }, [chatrooms]);

  useEffect(() => {
    if (mutualFollows && chatrooms) {
      setNewChatrooms(
        mutualFollows.filter((id: string) => !chatrooms.includes(id))
      );
      setEmpty(newChatrooms.length !== 0);
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

  return (
    <StyledChatRoomsListContainer>
      <StyledChatRoomsListHeader>Messages</StyledChatRoomsListHeader>
      {empty ? (
        <>
          <p>Welcome to your inbox!</p>
          <p>
            When you follow people and they follow you back, they will appear in
            this list.
          </p>
        </>
      ) : (
        chatrooms.map((id: string) => (
          <ChatRoom
            key={id}
            userId={id}
            onSelectedChatroom={onSelectedChatroom}
          />
        ))
      )}

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
