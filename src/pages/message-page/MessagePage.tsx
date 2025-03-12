import ChatRoomsList from "./components/chatrooms-list/ChatRoomsList"
import {Chat} from "./components/chat/Chat"
import {useState} from "react"

const MessagePage = () => {
  const [selectedChatroom, setSelectedChatroom] = useState<string | null>(null)

  const handleClick = (chatroom: string) => {
    setSelectedChatroom(chatroom)
  }

  return (
    <>
      <ChatRoomsList onSelectedChatroom={handleClick} />
      <Chat chatroomId={selectedChatroom}/>
    </>
  )
}

export default MessagePage;
