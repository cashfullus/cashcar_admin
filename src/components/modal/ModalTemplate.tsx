import React from 'react';
import styled from 'styled-components';
import { GRAY_SCALE_BLACK, GRAY_SCALE_WHITE } from 'styles/color.constants';

const ModalTemplateContainer = styled.form`
  background-color: ${GRAY_SCALE_WHITE};
  border-radius: 2rem;
  position: relative;
  width: 65rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${GRAY_SCALE_BLACK};
`;

export const ModalTemplateHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTemplateFooter = styled.div`
  width: 100%;
  height: 2.5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const PaginationFooter = styled.div`
  position: absolute;
  background-color: ${GRAY_SCALE_WHITE};
  bottom: 1.5rem;
  left: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalTemplate: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({ children, ...attrs }) => {
  return (
    <ModalTemplateContainer onClick={e => {
      e.stopPropagation();
    }} onSubmit={e => {
      e.stopPropagation();
      e.preventDefault();
    }} {...attrs}>
      <div style={{width: '100%', height: '100%', overflowY: 'scroll'}}>
      {children}
      </div>
    </ModalTemplateContainer>
  );
};

export default ModalTemplate;
