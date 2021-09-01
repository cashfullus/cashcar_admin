import React from 'react';
import styled from 'styled-components';
import Drawer from './components/Drawer';
import { MAIN_TEMPLATE_CHILDREN_PADDING_LEFT, MAIN_TEMPLATE_HORIZONTAL_PADDING } from 'styles/size.constants';
import useCheckLogin from 'hooks/useCheckLogin';

const TemplateContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 ${MAIN_TEMPLATE_HORIZONTAL_PADDING};
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  @media (max-width: 1440px) {
    padding-left: 4rem;
    padding-right: 3rem;
  }
  @media (max-width: 1320px) {
    padding-left: 0;
  }
`;

const ChildrenContainer = styled.div`
  flex: 1;
  min-width: 67rem;
  position: relative;
  padding-left: ${MAIN_TEMPLATE_CHILDREN_PADDING_LEFT};
  height: 100%;
  overflow: auto;
`;

const MainTemplate: React.FC = ({ children }) => {
  useCheckLogin();
  return (
    <TemplateContainer>
      <Drawer />
      <ChildrenContainer>{children}</ChildrenContainer>
    </TemplateContainer>
  );
};

export default MainTemplate;
