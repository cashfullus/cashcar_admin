import React, { useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';
import { BRAND_COLOR_DARK_GREEN } from 'styles/color.constants';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import CheckBox from '../shared/CheckBox';
import Button from '../shared/Button';
import ModalTemplate, { ModalTemplateFooter, ModalTemplateHeader } from './ModalTemplate';
import { RootData } from 'types/common';
import { ListColumn } from 'hooks/list/useColumn';
import useDownloadedData from 'hooks/useDownloadedData';

interface DownloadProps<Data> {
  onClose?: () => void;
  downloadItems: ListColumn<Data>[];
  filename: string;
  items: Data[];
  allowDownload?: boolean;
}

const DownloadBody = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  flex-wrap: wrap;
`;

const DownloadItem = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  margin-bottom: 2rem;
  user-select: none;
`;

const Download = <Data extends RootData>({
  onClose,
  downloadItems,
  items,
  filename,
  allowDownload = false,
}: DownloadProps<Data>) => {
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({});
  const { headers, data } = useDownloadedData({ downloadItems, items });
  const downloadTarget = useMemo(() => {
    const header = Object.keys(checklist).filter(key => checklist[key]);
    return data.map(item => {
      const assertedItem = item as any;
      const data = {} as any;
      header.forEach(key => {
        data[key] = assertedItem[key];
      });
      return data;
    });
  }, [checklist, data]);
  return (
    <ModalTemplate style={{ width: '48rem' }}>
      <ModalTemplateHeader>
        <span>다운로드 항목 선택</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <DownloadBody>
        {headers.map(item => (
          <DownloadItem key={item.key}>
            <CheckBox
              name={item.key}
              checked={checklist[item.key] || false}
              onChange={e =>
                setChecklist({
                  ...checklist,
                  [e.target.name]: !checklist[e.target.name],
                })
              }
            />
            <span
              style={{
                marginLeft: '0.3rem',
                paddingBottom: '1px',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </span>
          </DownloadItem>
        ))}
      </DownloadBody>
      <ModalTemplateFooter>
        <Button
          type="button"
          buttonColor={BRAND_COLOR_DARK_GREEN}
          style={{ width: '10rem', height: '100%', padding: 0 }}
          disabled={!allowDownload}
        >
          {allowDownload ? (
            <CSVLink
              filename={`${filename}.csv`}
              style={{
                width: '100%',
                height: '100%',
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              headers={headers}
              data={downloadTarget}
            >
              다운로드
            </CSVLink>
          ) : (
            '다운 불가'
          )}
        </Button>
      </ModalTemplateFooter>
    </ModalTemplate>
  );
};

export default React.memo(Download) as typeof Download;
