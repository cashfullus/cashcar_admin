import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import {
  deselectDonateListAction,
  getDonateListAsync,
  selectDonateListAction,
  toggleDonateAction,
} from 'lib/modules/point-donate';
import { GetDonateListPayload } from 'lib/modules/shared';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useDonate = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.donate.items);
  const selected = useSelector((state: RootState) => state.donate.selected);
  const itemCount = useSelector((state: RootState) => state.donate.item_count);
  const loading = useSelector((state: RootState) => state.loading.getDonateList);
  const getDonateList = useCallback((payload: GetDonateListPayload) => dispatch(getDonateListAsync.request(payload)), [dispatch]);
  const toggleDonate = useCallback((userId: number | string) => dispatch(toggleDonateAction(+userId)), [dispatch]);
  const selectDonateList = useCallback(() => dispatch(selectDonateListAction()), [dispatch]);
  const deselectDonateList = useCallback(() => dispatch(deselectDonateListAction()), [dispatch]);
  useEffect(() => {
    getDonateList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return {
    items,
    selected,
    itemCount,
    getDonateList,
    toggleDonate,
    selectDonateList,
    deselectDonateList,
    loading,
  };
};

export default useDonate;
