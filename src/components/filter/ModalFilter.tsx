import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import { useForm } from 'react-hook-form';
import { Option, FilterItem } from 'types/common';
import CheckBoxRow from './CheckBoxRow';
import { FilterState } from 'lib/modules/filter';
import useFilter from 'hooks/useFilter';
import Accordion from 'components/shared/Accordion';
import { filterDataFormatter, targetNames } from 'lib/tools';

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

const ModalFilter: React.FC<FilterProps> = ({ filterItems, options, target, onSubmit }) => {
  const { selectedFilter, setFilter } = useFilter(target);
  const { register, setValue, getValues } = useForm({
    defaultValues: selectedFilter,
  });
  const modalFilterSubmit = () => {
    const values = getValues();
    const keys = Object.keys(values).map(key => {
      const c = key.split("_")[0];
      if(targetNames.includes(c)){
        return [key, key.replace(c+"_", '')];
      }else {
        return [key, key];
      }
    });
    keys.forEach(([key, newKey]) => {
      if (key === newKey) {
        return;
      }
      values[newKey] = values[key];
      delete values[key];
    })
    setFilter(values);
    onSubmit(filterDataFormatter(getValues()));
  }
  return (
    <Accordion title="필터 &amp; 검색">
      <Form>
        <SearchInput
          setValue={setValue}
          register={register}
          options={options}
          isModal
          onSubmit={modalFilterSubmit}
          defaultValue={getValues()['q_type'] || options[0].value}
        />
        {filterItems.map(v => ({...v, name: target +"_"+v.name})).map(item => (
          <CheckBoxRow getValues={getValues} key={item.name} register={register} {...item} />
        ))}
      </Form>
    </Accordion>
  );
};

export default React.memo(ModalFilter);
