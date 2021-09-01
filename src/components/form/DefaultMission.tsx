import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Input from 'components/shared/Input';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_BLACK } from 'styles/color.constants';
import { ReactComponent as PlusCircleSvg } from 'assets/plus-circle.svg';
import { ReactComponent as TrashSvg } from 'assets/trash.svg';
import { DEFAULT_MISSION_ITEMS } from 'lib/input-name.constants';

export interface DefaultMissionDataType {
  mission_type: 0;
  order: number;
  based_on_activity_period: string;
  due_date: string;
}

interface DefaultMissionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  defaultMissions?: DefaultMissionDataType[];
}

interface DefaultMissionItemProps extends DefaultMissionDataType {
  setItem: (order: number, key: keyof DefaultMissionDataType) => React.ChangeEventHandler<HTMLInputElement>;
  onRemove: (order: number) => void;
}

const DefaultMissionContainer = styled.div`
  width: 100%;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${GRAY_SCALE_BLACK};
  margin-bottom: 3.5rem;
`;

const PlusButtonContainer = styled.div`
  width: 53.75rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  border: 1px solid ${BRAND_COLOR_DARK_ORANGE};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DefaultMissionItemContainer = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DefaultMissionItemColumn: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ marginRight: '0.5rem' }}>{title}</div>
      {children}
    </div>
  );
};

const DefaultMissionItem: React.FC<DefaultMissionItemProps> = ({
  setItem,
  order,
  based_on_activity_period,
  due_date,
  onRemove,
}) => {
  return (
    <DefaultMissionItemContainer>
      <div style={{ fontWeight: 'bold' }}>{order} 회</div>
      <DefaultMissionItemColumn title="인증기한">
        <Input
          unit="일"
          placeholder="기간"
          containerStyle={{ width: '10rem', marginRight: '1.5rem' }}
          value={due_date}
          onChange={setItem(order, 'due_date')}
        />
      </DefaultMissionItemColumn>
      <DefaultMissionItemColumn title="활동기간">
        <Input
          unit="일 기준"
          placeholder="기간"
          containerStyle={{ width: '10rem', marginRight: '1.5rem' }}
          value={based_on_activity_period}
          isDisabled={order === 1}
          onChange={setItem(order, 'based_on_activity_period')}
        />
      </DefaultMissionItemColumn>
      {order !== 1 && <TrashSvg style={{ cursor: 'pointer' }} onClick={() => onRemove(order)} />}
    </DefaultMissionItemContainer>
  );
};

const DefaultMission: React.FC<DefaultMissionProps> = ({ register, setValue, defaultMissions }) => {
  const [items, setItems] = useState<DefaultMissionDataType[]>(
    defaultMissions || [{ order: 1, based_on_activity_period: '0', due_date: '', mission_type: 0 }],
  );
  const setMissions = (order: number, key: keyof DefaultMissionDataType) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setItems(prev => prev.map(item => (item.order === order ? { ...item, [key]: e.target.value } : item)));
  const onRemove = (order: number) => {
    setItems(prev => prev.filter(item => item.order !== order).map((item, idx) => ({ ...item, order: idx + 1 })));
  };
  const onAddItem = () =>
    setItems(prev =>
      prev.concat([
        {
          order: prev.length + 1,
          due_date: '',
          based_on_activity_period: '',
          mission_type: 0,
        },
      ]),
    );
  useEffect(() => {
    register(DEFAULT_MISSION_ITEMS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(
      DEFAULT_MISSION_ITEMS,
      items.map(({ based_on_activity_period, due_date, ...item }) => ({
        based_on_activity_period: parseInt(based_on_activity_period),
        due_date: parseInt(due_date),
        ...item,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  return (
    <DefaultMissionContainer>
      <div style={{ width: '4.5rem', marginBottom: '1rem' }}>필수 미션</div>
      {items.map(item => (
        <DefaultMissionItem key={item.order} setItem={setMissions} {...item} onRemove={onRemove} />
      ))}
      <PlusButtonContainer onClick={onAddItem}>
        <PlusCircleSvg />
      </PlusButtonContainer>
    </DefaultMissionContainer>
  );
};

export default DefaultMission;
