import React from 'react';
import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';
import { GRAY_SCALE_100 } from 'styles/color.constants';
import Dropdown from './Dropdown';

interface RangeDropdownProps {
  minName: string;
  maxName: string;
  defaultMinValue?: string | number;
  defaultMaxValue?: string | number;
  options: { label: string; value: string | number }[];
  register: UseFormRegister<any>;
}

const RangeDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 100%;
`;

const RangeDropdown: React.FC<RangeDropdownProps> = ({
  register,
  options,
  minName,
  maxName,
  defaultMinValue,
  defaultMaxValue,
}) => {
  return (
    <RangeDropdownContainer>
      <Dropdown
        removeSpacer
        style={{
          position: 'relative',
          backgroundColor: GRAY_SCALE_100,
          border: 'none',
        }}
        options={options}
        defaultValue={defaultMinValue || options[0].value}
        register={register(minName)}
      />
      <span style={{ margin: '0 0.5rem', transform: 'scaleX(2)' }}>-</span>
      <Dropdown
        removeSpacer
        style={{
          position: 'relative',
          backgroundColor: GRAY_SCALE_100,
          border: 'none',
        }}
        options={options}
        defaultValue={defaultMaxValue || options[0].value}
        register={register(maxName)}
      />
    </RangeDropdownContainer>
  );
};

export default RangeDropdown;
