import React from 'react';
import styled from 'styled-components';
import { BRAND_COLOR_DARK_GREEN, BRAND_COLOR_DARK_ORANGE, GRAY_SCALE_WHITE } from 'styles/color.constants';
import { DRAWER_WIDTH, MAIN_TEMPLATE_CHILDREN_PADDING_LEFT, MAIN_TEMPLATE_HORIZONTAL_PADDING } from 'styles/size.constants';
import Button from './Button';
import CsvDownloadButton from 'react-json-to-csv';

interface HeaderProps {
  hideDownloadButton?: boolean;
  hideActionButton?: boolean;
  onDowloadButtonClick?: () => void;
  onActionButtonClick?: () => void;
  actionButtonText?: string;
  data?: any;
  downloadFilename?: string;
}

const LEFT = parseInt(MAIN_TEMPLATE_HORIZONTAL_PADDING, 10) + parseInt(DRAWER_WIDTH, 10);

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: ${LEFT}rem;
  right: ${MAIN_TEMPLATE_HORIZONTAL_PADDING};
  height: 4rem;
  min-width: 67rem;
  padding: 0.75rem 0;
  background-color: ${GRAY_SCALE_WHITE};
  padding-left: ${MAIN_TEMPLATE_CHILDREN_PADDING_LEFT};
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  @media (max-width: 1440px) {
    left: ${LEFT - 4}rem;
    right: 3rem;
  }
  @media (max-width: 1320px) {
    left: ${LEFT - 8}rem;
  }
`;

const HeaderColumn = styled.div`
  width: 10rem;
  height: 100%;
`;

export const Spacer = styled.div`
  height: 4.25rem;
`;

const Header: React.FC<HeaderProps> = ({
  hideDownloadButton = false,
  hideActionButton = false,
  onActionButtonClick,
  onDowloadButtonClick,
  actionButtonText,
  data,
  downloadFilename
}) => {
  return (
    <>
      <HeaderContainer>
        {!hideDownloadButton && (
          <HeaderColumn>
            <CsvDownloadButton filename={downloadFilename} data={data} delimiter=',' style={{width: "100%",
              height: "100%",
              outline: "none",
              border: 'none',
              color: 'white',
              padding: "0.5rem",
              cursor: "pointer",
              transition: "0.2s",
              borderRadius: "1.25rem",
              backgroundColor:BRAND_COLOR_DARK_GREEN}}
            >다운로드</CsvDownloadButton>
          </HeaderColumn>
        )}
        {!hideActionButton && (
          <HeaderColumn>
            <Button onClick={onActionButtonClick} fullRounded buttonColor={BRAND_COLOR_DARK_ORANGE}>
              {actionButtonText}
            </Button>
          </HeaderColumn>
        )}
      </HeaderContainer>
      <Spacer />
    </>
  );
};

export default React.memo(Header);
