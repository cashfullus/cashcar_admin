import { RootState } from "lib/modules";
import { postADApplyAsync } from "lib/modules/ad-apply";
import { ADApplyStatus } from "lib/modules/commonType";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const usePostADApply = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.postADApply);
  const postADApply = useCallback(
    (apply_user_list: number[], status: ADApplyStatus) =>
      dispatch(postADApplyAsync.request({ apply_user_list, status })),
    [dispatch]
  );
  return { loading, postADApply };
};

export default usePostADApply;
