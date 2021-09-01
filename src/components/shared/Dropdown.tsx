import React from "react";
import styled, { css } from "styled-components";
import {
  GRAY_SCALE_150,
  GRAY_SCALE_200,
  GRAY_SCALE_400,
  GRAY_SCALE_WHITE,
} from "styles/color.constants";
import { ReactComponent as MoreSvg } from "assets/more.svg";
import { Option } from "types/common";
import { UseFormRegisterReturn } from "react-hook-form";
export interface DropdownProps {
  options: Option[];
  defaultValue: Option["value"];
  register?: UseFormRegisterReturn;
  onChange?: (nextState: Option["value"]) => void;
  style?: React.CSSProperties;
  noFill?: boolean;
  isDisabled?: boolean;
  removeSpacer?: boolean;
}

interface DropdownContainerProps {
  noFill?: boolean;
  isDisabled?: boolean;
}

const Spacer = styled.div`
  width: 6rem;
`;

const disabledCSS = css`
  background-color: ${GRAY_SCALE_150};
  pointer-events: none;
  color: ${GRAY_SCALE_400};
`;

const DropdownContainer = styled.div<DropdownContainerProps>`
  position: absolute;
  top: 0;
  width: 7rem;
  height: 100%;
  z-index: 10;
  background-color: ${props =>
    props.noFill ? GRAY_SCALE_WHITE : GRAY_SCALE_200};
  border: 1px solid ${GRAY_SCALE_200};
  border-radius: 0.5rem;
  ${props => props.isDisabled && disabledCSS};
`;

const Select = styled.select`
  appearance: none;
  outline: none;
  width: 100%;
  padding: 0 1rem;
  height: 100%;
  border: none;
  background-color: transparent;
  user-select: none;
`;

const Dropdown: React.FC<DropdownProps> = ({
  options,
  style,
  defaultValue,
  noFill,
  onChange,
  register,
  isDisabled = false,
  removeSpacer = false,
}) => {
  return (
    <>
      <DropdownContainer noFill={noFill} style={style} isDisabled={isDisabled}>
        <Select
          defaultValue={defaultValue}
          {...register}
          onChange={e => onChange && onChange(e.target.value)}
        >
          {options.map(option => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <MoreSvg
          style={{
            position: "absolute",
            right: "0.25rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: -1,
          }}
        />
      </DropdownContainer>
      {!removeSpacer && <Spacer />}
    </>
  );
};

export default React.memo(Dropdown);
