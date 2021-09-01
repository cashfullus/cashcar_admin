import { call, put, takeLatest } from "@redux-saga/core/effects";
import contentAPI from "lib/apis/contents";
import { finishLoading, startLoading } from "../loading";
import { setMessageAction } from "../messages";
import {
  EditCashcarTipResponse,
  GetCashcarTipListResponse,
  RegisterCashcarTipResponse,
} from "../shared";
import {
  deleteCashcarTipAsync,
  DELETE_CASHCAR_TIP_REQUEST,
  editCashcarTipAsync,
  EDIT_CASHCAR_TIP_REQUEST,
  getCashcarTipListAsync,
  GET_CASHCAR_TIP_LIST_REQUEST,
  registerCashcarTipAsync,
  REGISTER_CASHCAR_TIP_REQUEST,
} from "./actions";

function* getCashcarTipListTask({
  payload,
}: ReturnType<typeof getCashcarTipListAsync.request>) {
  yield put(startLoading("getCashcarTipList"));
  try {
    const response: GetCashcarTipListResponse = yield call(
      contentAPI.getCashcarTipList,
      payload
    );
    yield put(getCashcarTipListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({
        key: "getCashcarTipList",
        type: "error",
        message: error,
      })
    );
  } finally {
    yield put(finishLoading("getCashcarTipList"));
  }
}

function* registerCashcarTipTask({
  payload,
}: ReturnType<typeof registerCashcarTipAsync.request>) {
  yield put(startLoading("postCashcarTip"));
  try {
    const response: RegisterCashcarTipResponse = yield call(
      contentAPI.registerCashcarTip,
      payload
    );
    yield put(registerCashcarTipAsync.success(response));
    yield put(
      setMessageAction({
        key: "postCashcarTip",
        type: "success",
        message: `캐시카팁이 성공적으로 등록되었습니다.`,
      })
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({
        key: "postCashcarTip",
        type: "error",
        message: error,
      })
    );
  } finally {
    yield put(finishLoading("postCashcarTip"));
  }
}

function* editCashcarTipTask({
  payload,
}: ReturnType<typeof editCashcarTipAsync.request>) {
  yield put(startLoading("postCashcarTip"));
  try {
    const response: EditCashcarTipResponse = yield call(
      contentAPI.editCashcarTip,
      payload
    );
    yield put(editCashcarTipAsync.success(response));
    yield put(
      setMessageAction({
        key: "postCashcarTip",
        type: "success",
        message: `캐시카팁이 성공적으로 수정되었습니다.`,
      })
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({ key: "postCashcarTip", type: "error", message: error })
    );
  } finally {
    yield put(finishLoading("postCashcarTip"));
  }
}

function* deleteCashcarTipTask({
  payload,
}: ReturnType<typeof deleteCashcarTipAsync.request>) {
  yield put(startLoading("deleteCashcarTip"));
  try {
    yield call(contentAPI.deleteCashcarTip, payload);
    yield put(deleteCashcarTipAsync.success(payload.cash_car_tip_id));
    yield put(
      setMessageAction({
        key: "deleteCashcarTip",
        type: "success",
        message: `캐시카팁이 성공적으로 삭제되었습니다.`,
      })
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({
        key: "deleteCashcarTip",
        type: "error",
        message: error,
      })
    );
  } finally {
    yield put(finishLoading("deleteCashcarTip"));
  }
}

export function* tipSaga() {
  yield takeLatest(GET_CASHCAR_TIP_LIST_REQUEST, getCashcarTipListTask);
  yield takeLatest(REGISTER_CASHCAR_TIP_REQUEST, registerCashcarTipTask);
  yield takeLatest(EDIT_CASHCAR_TIP_REQUEST, editCashcarTipTask);
  yield takeLatest(DELETE_CASHCAR_TIP_REQUEST, deleteCashcarTipTask);
}
