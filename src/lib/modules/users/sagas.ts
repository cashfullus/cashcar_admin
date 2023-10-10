import { call, put, takeLatest } from "@redux-saga/core/effects";
import userAPI from "lib/apis/users";
import { finishLoading, startLoading } from "../loading";
import { setMessageAction } from "../messages";
import { GetUserListResponse } from "../shared";
import { getUserListAsync, GET_USER_LIST_REQUEST, getAllUserListAsync, GET_ALL_USER_LIST_REQUEST } from "./actions";

function* getUserListTask({
  payload,
}: ReturnType<typeof getUserListAsync.request>) {
  yield put(startLoading("getUserList"));
  try {
    const response: GetUserListResponse = yield call(
      userAPI.getUserList,
      payload
    );
    yield put(getUserListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({ key: "getUserList", type: "error", message: error })
    );
  } finally {
    yield put(finishLoading("getUserList"));
  }
}

function* getAllUserListTask({
  payload,
}: ReturnType<typeof getAllUserListAsync.request>) {
  yield put(startLoading("getAllUserList"));
  try {
    const response: GetUserListResponse = yield call(
      userAPI.getUserList,
      payload
    );
    yield put(getAllUserListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({ key: "getAllUserList", type: "error", message: error })
    );
  } finally {
    yield put(finishLoading("getAllUserList"));
  }
}

export function* userSaga() {
  yield takeLatest(GET_USER_LIST_REQUEST, getUserListTask);
  yield takeLatest(GET_ALL_USER_LIST_REQUEST, getAllUserListTask);
}
