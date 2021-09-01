import React from 'react';
import styled from 'styled-components';
import { RootData } from 'types/common';
import ListHeader from './ListHeader';
import AccordionListItem from './AccordionListItem';
import useColumn, { ListProps } from 'hooks/list/useColumn';
import Loading from 'components/shared/Loading';
import NormalListItem from './NormalListItem';

const ListContainer = styled.div`
  width: 100%;
`;

const List = <Data extends RootData>({
  onCheckboxClick,
  onHeaderCheckboxClick,
  headerChecked,
  headerItems,
  items,
  selected,
  loading,
  useCollapse = false,
}: ListProps<Data>) => {
  const { headerColumns, keyAndColumns } = useColumn(headerItems, { useCollapse, useCheckbox: Boolean(onCheckboxClick) });
  const ListItem = useCollapse ? AccordionListItem : NormalListItem;
  return (
    <ListContainer>
      <ListHeader checked={headerChecked} onCheckboxClick={onHeaderCheckboxClick} headerColumns={headerColumns} />
      {loading ? (
        <Loading />
      ) : (
        items.map(item => (
          <ListItem
            checked={selected ? selected.includes(item.id) : false}
            onCheckboxClick={onCheckboxClick}
            key={item.id}
            data={item}
            keyAndColumns={keyAndColumns}
          />
        ))
      )}
    </ListContainer>
  );
};

export default React.memo(List) as typeof List;
