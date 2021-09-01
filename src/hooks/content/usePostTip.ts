import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  EditCashcarTipPayload,
  RegisterCashcarTipPayload,
} from "lib/modules/shared";
import {
  deleteCashcarTipAsync,
  editCashcarTipAsync,
  registerCashcarTipAsync,
} from "lib/modules/tip";

const usePostTip = () => {
  const dispatch = useDispatch();
  const registerCashcarTip = useCallback(
    (payload: RegisterCashcarTipPayload) =>
      dispatch(registerCashcarTipAsync.request(payload)),
    [dispatch]
  );
  const deleteCashcarTip = useCallback(
    (cash_car_tip_id: number) =>
      dispatch(deleteCashcarTipAsync.request({ cash_car_tip_id })),
    [dispatch]
  );
  const editCashcarTip = useCallback(
    (payload: EditCashcarTipPayload) =>
      dispatch(editCashcarTipAsync.request(payload)),
    [dispatch]
  );
  return { registerCashcarTip, deleteCashcarTip, editCashcarTip };
};

export default usePostTip;
