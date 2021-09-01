import { initializationAsync } from "lib/modules/shared";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useInitialization = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializationAsync.request());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return;
};

export default useInitialization;
