import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GRAY_SCALE_500 } from 'styles/color.constants';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import { Pagination } from '@material-ui/lab';
import { GetPointHistoryResponse } from 'lib/modules/shared';
import userAPI from 'lib/apis/users';
import { addDayAtDate, minusOfSpecificIndexAtArray, pointWithCommas } from 'lib/tools';
import ModalTemplate, { ModalTemplateHeader, PaginationFooter } from './ModalTemplate';
import Loading from 'components/shared/Loading';

interface UserPointHistoryProps {
  onClose?: () => void;
  deposit: number;
  userId: number;
}

const PointListBody = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const BodyRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  align-items: center;
  justify-content: flex-start;
`;

const PointRow = styled.div`
  width: 100%;
  padding: 0.75rem 0;
  display: grid;
  column-gap: 1.5rem;
  grid-template-columns: 10rem 6rem 1fr 10rem;
  font-size: 0.875rem;
`;

const ITEM_COUNT = 10;

const UserPointHistory: React.FC<UserPointHistoryProps> = ({ onClose, userId, deposit }) => {
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [historyPage, setHistoryPage] = useState(1);
  const [points, setPoints] = useState<GetPointHistoryResponse['data']>([]);
  const [balance, setBalance] = useState<number[]>([]);
  const loadAdUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getPointHistory({
        user_id: userId,
      });
      const itemCount = response.data.length || 1;
      setBalance([deposit, ...response.data.map(item => item.point)]);
      setTotalPage(Math.ceil(itemCount / ITEM_COUNT));
      setPoints(response.data);
    } catch (error) {
      setPoints([]);
    } finally {
      setLoading(false);
    }
  };
  const onChange = useCallback(
    (_: any, page: number) => {
      setHistoryPage(page);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useEffect(() => {
    loadAdUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ModalTemplate style={{ width: '54rem', height: '38rem' }}>
      <ModalTemplateHeader>
        <span>포인트 내역</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <PointListBody>
        {loading ? (
          <Loading />
        ) : (
          <BodyRow>
            {points.slice((historyPage - 1) * 10, historyPage * 10).map((point, idx) => {
              return (
                <PointRow key={point.register_time + point.contents}>
                  <span>{addDayAtDate(point.register_time)}</span>
                  <span>{pointWithCommas(point.point)}</span>
                  <span className="truncate">{point.contents}</span>
                  <span style={{ color: GRAY_SCALE_500, placeSelf: 'end' }}>
                    <span style={{ marginRight: '0.25rem' }}>잔액 : </span>
                    <span>{minusOfSpecificIndexAtArray(balance, idx, historyPage)}</span>
                  </span>
                </PointRow>
              );
            })}
          </BodyRow>
        )}
      </PointListBody>
      {totalPage !== 0 && (
        <PaginationFooter>
          <Pagination page={historyPage} onChange={onChange} count={totalPage} />
        </PaginationFooter>
      )}
    </ModalTemplate>
  );
};

export default React.memo(UserPointHistory);
