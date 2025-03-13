import ChatRoomsList from "./components/chatrooms-list/ChatRoomsList"
import {Chat} from "./components/chat/Chat"
import {useState} from "react"
import {StyledChatContainer} from "./components/chat/ChatContainer"

const MessagePage = () => {
  const [selectedChatroom, setSelectedChatroom] = useState<string | null>(null)

  const handleClick = (chatroom: string) => {
    setSelectedChatroom(chatroom)
  }

  return (
    <>
      <ChatRoomsList onSelectedChatroom={handleClick} />
      <StyledChatContainer>
        <Chat chatroomId={selectedChatroom}/>
      </StyledChatContainer>
    </>
  )
}

export default MessagePage;
