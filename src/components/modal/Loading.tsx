import React from "react";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import Portal from "./Portal";

const LoadingContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Loading = () => {
  return (
    <Portal>
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    </Portal>
  );
};

export default Loading;
