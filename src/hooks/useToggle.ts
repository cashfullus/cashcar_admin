import { useCallback, useMemo } from 'react';
import { RootData } from 'types/common';

interface UseToggleParams<Data> {
  items: Data[];
  selected: (number | string)[];
  pageSize: number;
  itemCount: number;
  onDeselect: () => unknown;
  onSelect: () => unknown;
}

const useToggle = <Data extends RootData>({
  items,
  selected,
  pageSize,
  itemCount,
  onDeselect,
  onSelect,
}: UseToggleParams<Data>) => {
  const downloadTarget = useMemo(() => items.filter(item => selected.includes(item.id)), [items, selected]);
  const headerChecked = useMemo(
    () => (selected.length === pageSize || selected.length === itemCount) && selected.length !== 0,
    [itemCount, selected, pageSize],
  );
  const onHeaderCheckboxClick = useCallback(() => {
    if (headerChecked) {
      onDeselect();
    } else {
      onSelect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerChecked]);
  return { headerChecked, onHeaderCheckboxClick, downloadTarget };
};

export default useToggle;
