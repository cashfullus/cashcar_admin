import { useCallback } from "react";
import {
  deleteNoticeAsync,
  editNoticeAsync,
  registerNoticeAsync,
} from "lib/modules/notice";
import { useDispatch } from "react-redux";
import { EditNoticePayload, RegisterNoticePayload } from "lib/modules/shared";

const usePostNotice = () => {
  const dispatch = useDispatch();
  const registerNotice = useCallback(
    (payload: RegisterNoticePayload) =>
      dispatch(registerNoticeAsync.request(payload)),
    [dispatch]
  );
  const deleteNotice = useCallback(
    (notice_id: number) => dispatch(deleteNoticeAsync.request({ notice_id })),
    [dispatch]
  );
  const editNotice = useCallback(
    (payload: EditNoticePayload) => dispatch(editNoticeAsync.request(payload)),
    [dispatch]
  );
  return { registerNotice, deleteNotice, editNotice };
};

export default usePostNotice;
