/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import useAccordion from 'hooks/useAccordion';
import { ReactComponent as ChevronSvg } from 'assets/chevron-vertical.svg';
import { GRAY_SCALE_100, GRAY_SCALE_200, GRAY_SCALE_WHITE } from 'styles/color.constants';
import { AccordionContainer, AccordionDetail, AccordionSummary, ChildrenContainer, ExpendButton } from './Accordion';
import CheckBox from './CheckBox';
import { ListItemCoreProps } from 'hooks/list/useItemColumn';

const ExtendedAccordionSummary = styled(AccordionSummary)`
  display: grid;
  gap: 1rem;
  padding: 0.625rem 0.75rem;
  background-color: ${GRAY_SCALE_WHITE};
  &:hover {
    background-color: ${GRAY_SCALE_200};
  }
`;

const ExtendedAccordionDetail = styled(AccordionDetail)`
  background-color: ${GRAY_SCALE_100};
`;

const ExtendedAccordion: React.FC<ListItemCoreProps> = ({ checked, onCheckboxClick, children, columns }) => {
  const onCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onCheckboxClick && onCheckboxClick();
  }, []);
  const labels = useMemo(
    () =>
      columns
        .map(({ label, truncate, color }, idx) => {
          if (idx === 0 && label === '') {
            return <CheckBox key="checkbox" checked={checked} onClick={e => e.stopPropagation()} onChange={onCheckboxChange} />;
          } else {
            return (
              <div key={idx} style={{ textAlign: 'center', color }} className={`${truncate ? 'truncate' : ''}`}>
                {label}
              </div>
            );
          }
        })
        .slice(0, -1),
    [checked],
  );
  const gridColumns = useMemo(() => [...columns.map(item => item.column)], [columns]);
  const { detailRef, contentRef, expandRef, summaryRef, handleExpendButtonClick } = useAccordion();
  const summaryStyle: React.CSSProperties = useMemo(() => ({ gridTemplateColumns: gridColumns.join(' ') }), [gridColumns]);
  return (
    <AccordionContainer>
      <ExtendedAccordionSummary ref={summaryRef} onClick={handleExpendButtonClick} style={summaryStyle}>
        {labels}
        <ExpendButton ref={expandRef}>
          <ChevronSvg />
        </ExpendButton>
      </ExtendedAccordionSummary>
      <ExtendedAccordionDetail ref={detailRef}>
        <ChildrenContainer ref={contentRef}>{children}</ChildrenContainer>
      </ExtendedAccordionDetail>
    </AccordionContainer>
  );
};

export default ExtendedAccordion;
