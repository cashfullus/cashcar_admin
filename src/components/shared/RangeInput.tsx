import React from 'react';
import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';
import Input from './Input';

interface RangeInputProps {
  name: string;
  required?: boolean;
  register: UseFormRegister<any>;
  width?: string;
  backgroundColor?: string;
  type: 'date' | 'number';
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

const RangeInputContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const RangeInput: React.FC<RangeInputProps> = ({
  name,
  register,
  required = false,
  width = '100%',
  backgroundColor,
  type,
  minPlaceholder = '최소포인트 입력',
  maxPlaceholder = '최대포인트 입력',
}) => {
  const firstName = type === 'date' ? `${name}_start_date` : `${name}_min_value`;
  const secondName = type === 'date' ? `${name}_end_date` : `${name}_max_value`;
  return (
    <RangeInputContainer style={{ width }}>
      <Input
        containerStyle={{ backgroundColor, padding: '0.625rem 1rem' }}
        placeholder={type === 'number' ? minPlaceholder : ''}
        register={register(firstName, { required })}
        style={{ textTransform: 'uppercase' }}
        type={type}
      />
      <span style={{ margin: '0 0.5rem', transform: 'scaleX(2)' }}>-</span>
      <Input
        containerStyle={{ backgroundColor, padding: '0.625rem 1rem' }}
        placeholder={type === 'number' ? maxPlaceholder : ''}
        register={register(secondName, { required })}
        style={{ textTransform: 'uppercase' }}
        type={type}
      />
    </RangeInputContainer>
  );
};

export default RangeInput;
