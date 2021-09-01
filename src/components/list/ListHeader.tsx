import React from 'react';
import styled from 'styled-components';
import { GRAY_SCALE_200 } from 'styles/color.constants';
import CheckBox from 'components/shared/CheckBox';
import { HeaderColumn } from 'hooks/list/useColumn';

interface ListHeaderProps {
  onCheckboxClick?: () => void;
  checked?: boolean;
  headerColumns: HeaderColumn[];
  removeMarginTop?: boolean;
}

const ListHeaderContainer = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 0.5rem;
  background-color: ${GRAY_SCALE_200};
  border-radius: 0.5rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
  place-items: center;
`;

const ListHeader: React.FC<ListHeaderProps> = ({ headerColumns: items, onCheckboxClick, checked, removeMarginTop = false }) => {
  const labels = items.map(({ headerLabel }) => headerLabel);
  let columns = items.map(({ column }) => column);
  columns = onCheckboxClick ? ['2rem', ...columns] : columns;
  return (
    <ListHeaderContainer
      style={{
        gridTemplateColumns: columns.join(' '),
        marginTop: `${removeMarginTop ? '' : '1rem'}`,
      }}
    >
      {onCheckboxClick && <CheckBox checked={checked} onChange={onCheckboxClick} />}
      {labels.map(label => (
        <div
          style={{
            padding: '1rem 0',
            width: '100%',
            height: '100%',
            textAlign: 'center',
          }}
          key={label}
        >
          {label}
        </div>
      ))}
    </ListHeaderContainer>
  );
};

export default React.memo(ListHeader);
