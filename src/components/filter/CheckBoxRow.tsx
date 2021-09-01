import React from 'react';
import { UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { FilterItem } from 'types/common';
import styled from 'styled-components';
import FilterCheckBox from './FilterCheckBox';
import RangeInput from 'components/shared/RangeInput';
import { GRAY_SCALE_WHITE } from 'styles/color.constants';
import { SelectedFilter } from 'lib/modules/filter';

interface CheckBoxRowProps extends FilterItem {
  register: UseFormRegister<any>;
  getValues: UseFormGetValues<SelectedFilter>;
}

const CheckBoxRowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.875rem;
`;

const FilterContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
`;

const CheckBoxRow: React.FC<CheckBoxRowProps> = ({
  name,
  label,
  filters = [],
  date,
  range,
  register,
  getValues,
  minPlaceholder,
  maxPlaceholder,
}) => {
  return (
    <CheckBoxRowContainer>
      <div style={{ width: '5.5rem', fontSize: '0.875rem' }}>{label}</div>
      <FilterContainer>
        {date || range ? (
          <RangeInput
            name={name}
            type={date ? 'date' : 'number'}
            register={register}
            minPlaceholder={minPlaceholder}
            maxPlaceholder={maxPlaceholder}
            backgroundColor={GRAY_SCALE_WHITE}
          />
        ) : (
          filters.map(filter => (
            <FilterCheckBox
              key={filter.value}
              getValues={getValues}
              register={register}
              name={name}
              label={filter.label}
              value={filter.value}
            />
          ))
        )}
      </FilterContainer>
    </CheckBoxRowContainer>
  );
};

export default CheckBoxRow;
