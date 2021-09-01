import { postWithdrawListAsync } from 'lib/modules/point-withdraw';
import { PostWithdrawListPayload } from 'lib/modules/shared';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const usePostWithdraw = () => {
  const dispatch = useDispatch();
  const postWithdrawList = useCallback(
    (payload: PostWithdrawListPayload) => dispatch(postWithdrawListAsync.request(payload)),
    [dispatch],
  );
  return { postWithdrawList };
};

export default usePostWithdraw;
