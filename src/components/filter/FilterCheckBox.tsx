import React, { useState } from "react";
import styled from "styled-components";
import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
} from "react-hook-form";
import {
  BRAND_COLOR_DARK_ORANGE,
  BRAND_COLOR_LIGHT_ORANGE,
  GRAY_SCALE_BLACK,
  GRAY_SCALE_WHITE,
} from "styles/color.constants";
import { SelectedFilter } from "lib/modules/filter";

interface FilterCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<SelectedFilter>;
}

const CheckBoxContainer = styled.label<{ checked: boolean }>`
  padding: 0.5rem 1.25rem;
  border-radius: 1.5rem;
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    background-color: ${props => !props.checked && BRAND_COLOR_LIGHT_ORANGE};
  }
  background-color: ${props =>
    props.checked ? BRAND_COLOR_DARK_ORANGE : GRAY_SCALE_WHITE};
  color: ${props => (props.checked ? GRAY_SCALE_WHITE : GRAY_SCALE_BLACK)};
`;

const FilterCheckBox: React.FC<FilterCheckboxProps> = ({
  register,
  getValues,
  ...attrs
}) => {
  const defaultState =
    Array.isArray(getValues()[attrs.name]) &&
    getValues()[attrs.name].includes(attrs.value);
  const [checked, setChecked] = useState(defaultState);
  return (
    <CheckBoxContainer checked={checked}>
      <span>{attrs.label}</span>
      <input
        hidden
        type="checkbox"
        checked={checked}
        onClick={() => setChecked(!checked)}
        {...attrs}
        {...register(attrs.name)}
      />
    </CheckBoxContainer>
  );
};

export default React.memo(FilterCheckBox);
