import React from 'react';
import styled from 'styled-components';
import Input from 'components/shared/Input';
import Button from 'components/shared/Button';
import { BRAND_COLOR_DARK_GREEN, GRAY_SCALE_600 } from 'styles/color.constants';
import { useForm } from 'react-hook-form';
import useLogin from 'hooks/useLogin';
import { CircularProgress } from '@material-ui/core';

const AuthFormContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputLabel = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  color: ${GRAY_SCALE_600};
`;

const Spacer = styled.div<{ space?: string }>`
  margin-bottom: ${props => (props.space ? props.space : '1.5rem')};
`;

const AuthForm = () => {
  const { login, loading } = useLogin();
  const { register, handleSubmit } = useForm();
  return (
    <AuthFormContainer>
      <Form onSubmit={handleSubmit((data: any) => login(data))}>
        <div style={{ fontSize: '1.25rem' }}>로그인</div>
        <Spacer />
        <InputLabel>아이디</InputLabel>
        <Input placeholder="아이디를 입력하세요" register={register('login_id', { required: true })} />
        <Spacer />
        <InputLabel>비밀번호</InputLabel>
        <Input placeholder="비밀번호를 입력하세요" register={register('password', { required: true })} />
        <Spacer />
        <Button fullRounded buttonColor={BRAND_COLOR_DARK_GREEN} loading={loading}>
          {loading ? <CircularProgress /> : '로그인'}
        </Button>
      </Form>
    </AuthFormContainer>
  );
};

export default AuthForm;
