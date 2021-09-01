import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import { GetCashcarTipListPayload } from 'lib/modules/shared';
import {
  deselectCashcarTipListAction,
  getCashcarTipListAsync,
  selectCashcarTipListAction,
  toggleCashcarTipAction,
} from 'lib/modules/tip';

const useTip = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.tip.items);
  const selected = useSelector((state: RootState) => state.tip.selected);
  const itemCount = useSelector((state: RootState) => state.tip.item_count);
  const loading = useSelector((state: RootState) => state.loading.getCashcarTipList);
  const getCashcarTipList = useCallback(
    (payload: GetCashcarTipListPayload) => dispatch(getCashcarTipListAsync.request(payload)),
    [dispatch],
  );
  const toggleCashcarTip = useCallback(
    (cashcarTipId: number | string) => dispatch(toggleCashcarTipAction(+cashcarTipId)),
    [dispatch],
  );
  const selectCashcarTipList = useCallback(() => dispatch(selectCashcarTipListAction()), [dispatch]);
  const deselectCashcarTipList = useCallback(() => dispatch(deselectCashcarTipListAction()), [dispatch]);
  useEffect(() => {
    getCashcarTipList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return {
    items,
    selected,
    itemCount,
    getCashcarTipList,
    toggleCashcarTip,
    selectCashcarTipList,
    deselectCashcarTipList,
    loading,
  };
};

export default useTip;
