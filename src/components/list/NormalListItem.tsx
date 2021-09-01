/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { RootData } from 'types/common';
import { GRAY_SCALE_200, GRAY_SCALE_BLACK, GRAY_SCALE_WHITE } from 'styles/color.constants';
import CheckBox from 'components/shared/CheckBox';
import useItemColumn, { ListItemProps, ListItemCoreProps } from 'hooks/list/useItemColumn';

const NormalListItemContainerBlock = styled.div`
  display: grid;
  gap: 1rem;
  padding: 0.625rem 0.75rem;
  background-color: ${GRAY_SCALE_WHITE};
  color: ${GRAY_SCALE_BLACK};
  font-size: 0.875rem;
  min-height: 3.5rem;
  border-radius: 0.5rem;
  place-items: center;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${GRAY_SCALE_200};
  }
`;

export const NormalListItemContainer: React.FC<ListItemCoreProps> = React.memo(({ columns, checked, onCheckboxClick }) => {
  const onCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onCheckboxClick && onCheckboxClick();
  }, []);
  const labels = useMemo(
    () =>
      columns.map(({ label, truncate, color }, idx) => {
        if (idx === 0 && label === '') {
          if (Boolean(onCheckboxClick)) {
            return <CheckBox key="checkbox" checked={checked} onClick={e => e.stopPropagation()} onChange={onCheckboxChange} />;
          }
          return <div key={idx}>-</div>;
        }
        return (
          <div key={idx} style={{ textAlign: 'center', color }} className={`${truncate ? 'truncate' : ''}`}>
            {label}
          </div>
        );
      }),
    [checked],
  );
  const gridColumns = columns.map(item => item.column);
  return (
    <NormalListItemContainerBlock style={{ gridTemplateColumns: gridColumns.join(' ') }}>{labels}</NormalListItemContainerBlock>
  );
});

const NormalListItem = <Data extends RootData>({ checked, onCheckboxClick, keyAndColumns, data }: ListItemProps<Data>) => {
  const { gridColumns } = useItemColumn({ keyAndColumns, data });
  const onClick = useMemo(() => (onCheckboxClick ? () => onCheckboxClick(data) : undefined), [data]);
  return <NormalListItemContainer key={data.id} onCheckboxClick={onClick} checked={checked} columns={gridColumns} />;
};

export default React.memo(NormalListItem) as typeof NormalListItem;
