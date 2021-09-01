import React from 'react';
import styled from 'styled-components';
import useAccordion from 'hooks/useAccordion';
import { ReactComponent as ExpendSvg } from 'assets/accordion-expend.svg';
import { GRAY_SCALE_100, GRAY_SCALE_150 } from 'styles/color.constants';

export interface AccordionProps {
  title: string;
}

export const AccordionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 0.875rem;
  user-select: none;
`;

export const AccordionSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  min-height: 3.5rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  background-color: ${GRAY_SCALE_150};
  border-radius: 0.5rem;
  transition: all 0.2s ease;
`;

export const Title = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ExpendButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: transform 0.2s ease;
`;

export const AccordionDetail = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: all 0.35s ease;
  background-color: ${GRAY_SCALE_100};
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

export const ChildrenContainer = styled.div`
  padding: 1rem;
`;

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const { detailRef, contentRef, expandRef, summaryRef, handleExpendButtonClick } = useAccordion();
  return (
    <AccordionContainer>
      <AccordionSummary ref={summaryRef} onClick={handleExpendButtonClick}>
        <Title>{title}</Title>
        <ExpendButton ref={expandRef}>
          <ExpendSvg />
        </ExpendButton>
      </AccordionSummary>
      <AccordionDetail ref={detailRef}>
        <ChildrenContainer ref={contentRef}>{children}</ChildrenContainer>
      </AccordionDetail>
    </AccordionContainer>
  );
};

export default Accordion;
