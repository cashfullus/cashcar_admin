import React from "react";
import styled, { css } from "styled-components";
import { GRAY_SCALE_500 } from "styles/color.constants";

interface DetailRowProps {
  title: string;
  horizontal?: boolean;
  style?: React.CSSProperties;
}

const RowTitle = styled.div<{ horizontal?: boolean }>`
  color: ${GRAY_SCALE_500};
  font-size: 0.875rem;
  ${props => (props.horizontal ? `margin-right: 1rem` : `margin-bottom: 1rem`)};
`;

const DetailRowContainer = styled.div<{ horizontal?: boolean }>`
  width: 100%;
  margin-bottom: ${props => (props.horizontal ? "1.5rem" : "3rem")};
  ${props =>
    props.horizontal &&
    css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
    `}
`;

const DetailRow: React.FC<DetailRowProps> = ({
  children,
  title,
  style,
  horizontal,
}) => {
  return (
    <DetailRowContainer horizontal={horizontal} style={style}>
      <RowTitle horizontal={horizontal}>{title}</RowTitle>
      <div>{children}</div>
    </DetailRowContainer>
  );
};

export default DetailRow;
