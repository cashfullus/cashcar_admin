import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import {
  BRAND_COLOR_DARK_ORANGE,
  BRAND_COLOR_LIGHT_ORANGE,
  GRAY_SCALE_200,
  GRAY_SCALE_BLACK,
  GRAY_SCALE_WHITE,
} from 'styles/color.constants';
import Button from 'components/shared/Button';
import { FieldValues, useForm, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import ModalTemplate, { ModalTemplateFooter, ModalTemplateHeader } from './ModalTemplate';

interface AreaListProps {
  onClose: () => void;
  getValues: UseFormGetValues<any>;
  onSelect: (areas: string[]) => void;
}

interface CheckboxProps {
  register: UseFormRegister<FieldValues>;
  selected: boolean;
  label: string;
  value: string;
}

const areaItems = [
  { label: '전국', value: '전국' },
  { label: '서울', value: '서울' },
  { label: '경기', value: '경기' },
  { label: '인천', value: '인천' },
  { label: '부산', value: '부산' },
  { label: '울산', value: '울산' },
  { label: '대구', value: '대구' },
  { label: '세종', value: '세종' },
  { label: '대전', value: '대전' },
  { label: '광주', value: '광주' },
  { label: '충남', value: '충남' },
  { label: '충북', value: '충북' },
  { label: '경남', value: '경남' },
  { label: '경북', value: '경북' },
  { label: '전남', value: '전남' },
  { label: '전북', value: '전북' },
  { label: '강원', value: '강원' },
  { label: '제주', value: '제주' },
];

const AreaListBody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

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
  background-color: ${props => (props.checked ? BRAND_COLOR_DARK_ORANGE : GRAY_SCALE_200)};
  color: ${props => (props.checked ? GRAY_SCALE_WHITE : GRAY_SCALE_BLACK)};
`;

const CheckBox: React.FC<CheckboxProps> = ({ register, label, value, selected = false }) => {
  const [checked, setChecked] = useState(selected);
  return (
    <CheckBoxContainer checked={checked}>
      <span>{label}</span>
      <input hidden type="checkbox" checked={checked} onClick={() => setChecked(!checked)} {...register('area')} value={value} />
    </CheckBoxContainer>
  );
};

const AreaList: React.FC<AreaListProps> = ({ onClose, onSelect, getValues }) => {
  const { register, handleSubmit } = useForm();
  const defaultValues = getValues()['area'] ? getValues()['area'].split('/') : [];
  return (
    <ModalTemplate onSubmit={handleSubmit(data => onSelect(data.area))}>
      <ModalTemplateHeader>
        <span>지역 선택</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <AreaListBody>
        {areaItems.map(item => (
          <CheckBox key={item.label} selected={defaultValues.includes(item.value)} register={register} {...item} />
        ))}
      </AreaListBody>
      <ModalTemplateFooter>
        <Button
          buttonColor={BRAND_COLOR_DARK_ORANGE}
          style={{ width: '10rem', height: '100%', marginRight: '0.5rem' }}
          onClick={onClose}
          noFill
          fullRounded
        >
          취소
        </Button>
        <Button buttonColor={BRAND_COLOR_DARK_ORANGE} style={{ width: '10rem', height: '100%' }} fullRounded>
          선택
        </Button>
      </ModalTemplateFooter>
    </ModalTemplate>
  );
};

export default AreaList;
