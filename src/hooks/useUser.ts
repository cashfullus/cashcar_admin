import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import { GetUserListPayload } from 'lib/modules/shared';
import { deselectUserListAction, getUserListAsync, selectUserListAction, toggleUserAction } from 'lib/modules/users';
import { filterDataFormatter } from 'lib/tools';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useUser = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter.allUsers);
  const items = useSelector((state: RootState) => state.users.items);
  const selected = useSelector((state: RootState) => state.users.selected);
  const itemCount = useSelector((state: RootState) => state.users.item_count);
  const loading = useSelector((state: RootState) => state.loading.getUserList);
  const getUserList = useCallback(
    (payload: GetUserListPayload) => dispatch(getUserListAsync.request({ ...payload, ...filterDataFormatter(filter) })),
    [dispatch, filter],
  );
  const toggleUser = useCallback((userId: number | string) => dispatch(toggleUserAction(+userId)), [dispatch]);
  const selectUserList = useCallback(() => dispatch(selectUserListAction()), [dispatch]);
  const deselectUserList = useCallback(() => dispatch(deselectUserListAction()), [dispatch]);
  useEffect(() => {
    getUserList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return {
    items,
    selected,
    itemCount,
    getUserList,
    toggleUser,
    selectUserList,
    deselectUserList,
    loading,
  };
};

export default useUser;
