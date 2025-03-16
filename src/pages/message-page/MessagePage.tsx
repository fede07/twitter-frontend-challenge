import ChatRoomsList from './components/chatrooms-list/ChatRoomsList';
import { Chat } from './components/chat/Chat';
import { useState } from 'react';
import StyledEmptyChat from "./components/chat/EmptyChat"
import ButtonAlt from "../../components/button-alt/ButtonAlt"
import {ButtonAltSize ,ButtonAltVariant} from "../../components/button-alt/StyledButtonAlt"
import {Undo2} from "lucide-react"
import {StyledMessagePageContainer} from "./components/MessagePageContainer"
import {StyledHiderWrapper} from "./components/HiderWrapper"

const MessagePage = () => {
  const [selectedChatroom, setSelectedChatroom] = useState<string | null>(null);
  const [hidden, setHidden] = useState<boolean>(true);

  const handleClick = (chatroom: string) => {
    setSelectedChatroom(chatroom);
    setHidden(false);
  };

  const toggleHidden = () => {
    setHidden(!hidden);
  }

  return (
    <StyledMessagePageContainer>
      <ChatRoomsList onSelectedChatroom={handleClick} isHidden={!hidden} />
      {!selectedChatroom ? (
        <StyledEmptyChat isHidden={hidden}>
          <StyledHiderWrapper isHidden={hidden}>
            <ButtonAlt
              variant={ButtonAltVariant.DEFAULT}
              size={ButtonAltSize.SMALL}
              onClick={toggleHidden}
            >
              <Undo2 />
            </ButtonAlt>
          </StyledHiderWrapper>

          <div>
            <h2>Select a Message</h2>
            <p>
              Choose from your existing conversations, start a new one, or just
              keep swimming.
            </p>
          </div>
        </StyledEmptyChat>
      ) : (
        <Chat chatroomId={selectedChatroom} back={toggleHidden} isHidden={hidden} />
      )}
    </StyledMessagePageContainer>
  );
};

export default MessagePage;
