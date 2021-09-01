import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import { deselectNoticeListAction, getNoticeListAsync, selectNoticeListAction, toggleNoticeAction } from 'lib/modules/notice';
import { GetNoticeListPayload } from 'lib/modules/shared';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useNotice = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.notice.items);
  const selected = useSelector((state: RootState) => state.notice.selected);
  const itemCount = useSelector((state: RootState) => state.notice.item_count);
  const loading = useSelector((state: RootState) => state.loading.getNoticeList);
  const getNoticeList = useCallback((payload: GetNoticeListPayload) => dispatch(getNoticeListAsync.request(payload)), [dispatch]);
  const toggleNotice = useCallback((noticeId: number) => dispatch(toggleNoticeAction(noticeId)), [dispatch]);
  const selectNoticeList = useCallback(() => dispatch(selectNoticeListAction()), [dispatch]);
  const deselectNoticeList = useCallback(() => dispatch(deselectNoticeListAction()), [dispatch]);
  useEffect(() => {
    getNoticeList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return {
    items,
    selected,
    itemCount,
    getNoticeList,
    toggleNotice,
    selectNoticeList,
    deselectNoticeList,
    loading,
  };
};

export default useNotice;
