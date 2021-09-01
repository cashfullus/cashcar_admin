import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled, { css } from "styled-components";
import {
  GRAY_SCALE_100,
  GRAY_SCALE_150,
  GRAY_SCALE_400,
} from "styles/color.constants";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
  unit?: string;
}

const disabledCSS = css`
  background-color: ${GRAY_SCALE_150};
  pointer-events: none;
  color: ${GRAY_SCALE_400};
`;

const InputContainer = styled.div<{ isDisabled?: boolean }>`
  width: 100%;
  position: relative;
  padding: 0.875rem 1rem;
  background-color: ${GRAY_SCALE_100};
  border-radius: 0.5rem;
  ${props => props.isDisabled && disabledCSS}
`;

const StyledInput = styled.input<{ unit?: boolean; isDisabled?: boolean }>`
  outline: none;
  border: none;
  width: 100%;
  ${props => props.unit && `padding-right: 2.875rem`};
  background-color: transparent;
  &::placeholder {
    color: ${GRAY_SCALE_400};
  }
  ${props => props.isDisabled && `color: ${GRAY_SCALE_400}`};
`;

const Unit = styled.div<{ isDisabled?: boolean }>`
  position: absolute;
  top: 50%;
  right: 0.875rem;
  width: 3rem;
  text-align: end;
  z-index: 10;
  font-size: 0.875rem;
  background-color: ${GRAY_SCALE_100};
  transform: translateY(-50%);
  ${props => props.isDisabled && disabledCSS}
`;

const Input: React.FC<InputProps> = ({
  register,
  unit,
  containerStyle,
  isDisabled,
  ...attrs
}) => {
  return (
    <InputContainer isDisabled={isDisabled} style={containerStyle}>
      <StyledInput
        unit={Boolean(unit)}
        isDisabled={isDisabled}
        {...attrs}
        {...register}
      />
      {unit && <Unit isDisabled={isDisabled}>{unit}</Unit>}
    </InputContainer>
  );
};

export default React.memo(Input);
