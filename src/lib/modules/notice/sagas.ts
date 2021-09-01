import { call, put, takeLatest } from "@redux-saga/core/effects";
import contentAPI from "lib/apis/contents";
import { finishLoading, startLoading } from "../loading";
import { setMessageAction } from "../messages";
import {
  EditNoticeResponse,
  GetNoticeListResponse,
  RegisterNoticeResponse,
} from "../shared";
import {
  deleteNoticeAsync,
  DELETE_NOTICE_REQUEST,
  editNoticeAsync,
  EDIT_NOTICE_REQUEST,
  getNoticeListAsync,
  GET_NOTICE_LIST_REQUEST,
  registerNoticeAsync,
  REGISTER_NOTICE_REQUEST,
} from "./actions";

function* getNoticeListTask({
  payload,
}: ReturnType<typeof getNoticeListAsync.request>) {
  yield put(startLoading("getNoticeList"));
  try {
    const response: GetNoticeListResponse = yield call(
      contentAPI.getNoticeList,
      payload
    );
    yield put(getNoticeListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({ key: "getNoticeList", type: "error", message: error })
    );
  } finally {
    yield put(finishLoading("getNoticeList"));
  }
}

function* registerNoticeTask({
  payload,
}: ReturnType<typeof registerNoticeAsync.request>) {
  yield put(startLoading("postNotice"));
  try {
    const response: RegisterNoticeResponse = yield call(
      contentAPI.registerNotice,
      payload
    );
    yield put(registerNoticeAsync.success(response));
    yield put(
      setMessageAction({
        key: "postNotice",
        type: "success",
        message: `공지사항이 성공적으로 등록되었습니다.`,
      })
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({ key: "postNotice", type: "error", message: error })
    );
  } finally {
    yield put(finishLoading("postNotice"));
  }
}

function* editNoticeTask({
  payload,
}: ReturnType<typeof editNoticeAsync.request>) {
  yield put(startLoading("postNotice"));
  try {
    const response: EditNoticeResponse = yield call(
      contentAPI.editNotice,
      payload
    );
    yield put(editNoticeAsync.success(response));
    yield put(
      setMessageAction({
        key: "postNotice",
        type: "success",
        message: `공지사항이 성공적으로 수정되었습니다.`,
      })
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({ key: "postNotice", type: "error", message: error })
    );
  } finally {
    yield put(finishLoading("postNotice"));
  }
}

function* deleteNoticeTask({
  payload,
}: ReturnType<typeof deleteNoticeAsync.request>) {
  yield put(startLoading("deleteNotice"));
  try {
    yield call(contentAPI.deleteNotice, payload);
    yield put(deleteNoticeAsync.success(payload.notice_id));
    yield put(
      setMessageAction({
        key: "deleteNotice",
        type: "success",
        message: `공지사항이 성공적으로 삭제되었습니다.`,
      })
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({ key: "deleteNotice", type: "error", message: error })
    );
  } finally {
    yield put(finishLoading("deleteNotice"));
  }
}

export function* noticeSaga() {
  yield takeLatest(GET_NOTICE_LIST_REQUEST, getNoticeListTask);
  yield takeLatest(REGISTER_NOTICE_REQUEST, registerNoticeTask);
  yield takeLatest(EDIT_NOTICE_REQUEST, editNoticeTask);
  yield takeLatest(DELETE_NOTICE_REQUEST, deleteNoticeTask);
}
