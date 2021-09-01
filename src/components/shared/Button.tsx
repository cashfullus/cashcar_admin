import React from 'react';
import styled, { css } from 'styled-components';
import { GRAY_SCALE_WHITE } from 'styles/color.constants';

interface ButtonContainerProps {
  buttonColor: string;
  color?: string;
  noFill?: boolean;
  fullRounded?: boolean;
  loading?: boolean;
  hover?: boolean;
}

export interface ButtonProps extends ButtonContainerProps, React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100%;
  height: 100%;
  outline: none;
  padding: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  background-color: ${props => (props.noFill ? 'transparent' : props.buttonColor)};
  border: ${props => `1px solid ${props.buttonColor}`};
  color: ${props => (props.noFill ? (props.color ? props.color : props.buttonColor) : GRAY_SCALE_WHITE)};
  border-radius: ${props => (props.fullRounded ? '1.25rem' : '0.5rem')};
  ${props =>
    props.hover &&
    css`
      &:hover {
        background-color: ${props.buttonColor};
        color: ${GRAY_SCALE_WHITE};
      }
    `}
`;

const Button: React.FC<ButtonProps> = ({ children, loading, ...attrs }) => {
  return (
    <ButtonContainer {...attrs} disabled={loading}>
      {loading ? 'loading' : children}
    </ButtonContainer>
  );
};

export default React.memo(Button);
