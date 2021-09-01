import { postDonateListAsync } from 'lib/modules/point-donate';
import { PostDonateListPayload } from 'lib/modules/shared';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const usePostDonate = () => {
  const dispatch = useDispatch();
  const postDonateList = useCallback(
    (payload: PostDonateListPayload) => dispatch(postDonateListAsync.request(payload)),
    [dispatch],
  );
  return { postDonateList };
};

export default usePostDonate;
