import { useMemo } from 'react';
import { RootData } from 'types/common';
import { Column, ListColumn } from './useColumn';

interface UseItemColumnParams<Data> {
  keyAndColumns: Omit<ListColumn<Data>, 'headerLabel'>[];
  data: Data;
}

export interface ListItemProps<Data> {
  checked?: boolean;
  onCheckboxClick?: (data: Data) => void;
  keyAndColumns: Omit<ListColumn<Data>, 'headerLabel'>[];
  data: Data;
}

interface ListItemColumn extends Column {
  label: React.ReactNode;
}

export interface ListItemCoreProps {
  checked?: boolean;
  onCheckboxClick?: () => void;
  // content: string | React.ReactNode;
  columns: ListItemColumn[];
}

const useItemColumn = <Data extends RootData>({ data, keyAndColumns }: UseItemColumnParams<Data>) => {
  const gridColumns = useMemo(
    () =>
      keyAndColumns.map(({ label, customContent, ...rest }) => {
        if (label === '') {
          const content = customContent ? customContent(label, data) : label;
          return { label: content, ...rest };
        }
        if (typeof label !== 'object') {
          const content = customContent ? customContent(data[label], data) : data[label];
          return { label: content, ...rest };
        }
        if (Array.isArray(label.key)) {
          const divider = label.divider || '-';
          const values = label.key.map(key => data[key]);
          const value = values.join(` ${divider} `);
          const content = customContent ? customContent(value, data) : value;
          return { label: content, ...rest };
        }
        if (label.mapper) {
          const value = data[label.key];
          const mappedValue = label.mapper(value);
          if (typeof mappedValue === 'string') {
            return { label: mappedValue, ...rest };
          }
          return { ...mappedValue, ...rest };
        }
        return { label: data[label.key], ...rest };
      }),
    [data, keyAndColumns],
  );
  return { gridColumns };
};

export default useItemColumn;
