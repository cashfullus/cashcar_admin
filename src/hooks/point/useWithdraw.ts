import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import {
  getWithdrawListAsync,
  toggleWithdrawAction,
  selectWithdrawListAction,
  deselectWithdrawListAction,
} from 'lib/modules/point-withdraw';
import { filterDataFormatter } from 'lib/tools';
import { GetWithdrawListPayload } from 'lib/modules/shared';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useWithdraw = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter.pointWithdraw);
  const items = useSelector((state: RootState) => state.withdraw.items);
  const selected = useSelector((state: RootState) => state.withdraw.selected);
  const itemCount = useSelector((state: RootState) => state.withdraw.item_count);
  const loading = useSelector((state: RootState) => state.loading.getWithdrawList);
  const getWithdrawList = useCallback(
    (payload: GetWithdrawListPayload) => dispatch(getWithdrawListAsync.request({...filterDataFormatter(filter), ...payload})),
    [dispatch, filter],
  );
  const toggleWithdraw = useCallback((userId: number | string) => dispatch(toggleWithdrawAction(+userId)), [dispatch]);
  const selectWithdrawList = useCallback(() => dispatch(selectWithdrawListAction()), [dispatch]);
  const deselectWithdrawList = useCallback(() => dispatch(deselectWithdrawListAction()), [dispatch]);
  useEffect(() => {
    getWithdrawList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return {
    items,
    selected,
    itemCount,
    getWithdrawList,
    toggleWithdraw,
    selectWithdrawList,
    deselectWithdrawList,
    loading,
  };
};

export default useWithdraw;
