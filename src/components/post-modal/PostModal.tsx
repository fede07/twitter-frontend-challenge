import React, { ReactNode } from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";
import ModalWrapper from "../modal-wrapper/ModalWrapper"

interface PostModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

export const PostModal = ({ onClose, show, children }: PostModalProps) => {
  return (
    <>
      {show && (
        <StyledBlurredBackground>
          <StyledTweetModalContainer>
            <ModalWrapper show={show} onClose={onClose}>
              <ModalCloseButton onClick={onClose} />
              {children}
            </ModalWrapper>
          </StyledTweetModalContainer>
        </StyledBlurredBackground>
      )}
    </>
  );
};
