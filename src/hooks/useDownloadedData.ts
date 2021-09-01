import { useMemo } from 'react';
import { RootData } from 'types/common';
import { ListColumn } from './list/useColumn';

interface UseDownloadProps<Data> {
  downloadItems: ListColumn<Data>[];
  items: Data[];
}

const useDownloadedData = <Data extends RootData>({ downloadItems, items }: UseDownloadProps<Data>) => {
  const headers = useMemo(
    () =>
      downloadItems
        .filter(item => item.label !== '')
        .map(({ headerLabel, label }) => {
          let key = '';
          if (typeof label === 'object') {
            if (Array.isArray(label.key)) {
              key = label.key[0].toString();
            } else {
              key = label.key.toString();
            }
          } else {
            key = label.toString();
          }
          return {
            label: headerLabel,
            key,
          };
        }),
    [downloadItems],
  );
  const dItems = useMemo(() => downloadItems.filter(item => item.label !== '').map(({ label }) => label), [downloadItems]);
  const data = useMemo(() => {
    return items.map(item => {
      const copiedItem = { ...item } as any;
      dItems.forEach(dItem => {
        if (typeof dItem === 'object') {
          if (Array.isArray(dItem.key)) {
            const divider = dItem.divider || '-';
            const values = dItem.key.map(key => item[key]);
            const value = values.join(` ${divider} `);
            copiedItem[dItem.key[0]] = value;
            return;
          }
          if (dItem.mapper) {
            const value = copiedItem[dItem.key];
            const mappedValue = dItem.mapper(value);
            if (typeof mappedValue === 'string') {
              copiedItem[dItem.key] = mappedValue;
              return;
            }
            copiedItem[dItem.key] = mappedValue.label;
            return;
          }
        }
      });
      return copiedItem;
    });
  }, [items, dItems]);
  return { headers, data };
};

export default useDownloadedData;
