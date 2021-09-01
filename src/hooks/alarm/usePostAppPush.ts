import { useCallback } from 'react';
import { resendAppPushAsync, sendAppPushAsync } from 'lib/modules/push';
import { ResendAppPushParams, SendAppPushPayload } from 'lib/modules/shared';
import { useDispatch } from 'react-redux';

const usePostAppPush = () => {
  const dispatch = useDispatch();
  const sendAppPush = useCallback((payload: SendAppPushPayload) => dispatch(sendAppPushAsync.request(payload)), [dispatch]);
  const resendAppPush = useCallback((payload: ResendAppPushParams) => dispatch(resendAppPushAsync.request(payload)), [dispatch]);
  return { sendAppPush, resendAppPush };
};

export default usePostAppPush;
