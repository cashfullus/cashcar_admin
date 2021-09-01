import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Input from 'components/shared/Input';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_BLACK } from 'styles/color.constants';
import { ReactComponent as PlusCircleSvg } from 'assets/plus-circle.svg';
import { ReactComponent as TrashSvg } from 'assets/trash.svg';
import { ADDITIONAL_MISSION_ITEMS } from 'lib/input-name.constants';

export interface AdditionalMissionDataType {
  mission_type: 1;
  order: number;
  additional_point: string;
  mission_name: string;
  based_on_activity_period: string;
  due_date: string;
}

interface AdditionalMissionProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  additionalMissions?: AdditionalMissionDataType[];
}

interface AdditionalMissionItemProps extends AdditionalMissionDataType {
  setItem: (order: number, key: keyof AdditionalMissionDataType) => React.ChangeEventHandler<HTMLInputElement>;
  onRemove: (order: number) => void;
}

const AdditionalMissionContainer = styled.div`
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

const AdditionalMissionItemContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, max-content);
  row-gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const AdditionalMissionItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const AdditionalMissionItemColumn: React.FC<{ title: string; styles?: React.CSSProperties }> = ({ children, title, styles }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', ...styles }}>
      <div style={{ marginRight: '0.875rem' }}>{title}</div>
      {children}
    </div>
  );
};

const AdditionalMissionItem: React.FC<AdditionalMissionItemProps> = React.memo(
  ({ setItem, order, additional_point, based_on_activity_period, due_date, mission_name, onRemove }) => {
    return (
      <AdditionalMissionItemContainer>
        <AdditionalMissionItemRow>
          <AdditionalMissionItemColumn title="미션명">
            <Input
              placeholder="미션명을 입력해주세요"
              containerStyle={{ width: '20rem', marginRight: '1.5rem' }}
              value={mission_name}
              onChange={setItem(order, 'mission_name')}
            />
          </AdditionalMissionItemColumn>
          <AdditionalMissionItemColumn title="포인트">
            <Input
              unit="P"
              placeholder="내용을 입력"
              containerStyle={{ width: '10rem' }}
              value={additional_point}
              onChange={setItem(order, 'additional_point')}
            />
          </AdditionalMissionItemColumn>
        </AdditionalMissionItemRow>
        <AdditionalMissionItemRow>
          <AdditionalMissionItemColumn title="인증기한" styles={{ marginRight: '1.5rem' }}>
            <Input
              unit="일"
              placeholder="기간을 입력"
              containerStyle={{ width: '10rem' }}
              value={due_date}
              onChange={setItem(order, 'due_date')}
            />
          </AdditionalMissionItemColumn>
          <AdditionalMissionItemColumn title="활동기간">
            <Input
              unit="일 기준"
              placeholder="기간"
              containerStyle={{ width: '10rem' }}
              value={based_on_activity_period}
              onChange={setItem(order, 'based_on_activity_period')}
            />
          </AdditionalMissionItemColumn>
          {order !== 1 && <TrashSvg style={{ cursor: 'pointer' }} onClick={() => onRemove(order)} />}
        </AdditionalMissionItemRow>
      </AdditionalMissionItemContainer>
    );
  },
);

const AdditionalMission: React.FC<AdditionalMissionProps> = ({ register, setValue, additionalMissions }) => {
  const [items, setItems] = useState<AdditionalMissionDataType[]>(
    additionalMissions || [
      {
        order: 1,
        mission_type: 1,
        additional_point: '',
        based_on_activity_period: '',
        mission_name: '',
        due_date: '',
      },
    ],
  );
  const setItem = (order: number, key: keyof AdditionalMissionDataType) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setItems(
      items.map(item =>
        item.order === order
          ? {
              ...item,
              [key]: e.target.value,
            }
          : item,
      ),
    );

  const onRemove = (order: number) => {
    setItems(prev => prev.filter(item => item.order !== order).map((item, idx) => ({ ...item, order: idx + 1 })));
  };

  const onAddItem = () =>
    setItems(
      items.concat([
        {
          order: items.length + 1,
          mission_type: 1,
          additional_point: '',
          based_on_activity_period: '',
          mission_name: '',
          due_date: '',
        },
      ]),
    );

  useEffect(() => {
    register(ADDITIONAL_MISSION_ITEMS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(
      ADDITIONAL_MISSION_ITEMS,
      items.map(({ order, additional_point, based_on_activity_period, due_date, ...item }) => ({
        additional_point: parseInt(additional_point),
        based_on_activity_period: parseInt(based_on_activity_period),
        due_date: parseInt(due_date),
        ...item,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  return (
    <AdditionalMissionContainer>
      <div style={{ width: '4.5rem', marginBottom: '1rem' }}>추가 미션</div>
      {items.map(item => (
        <AdditionalMissionItem key={item.order} setItem={setItem} {...item} onRemove={onRemove} />
      ))}
      <PlusButtonContainer onClick={onAddItem}>
        <PlusCircleSvg />
      </PlusButtonContainer>
    </AdditionalMissionContainer>
  );
};

export default AdditionalMission;
