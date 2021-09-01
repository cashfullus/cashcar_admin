import React from "react";
import styled from "styled-components";
import { GRAY_SCALE_WHITE } from "styles/color.constants";

const AuthBoxContainer = styled.div`
  width: 60rem;
  height: 47.5rem;
  border-radius: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-color: ${GRAY_SCALE_WHITE};
`;

const AuthBox: React.FC = ({ children }) => {
  return <AuthBoxContainer>{children}</AuthBoxContainer>;
};

export default AuthBox;
