import Avatar from "../../../../components/common/avatar/Avatar"
import Icon from "../../../../assets/icon.jpg"
import {StyledUserMessageContainer} from "../chatrooms-list/UserMessageContainer"
import {StyledChatRoomsContainer} from "./ChatRoomContainer"
import {UseGetProfileView} from "../../../../queries/userQueries"

interface ChatRoomProps {
  userId: string
  onSelectedChatroom: (chatroom: string) => void;
}

export const ChatRoom = ({
  userId,
  onSelectedChatroom,
}: ChatRoomProps) => {

  const {data: user, error, isLoading} = UseGetProfileView(userId);

  console.log(user);
  console.log(userId);

  if(isLoading) return <></>
  if(error) {
    console.log(error);
  }

  if(!user) {
    console.log("user not found");
  }


  return(
    <StyledChatRoomsContainer onClick={() => onSelectedChatroom(userId)}>
      <Avatar
        src={user.profilePicture === null ? Icon : user.profilePicture!}
        height={"75px"}
        width={"75px"}
        alt={user.username}
      />
      <StyledUserMessageContainer>
        {user.name?( <p>{user.name}</p> ) : (<p>{user.username}</p>)}
        {user.username && <p>@{user.username}</p>}
      </StyledUserMessageContainer>
    </StyledChatRoomsContainer>
  )
}
