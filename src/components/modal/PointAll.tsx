import React, { useCallback, useState } from 'react';
import Button from 'components/shared/Button';
import usePostPoint from 'hooks/point/usePostPoint';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import { BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_400, GRAY_SCALE_WHITE } from 'styles/color.constants';
import { useSelector } from 'react-redux';
import { RootState } from 'lib/modules';
import ModalTemplate, { ModalTemplateHeader } from './ModalTemplate';

interface PointAllProps {
  onClose?: () => void;
}

const PointAll: React.FC<PointAllProps> = ({ onClose }) => {
  const user_list = useSelector((state: RootState) => state.point.selected);
  const [form, setForm] = useState<{ point: string; contents: string }>({ point: '', contents: '' });
  const { addAllPoint, subtractAllPoint } = usePostPoint();
  const onAdd = useCallback(() => {
    if (!form.contents) {
      return;
    }
    addAllPoint({ user_list, contents: form.contents, point: +form.point });
    return onClose && onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  const onSubtract = useCallback(() => {
    if (!form.contents) {
      return;
    }
    subtractAllPoint({ user_list, contents: form.contents, point: +form.point });
    return onClose && onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  return (
    <ModalTemplate style={{ width: '30rem' }}>
      <ModalTemplateHeader>
        <span>포인트 관리</span>
        <CloseSvg onClick={onClose} style={{ cursor: 'pointer' }} />
      </ModalTemplateHeader>
      <form style={{ width: '100%', marginTop: '1.5rem' }} onSubmit={e => e.preventDefault()}>
        <div style={{ position: 'relative', width: '60%', marginBottom: '1.5rem' }}>
          <input
            style={{
              outline: 'none',
              width: '100%',
              border: `1px solid ${GRAY_SCALE_400}`,
              backgroundColor: GRAY_SCALE_WHITE,
              borderRadius: '0.5rem',
              padding: '0.875rem 1rem',
              paddingRight: '2.5rem',
            }}
            placeholder="포인트 입력"
            value={form.point}
            onChange={e => setForm(prev => ({ ...prev, point: e.target.value }))}
          />
          <div
            style={{
              position: 'absolute',
              width: '1.5rem',
              textAlign: 'end',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
            }}
          >
            P
          </div>
        </div>
        <input
          style={{
            outline: 'none',
            width: '100%',
            border: `1px solid ${GRAY_SCALE_400}`,
            backgroundColor: GRAY_SCALE_WHITE,
            borderRadius: '0.5rem',
            padding: '0.875rem 1rem',
            paddingRight: '2.5rem',
            marginBottom: '1.5rem',
          }}
          placeholder="내역명을 입력하세요"
          value={form.contents}
          onChange={e => setForm(prev => ({ ...prev, contents: e.target.value }))}
        />
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <Button type="button" buttonColor={BRAND_COLOR_DARK_ORANGE} style={{ height: '2.5rem' }} fullRounded onClick={onAdd}>
            추가
          </Button>
          <Button
            type="button"
            buttonColor={BRAND_COLOR_DARK_ORANGE}
            style={{ height: '2.5rem' }}
            noFill
            fullRounded
            onClick={onSubtract}
          >
            차감
          </Button>
        </div>
      </form>
    </ModalTemplate>
  );
};

export default PointAll;
