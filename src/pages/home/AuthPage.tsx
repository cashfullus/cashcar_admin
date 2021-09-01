import React from "react";
import styled from "styled-components";
import { BRAND_COLOR_LIGHT_ORANGE } from "styles/color.constants";
import AuthBox from "components/auth/AuthBox";
import AuthLogo from "components/auth/AuthLogo";
import AuthForm from "components/auth/AuthForm";
import { Helmet } from "react-helmet-async";

const AuthPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${BRAND_COLOR_LIGHT_ORANGE};
`;

const AuthPage = () => {
  return (
    <AuthPageContainer>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <AuthBox>
        <AuthLogo />
        <AuthForm />
      </AuthBox>
    </AuthPageContainer>
  );
};

export default AuthPage;
