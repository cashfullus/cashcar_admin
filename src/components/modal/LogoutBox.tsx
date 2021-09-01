import React from 'react';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import { BRAND_COLOR_DARK_ORANGE } from 'styles/color.constants';
import Button from 'components/shared/Button';
import ModalTemplate, { ModalTemplateFooter, ModalTemplateHeader } from './ModalTemplate';

interface LogoutBoxProps {
  onClose: () => void;
  onLogout: () => void;
}

const LogoutBox: React.FC<LogoutBoxProps> = ({ onClose, onLogout }) => {
  return (
    <ModalTemplate>
      <ModalTemplateHeader>
        <span>정말 로그아웃 하시겠습니까?</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <ModalTemplateFooter style={{ marginTop: '3.5rem' }}>
        <Button buttonColor={BRAND_COLOR_DARK_ORANGE} style={{ width: '10rem', height: '100%' }} onClick={onLogout}>
          로그아웃
        </Button>
      </ModalTemplateFooter>
    </ModalTemplate>
  );
};

export default LogoutBox;
