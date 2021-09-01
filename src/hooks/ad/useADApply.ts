import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import {
  deselectADApplyListAction,
  getADApplyListAsync,
  selectADApplyListAction,
  toggleADApplyAction,
} from 'lib/modules/ad-apply';
import { GetADApplyListPayload } from 'lib/modules/shared';
import { filterDataFormatter } from 'lib/tools';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useADApply = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter.adApply);
  const items = useSelector((state: RootState) => state.adApply.items);
  const itemCount = useSelector((state: RootState) => state.adApply.item_count);
  const selected = useSelector((state: RootState) => state.adApply.selected);
  const loading = useSelector((state: RootState) => state.loading.getADApplyList);
  const getADApplyList = useCallback(
    (payload: GetADApplyListPayload) => dispatch(getADApplyListAsync.request({ ...payload, ...filterDataFormatter(filter) })),
    [dispatch, filter],
  );
  const toggleADApply = useCallback((adApplyId: number | string) => dispatch(toggleADApplyAction(+adApplyId)), [dispatch]);
  const selectADApplyList = useCallback(() => dispatch(selectADApplyListAction()), [dispatch]);
  const deselectADApplyList = useCallback(() => dispatch(deselectADApplyListAction()), [dispatch]);
  useEffect(() => {
    getADApplyList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return {
    items,
    itemCount,
    selected,
    loading,
    getADApplyList,
    toggleADApply,
    selectADApplyList,
    deselectADApplyList,
  };
};

export default useADApply;
