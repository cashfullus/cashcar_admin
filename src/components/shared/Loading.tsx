import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default Loading;
