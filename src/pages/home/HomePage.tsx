import useLogin from 'hooks/useLogin';
import React from 'react';
import AuthPage from './AuthPage';
import MainPage from './MainPage';

const HomePage = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <MainPage /> : <AuthPage />;
};

export default HomePage;
