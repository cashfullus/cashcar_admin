import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import { deselectAppPushListAction, getAppPushListAsync, selectAppPushListAction, toggleAppPushAction } from 'lib/modules/push';
import { GetAppPushListParams } from 'lib/modules/shared';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useAppPush = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.push.items);
  const selected = useSelector((state: RootState) => state.push.selected);
  const itemCount = useSelector((state: RootState) => state.push.item_count);
  const loading = useSelector((state: RootState) => state.loading.getAppPushList);
  const getAppPushList = useCallback((params: GetAppPushListParams) => dispatch(getAppPushListAsync.request(params)), [dispatch]);
  const toggleAppPush = useCallback((appPushId: number | string) => dispatch(toggleAppPushAction(+appPushId)), [dispatch]);
  const selectedAppPushList = useCallback(() => dispatch(selectAppPushListAction()), [dispatch]);
  const deselectedAppPushList = useCallback(() => dispatch(deselectAppPushListAction()), [dispatch]);
  useEffect(() => {
    getAppPushList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return { items, selected, itemCount, loading, toggleAppPush, selectedAppPushList, deselectedAppPushList, getAppPushList };
};

export default useAppPush;
