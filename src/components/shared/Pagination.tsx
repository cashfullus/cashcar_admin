import React from 'react';
import styled from 'styled-components';
import { Pagination as MaterialPagination } from '@material-ui/lab';
import { DRAWER_WIDTH, MAIN_TEMPLATE_CHILDREN_PADDING_LEFT, MAIN_TEMPLATE_HORIZONTAL_PADDING } from 'styles/size.constants';
import { GRAY_SCALE_WHITE } from 'styles/color.constants';
import Dropdown from './Dropdown';
import { Option } from 'types/common';

export const PAGE_SIZE_10 = 10;
export const PAGE_SIZE_30 = 30;
export const PAGE_SIZE_50 = 50;
export const PAGE_SIZE_100 = 100;

interface PaginationProps {
  totalPage: number;
  defaultPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  onItemCountChange: (nextState: Option['value']) => void;
}

const LEFT =
  parseInt(MAIN_TEMPLATE_HORIZONTAL_PADDING, 10) + parseInt(MAIN_TEMPLATE_CHILDREN_PADDING_LEFT, 10) + parseInt(DRAWER_WIDTH, 10);

const PaginationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: ${LEFT}rem;
  right: ${MAIN_TEMPLATE_HORIZONTAL_PADDING};
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${GRAY_SCALE_WHITE};
  z-index: 100;
`;

const Spacer = styled.div`
  height: 3.5rem;
`;

const Pagination: React.FC<PaginationProps> = ({ totalPage, defaultPage, onPageChange, onItemCountChange }) => {
  return (
    <>
      <Spacer />
      <PaginationContainer>
        <MaterialPagination
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          defaultPage={defaultPage}
          onChange={onPageChange}
          count={totalPage}
        />
        <div style={{ width: '7.5rem', height: '80%' }}>
          <Dropdown
            noFill
            style={{ width: '100%', position: 'relative' }}
            options={[
              { label: '10개씩 보기', value: PAGE_SIZE_10 },
              { label: '30개씩 보기', value: PAGE_SIZE_30 },
              { label: '50개씩 보기', value: PAGE_SIZE_50 },
              { label: '100개씩 보기', value: PAGE_SIZE_100 },
            ]}
            defaultValue={PAGE_SIZE_10}
            onChange={onItemCountChange}
          />
        </div>
      </PaginationContainer>
    </>
  );
};

export default React.memo(Pagination);
