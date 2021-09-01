import React from 'react';
import styled, { css } from 'styled-components';
import mainLogo from 'assets/main-logo.svg';
import { BRAND_COLOR_DARK_ORANGE } from 'styles/color.constants';

const AuthBoxColumnCSS = css`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  ${AuthBoxColumnCSS}
  background-color: ${BRAND_COLOR_DARK_ORANGE};
`;

const AuthLogo = () => {
  return (
    <LogoContainer>
      <img src={mainLogo} alt="main-logo" />
    </LogoContainer>
  );
};

export default AuthLogo;
