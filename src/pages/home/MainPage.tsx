import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainTemplate from 'templates/MainTemplate';

const MainPage = () => {
  return (
    <MainTemplate>
      <Helmet>
        <title>메인페이지</title>
      </Helmet>
    </MainTemplate>
  );
};

export default MainPage;
