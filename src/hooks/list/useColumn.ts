import React, { useMemo } from 'react';

interface UseListColumnOptions {
  useCollapse?: boolean;
  useCheckbox?: boolean;
}

export interface HeaderColumn {
  headerLabel: string;
  column: string;
}

export interface Column {
  color?: string;
  truncate?: boolean;
  html?: boolean;
  column: string;
}

type MapperReturnType = string | { label: string; color: string };
interface CustomKey<Data> {
  key: keyof Data | (keyof Data)[];
  divider?: string; // 기본값 hyphen ( - )
  mapper?: (data: any) => MapperReturnType;
}

export interface ListColumn<Data> extends Column {
  headerLabel: string;
  label: keyof Data | CustomKey<Data> | '';
  customContent?: (label: any, data: Data) => React.ReactNode;
}

export interface ListProps<Data> {
  onHeaderCheckboxClick?: () => void;
  onCheckboxClick?: (data: Data) => void;
  headerItems: ListColumn<Data>[];
  items: Data[];
  headerChecked?: boolean;
  selected?: (number | string)[];
  loading?: boolean;
  useCollapse?: boolean;
}

const CHECKBOX_COLUMN = '2rem';
const MORE_COLUMN = '3rem';

const checkboxColumn = {
  label: '' as const,
  column: CHECKBOX_COLUMN,
};

const moreHeaderColumn = {
  headerLabel: '더보기',
  column: MORE_COLUMN,
};

const moreColumn = {
  label: '' as const,
  column: MORE_COLUMN,
};

// Checkbox Column은 여기에서 추가하지 않고, ListHeader Component에서 처리함.

const useColumn = <Data>(listColumns: ListColumn<Data>[], { useCollapse, useCheckbox }: UseListColumnOptions) => {
  let headerColumns: HeaderColumn[] = useMemo(
    () => listColumns.map(({ headerLabel, column }) => ({ headerLabel, column })),
    [listColumns],
  );
  headerColumns = [...headerColumns, ...(useCollapse ? [moreHeaderColumn] : [])];
  let keyAndColumns = useMemo(() => listColumns.map(({ headerLabel, ...rest }) => rest), [listColumns]);
  keyAndColumns = [...(useCheckbox ? [checkboxColumn] : []), ...keyAndColumns, ...(useCollapse ? [moreColumn] : [])];
  return { headerColumns, keyAndColumns };
};

export default useColumn;
