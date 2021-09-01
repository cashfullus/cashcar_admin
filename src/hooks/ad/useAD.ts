import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import { getADListAsync, toggleADAction, selectADListAction, deselectADListAction } from 'lib/modules/ad';
import { GetADListPayload } from 'lib/modules/shared';
import { filterDataFormatter } from 'lib/tools';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useAD = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter.adList);
  const items = useSelector((state: RootState) => state.ad.items);
  const selected = useSelector((state: RootState) => state.ad.selected);
  const itemCount = useSelector((state: RootState) => state.ad.item_count);
  const loading = useSelector((state: RootState) => state.loading.getADList);
  const getADList = useCallback(
    (payload: GetADListPayload) => dispatch(getADListAsync.request({ ...payload, ...filterDataFormatter(filter) })),
    [dispatch, filter],
  );
  const toggleAD = useCallback((adId: number | string) => dispatch(toggleADAction(+adId)), [dispatch]);
  const selectADList = useCallback(() => dispatch(selectADListAction()), [dispatch]);
  const deselectADList = useCallback(() => dispatch(deselectADListAction()), [dispatch]);
  useEffect(() => {
    getADList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return {
    items,
    selected,
    itemCount,
    getADList,
    toggleAD,
    selectADList,
    deselectADList,
    loading,
  };
};

export default useAD;
