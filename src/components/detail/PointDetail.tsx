import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ExtendedPoint } from 'lib/modules/point-overview';
import { addDayAtDate, minusOfSpecificIndexAtArray, numberWithCommas, pointWithCommas } from 'lib/tools';
import DetailRow from './DetailRow';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_400, GRAY_SCALE_500, GRAY_SCALE_WHITE } from 'styles/color.constants';
import usePostPoint from 'hooks/point/usePostPoint';
import { Pagination } from '@material-ui/lab';
import Input from 'components/shared/Input';
import AlignButtonRow, { RowButtonProps } from 'components/shared/AlignButtonRow';

interface PointDetailProps {
  data: ExtendedPoint;
}

const PointDetail: React.FC<PointDetailProps> = ({ data }) => {
  const [balance, setBalance] = useState<number[]>([data.deposit, ...data.point_history.map(item => item.point)]);
  const [historyPage, setHistoryPage] = useState(1);
  const [form, setForm] = useState<{ point: string; contents: string }>({ point: '', contents: '' });
  const { addPoint, subtractPoint } = usePostPoint();
  const onAdd = useCallback(() => {
    if (!form.contents) {
      return;
    }
    addPoint({ user_id: data.id, contents: form.contents, point: +form.point });
    setForm({ point: '', contents: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  const onSubtract = useCallback(() => {
    if (!form.contents) {
      return;
    }
    subtractPoint({ user_id: data.id, contents: form.contents, point: +form.point });
    setForm({ point: '', contents: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  const buttons: RowButtonProps[] = useMemo(
    () => [
      {
        text: '차감',
        type: 'button',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        noFill: true,
        fullRounded: true,
        onClick: onSubtract,
      },
      {
        text: '추가',
        type: 'button',
        buttonColor: BRAND_COLOR_DARK_ORANGE,
        fullRounded: true,
        onClick: onAdd,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSubtract, onAdd],
  );
  useEffect(() => {
    setBalance([data.deposit, ...data.point_history.map(item => item.point)]);
  }, [data]);
  return (
    <div style={{ padding: '1rem' }}>
      <DetailRow title="보유 포인트" horizontal>
        <span style={{ marginLeft: '1rem' }}>{numberWithCommas(data.deposit)}</span>
        <span style={{ marginLeft: '0.5rem' }}>P</span>
      </DetailRow>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
        <DetailRow title="포인트 내역" style={{ marginBottom: 0 }}>
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(5, 1.5rem)', rowGap: '0.5rem' }}>
            {data.point_history.slice((historyPage - 1) * 5, historyPage * 5).map((item, idx) => (
              <div
                key={item.register_time}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '11rem 5rem 14rem 8rem',
                  columnGap: '1rem',
                  marginBottom: '0.5rem',
                }}
              >
                <span>{addDayAtDate(item.register_time)}</span>
                <span>{pointWithCommas(item.point)}</span>
                <span>{item.contents}</span>
                <span style={{ color: GRAY_SCALE_500 }}>
                  <span style={{ marginRight: '0.5rem' }}>잔액: </span>
                  <span> {minusOfSpecificIndexAtArray(balance, idx, historyPage, 5)}</span>
                </span>
              </div>
            ))}
          </div>
          {data.point_history.length !== 0 && (
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
              <Pagination
                count={Math.ceil(data.point_history.length / 5)}
                size="small"
                page={historyPage}
                onChange={(_, p) => setHistoryPage(p)}
              />
            </div>
          )}
        </DetailRow>
        <DetailRow title="포인트 관리">
          <form style={{ width: '100%' }} onSubmit={e => e.preventDefault()}>
            <Input
              placeholder="포인트 입력"
              value={form.point}
              containerStyle={{
                width: '60%',
                border: `1px solid ${GRAY_SCALE_400}`,
                backgroundColor: GRAY_SCALE_WHITE,
                marginBottom: '1rem',
              }}
              onChange={e => setForm(prev => ({ ...prev, point: e.target.value }))}
              unit="P"
            />
            <Input
              containerStyle={{
                border: `1px solid ${GRAY_SCALE_400}`,
                backgroundColor: GRAY_SCALE_WHITE,
                marginBottom: '1rem',
              }}
              placeholder="내역명을 입력하세요"
              value={form.contents}
              onChange={e => setForm(prev => ({ ...prev, contents: e.target.value }))}
            />
            <AlignButtonRow buttons={buttons} align="space-between" gap="0.75rem" />
          </form>
        </DetailRow>
      </div>
    </div>
  );
};

export default React.memo(PointDetail);
