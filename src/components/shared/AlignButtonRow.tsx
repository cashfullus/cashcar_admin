import React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from 'components/shared/Button';

export interface RowButtonProps extends ButtonProps {
  text: string;
  hide?: boolean;
}

interface AlignButtonRowProps {
  align?: 'left' | 'center' | 'right' | 'space-between';
  gap?: string;
  buttons: RowButtonProps[];
  marginTop?: string;
  marginBottom?: string;
  paddingBottom?: string;
  paddingTop?: string;
  style?: React.CSSProperties;
}

const AlignButtonRowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const AlignButtonRow: React.FC<AlignButtonRowProps> = ({
  align = 'right',
  gap = '1rem',
  marginTop,
  marginBottom,
  buttons,
  paddingBottom,
  paddingTop,
  style,
}) => {
  let justifyContent = '';
  if (align === 'left') {
    justifyContent = 'flex-start';
  } else if (align === 'right') {
    justifyContent = 'flex-end';
  } else {
    justifyContent = align;
  }
  return (
    <AlignButtonRowContainer style={{ justifyContent, gap, marginTop, marginBottom, paddingBottom, paddingTop, ...style }}>
      {buttons
        .filter(b => !b.hide)
        .map(({ text, ...attrs }) => (
          <div key={text} style={{ width: '10rem', height: '2.5rem' }}>
            <Button {...attrs}>{text}</Button>
          </div>
        ))}
    </AlignButtonRowContainer>
  );
};

export default React.memo(AlignButtonRow);
