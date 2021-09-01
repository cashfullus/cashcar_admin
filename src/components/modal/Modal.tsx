import React, { useEffect } from 'react';
import styled from 'styled-components';
import Portal from './Portal';

interface ModalProps {
  onClose: () => void;
  closeOnClickOutside?: boolean;
}

const ModalContainer = styled.div`
  background: rgba(51, 51, 51, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal: React.FC<ModalProps> = ({ children, onClose, closeOnClickOutside = true }) => {
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      return onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Portal>
      <ModalContainer {...(closeOnClickOutside && { onClick: onClose })}>
        {React.isValidElement(children) && React.cloneElement(children, { onClose })}
      </ModalContainer>
    </Portal>
  );
};

export default Modal;
