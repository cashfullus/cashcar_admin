import { RootState } from "lib/modules";
import { clearMessageAction, MessageState } from "lib/modules/messages";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useToastify = (key: keyof MessageState) => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.messages[key]);
  const clearMessage = useCallback(
    () => dispatch(clearMessageAction(key)),
    [dispatch, key]
  );
  useEffect(() => {
    if (message) {
      toast[message.type](message.message);
      clearMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
  return;
};

export default useToastify;
