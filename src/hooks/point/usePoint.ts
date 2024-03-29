import { useCallback, useEffect, useState } from 'react';
import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import { deselectPointListAction, getPointListAsync, selectPointListAction, togglePointAction } from 'lib/modules/point-overview';
import { GetPointListPayload } from 'lib/modules/shared';
import { useDispatch, useSelector } from 'react-redux';
import { filterDataFormatter } from 'lib/tools';

const usePoint = () => {
  const [filterS, setFilterS] = useState({});
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.point.items);
  const filter = useSelector((state: RootState) => state.filter.pointOverview);
  useEffect(() => {
    setFilterS(filterDataFormatter(filter))
  }, [filter])
  const selected = useSelector((state: RootState) => state.point.selected);
  const itemCount = useSelector((state: RootState) => state.point.item_count);
  const loading = useSelector((state: RootState) => state.loading.getPointList);
  const getPointList = useCallback((payload: GetPointListPayload) => {
    dispatch(getPointListAsync.request({...payload, ...filterS}));
  }, [dispatch, filter, filterS]);
  const togglePoint = useCallback((userId: number | string) => dispatch(togglePointAction(+userId)), [dispatch]);
  const selectPointList = useCallback(() => dispatch(selectPointListAction()), [dispatch]);
  const deselectPointList = useCallback(() => dispatch(deselectPointListAction()), [dispatch]);
  useEffect(() => {
    getPointList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return {
    items,
    selected,
    itemCount,
    getPointList,
    togglePoint,
    selectPointList,
    deselectPointList,
    loading,
  };
};

export default usePoint;
