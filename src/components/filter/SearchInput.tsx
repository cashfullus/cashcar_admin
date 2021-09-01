import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import { GRAY_SCALE_200 } from 'styles/color.constants';
import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';
import Dropdown, { DropdownProps } from '../shared/Dropdown';

interface SearchInputProps extends Omit<DropdownProps, 'onChange' | 'style' | 'register'> {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Input = styled.input`
  width: 34rem;
  height: 3rem;
  border: 1px solid ${GRAY_SCALE_200};
  outline: none;
  padding-left: 2rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
`;

const SubmitButton = styled.button`
  position: absolute;
  width: 3rem;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 0;
  cursor: pointer;
  border: 1px solid ${GRAY_SCALE_200};
  border-left: none;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: white;
  outline: none;
`;

const SearchInput: React.FC<SearchInputProps> = ({ defaultValue, options, register, setValue }) => {
  useEffect(() => {
    register('q_type');
    setValue('q_type', defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SearchInputContainer>
      <Dropdown
        options={options}
        defaultValue={defaultValue}
        onChange={data => setValue('q_type', Number.isNaN(+data) ? data : undefined)}
      />
      <Input placeholder="검색어를 입력하세요" {...register('q')} />
      <SubmitButton type="submit">
        <SearchSvg />
      </SubmitButton>
    </SearchInputContainer>
  );
};

export default React.memo(SearchInput);
