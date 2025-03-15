import { ReactNode, useEffect, useRef } from 'react';
import {StyledModalWrapperContainer} from "./ModalWrapperContainer"

interface ModalWrapperProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalWrapper = ({ show, onClose, children }: ModalWrapperProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  if (!show) return null;

  //I would love to use portals, but unfortunately using it here breaks some of the modals styles
  return (
    <>
      <StyledModalWrapperContainer ref={modalRef} className="modal-wrapper">
        {children}
      </StyledModalWrapperContainer>
    </>
  );
};

export default ModalWrapper;
