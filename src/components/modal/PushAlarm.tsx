import Button from 'components/shared/Button';
import useModal from 'hooks/useModal';
import React, { useCallback, useState } from 'react';
import {
  BRAND_COLOR_DARK_ORANGE,
  BRAND_COLOR_LIGHT_ORANGE,
  GRAY_SCALE_200,
  GRAY_SCALE_500,
  GRAY_SCALE_600,
  GRAY_SCALE_BLACK,
} from 'styles/color.constants';
import Modal from './Modal';
import { ReactComponent as PlusSvg } from 'assets/plus-circle.svg';
import MarketingUserList from './MarketingUserList';
import useAppPushUser from 'hooks/alarm/useAppPushUser';
import usePostAppPush from 'hooks/alarm/usePostAppPush';
import ModalTemplate, { ModalTemplateFooter } from './ModalTemplate';

interface PushAlarmProps {
  onClose: () => void;
}

const PushAlarm: React.FC<PushAlarmProps> = ({ onClose }) => {
  const [userListModal, openUserListModal, closeUserListModal] = useModal();
  const { sendAppPush } = usePostAppPush();
  const [form, setForm] = useState<{ title: string; body: string }>({ title: '', body: '' });
  const pushUserTools = useAppPushUser();
  const onSendButtonClick = useCallback(() => {
    const user_list = pushUserTools.appPushUser.map(({ id }) => +id);
    sendAppPush({ user_list, ...form });
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushUserTools.appPushUser, form]);
  const onPlusCircleClick = () => {
    pushUserTools.clearPushUserList();
    openUserListModal();
  };
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
            {pushUserTools.appPushUser.length === 0
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
                ))}
          </div>
          <PlusSvg style={{ cursor: 'pointer' }} onClick={onPlusCircleClick} />
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
      {userListModal && (
        <Modal closeOnClickOutside={false} onClose={closeUserListModal}>
          <MarketingUserList {...pushUserTools} onClose={closeUserListModal} />
        </Modal>
      )}
    </ModalTemplate>
  );
};

export default PushAlarm;
