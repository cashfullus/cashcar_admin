import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CheckboxSvg } from 'assets/checkbox-icon.svg';
import { ReactComponent as CheckboxCheckedSvg } from 'assets/checkbox-checked-icon.svg';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const CheckBoxContainer = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckBox: React.FC<CheckboxProps> = ({ children, ...attrs }) => {
  return (
    <CheckBoxContainer onClick={e => e.stopPropagation()}>
      {attrs.checked ? <CheckboxCheckedSvg /> : <CheckboxSvg />}
      <input hidden type="checkbox" {...attrs} />
      {children}
    </CheckBoxContainer>
  );
};

export default React.memo(CheckBox);
