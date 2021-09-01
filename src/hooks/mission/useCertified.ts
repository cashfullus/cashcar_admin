import { PAGE_SIZE_10 } from 'components/shared/Pagination';
import { RootState } from 'lib/modules';
import {
  deselectCertifiedListAction,
  getCertifiedListAsync,
  selectCertifiedListAction,
  toggleCertifiedAction,
} from 'lib/modules/certified-mission';
import { GetCertifiedListPayload } from 'lib/modules/shared';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCertified = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.certified.items);
  const selected = useSelector((state: RootState) => state.certified.selected);
  const itemCount = useSelector((state: RootState) => state.certified.item_count);
  const loading = useSelector((state: RootState) => state.loading.getCertifiedList);
  const getCertifiedList = useCallback(
    (payload: GetCertifiedListPayload) => dispatch(getCertifiedListAsync.request(payload)),
    [dispatch],
  );
  const toggleCertified = useCallback(
    (userId: string | number) => dispatch(toggleCertifiedAction(userId.toString())),
    [dispatch],
  );
  const selectCertifiedList = useCallback(() => dispatch(selectCertifiedListAction()), [dispatch]);
  const deselectCertifiedList = useCallback(() => dispatch(deselectCertifiedListAction()), [dispatch]);
  useEffect(() => {
    getCertifiedList({ page: 1, count: PAGE_SIZE_10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return {
    items,
    selected,
    itemCount,
    getCertifiedList,
    toggleCertified,
    selectCertifiedList,
    deselectCertifiedList,
    loading,
  };
};

export default useCertified;
