import Button from 'components/shared/Button';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BRAND_COLOR_DARK_ORANGE,
  BRAND_COLOR_LIGHT_ORANGE,
  GRAY_SCALE_200,
  GRAY_SCALE_500,
  GRAY_SCALE_600,
  GRAY_SCALE_BLACK,
} from 'styles/color.constants';
import { ReactComponent as PlusSvg } from 'assets/plus-circle.svg';
import usePostAppPush from 'hooks/alarm/usePostAppPush';
import ModalTemplate, { ModalTemplateFooter } from './ModalTemplate';
import useAppPushUser from 'hooks/alarm/useAppPushUser';

interface PushAlarmProps {
  onClose: () => void;
  onPlusCircleClick: () => void;
  pushUserTools: ReturnType<typeof useAppPushUser>;
  allUserIds: number[];
}

const PushAlarm: React.FC<PushAlarmProps> = ({ onClose, pushUserTools, onPlusCircleClick, allUserIds }) => {
  const [isAllUser, setIsAllUser] = useState(false);
  const { sendAppPush } = usePostAppPush();
  const [form, setForm] = useState<{ title: string; body: string }>({ title: '', body: '' });
  const onSendButtonClick = useCallback(() => {
    if (isAllUser) {
      const confirm = window.confirm(`정말로 전체 발송하시겠습니까?\n${allUserIds.length}명에게 발송됩니다.`);
      if (!confirm) {
        return;
      }
      const confirm2 = window.confirm(`전체 발송은 되돌릴 수 없습니다.\n정말로 전체 발송하시겠습니까?`);
      if (!confirm2) {
        return;
      }
      // console.log({ user_list: allUserIds, ...form });
      sendAppPush({ user_list: allUserIds, ...form });
      onClose();
      return;
    }
    setIsAllUser(false);
    const user_list = pushUserTools.appPushUser.map(({ id }) => +id);
    // console.log({ user_list, ...form });
    sendAppPush({ user_list, ...form });
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushUserTools.appPushUser, form, isAllUser, allUserIds]);
  useEffect(() => {
    setIsAllUser(false);
  }, [pushUserTools.appPushUser])
  return (
    <ModalTemplate>
      <div
        style={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: '5rem 1fr',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <div>수신인</div>
        <div
          style={{
            border: `1px solid ${GRAY_SCALE_200}`,
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            color: GRAY_SCALE_500,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {isAllUser && <span style={{color: BRAND_COLOR_DARK_ORANGE}}>전체 회원</span>}
            {!isAllUser && (pushUserTools.appPushUser.length === 0
              ? '수신인을 입력해주세요.'
              : pushUserTools.appPushUser.map(user => (
                  <span
                    key={user.id}
                    style={{
                      marginRight: '0.5rem',
                      backgroundColor: BRAND_COLOR_LIGHT_ORANGE,
                      color: GRAY_SCALE_BLACK,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '1rem',
                    }}
                  >
                    {user.name}
                  </span>
                )))}
          </div>
          <div style={{display: 'flex', alignItems:'center', justifyContent: 'flex-end', gap: '0.5rem'}}>
          {allUserIds.length !== 0 && <Button buttonColor={BRAND_COLOR_DARK_ORANGE}
          style={{ width: '5rem', height: '100%', fontSize: '0.75rem', padding: '0.25rem' }}
          fullRounded
          onClick={() => setIsAllUser(true)}>전체 발송</Button>}
          <PlusSvg style={{ cursor: 'pointer' }} onClick={onPlusCircleClick} />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: '5rem 1fr',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <div style={{ color: GRAY_SCALE_600 }}>알림이름</div>
        <input
          style={{
            border: `1px solid ${GRAY_SCALE_200}`,
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            color: GRAY_SCALE_BLACK,
            fontSize: '0.875rem',
            outline: 'none',
          }}
          placeholder="이름을 입력해주세요."
          value={form.title}
          onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>
      <div style={{ width: '100%' }}>
        <textarea
          style={{
            width: '100%',
            border: `1px solid ${GRAY_SCALE_200}`,
            borderRadius: '0.5rem',
            padding: '1rem',
            color: GRAY_SCALE_BLACK,
            resize: 'none',
            outline: 'none',
            fontSize: '0.875rem',
            height: '11rem',
            marginBottom: '0.75rem',
          }}
          placeholder="내용을 입력해주세요."
          value={form.body}
          onChange={e => setForm(prev => ({ ...prev, body: e.target.value }))}
        ></textarea>
      </div>
      <ModalTemplateFooter>
        <Button
          buttonColor={BRAND_COLOR_DARK_ORANGE}
          style={{ width: '10rem', height: '100%', marginRight: '0.75rem' }}
          fullRounded
          noFill
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          buttonColor={BRAND_COLOR_DARK_ORANGE}
          style={{ width: '10rem', height: '100%' }}
          fullRounded
          onClick={onSendButtonClick}
        >
          알림 발송
        </Button>
      </ModalTemplateFooter>
    </ModalTemplate>
  );
};

export default PushAlarm;
