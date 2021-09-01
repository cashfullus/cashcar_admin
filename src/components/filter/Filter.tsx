import React from 'react';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import { useForm } from 'react-hook-form';
import { Option, FilterItem } from 'types/common';
import CheckBoxRow from './CheckBoxRow';
import { FilterState } from 'lib/modules/filter';
import useFilter from 'hooks/useFilter';
import Accordion from 'components/shared/Accordion';
import { filterDataFormatter } from 'lib/tools';

interface FilterProps {
  filterItems: FilterItem[];
  options: Option[];
  target: keyof FilterState;
  onSubmit: (data: any) => void;
}

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Filter: React.FC<FilterProps> = ({ filterItems, options, target, onSubmit }) => {
  const { selectedFilter, setFilter } = useFilter(target);
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: selectedFilter,
  });
  return (
    <Accordion title="필터 &amp; 검색">
      <Form
        onSubmit={handleSubmit(data => {
          setFilter(data);
          onSubmit(filterDataFormatter(data));
        })}
      >
        <SearchInput
          setValue={setValue}
          register={register}
          options={options}
          defaultValue={getValues()['q_type'] || options[0].value}
        />
        {filterItems.map(item => (
          <CheckBoxRow getValues={getValues} key={item.name} register={register} {...item} />
        ))}
      </Form>
    </Accordion>
  );
};

export default React.memo(Filter);
