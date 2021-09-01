import authAPI from "lib/apis/auth";
import { setClientHeaders } from "lib/apis/client";
import { CASHCARPLUS_TOKEN } from "lib/constants";
import { call, put, takeLatest } from "redux-saga/effects";
import { finishLoading, startLoading } from "../loading";
import { setMessageAction } from "../messages";
import { initializationAsync } from "../shared";
import { AdminLoginResponse } from "../shared/types";
import { loginAsync, LOGIN_REQUEST } from "./actions";

function* loginTask({ payload }: ReturnType<typeof loginAsync.request>) {
  yield put(startLoading("login"));
  try {
    const response: AdminLoginResponse = yield call(authAPI.login, payload);
    const { data } = response;
    if (data.jwt_token && data.user_id) {
      const { jwt_token, user_id } = data;
      setClientHeaders(jwt_token, user_id);
      localStorage.setItem(
        CASHCARPLUS_TOKEN,
        JSON.stringify({ userId: user_id, token: jwt_token })
      );
      yield put(loginAsync.success(response));
      yield put(initializationAsync.request());
    } else {
      yield put(
        setMessageAction({
          key: "login",
          type: "error",
          message: "계정 정보가 잘못되었습니다.",
        })
      );
    }
  } catch (error) {
    yield put(
      setMessageAction({
        key: "login",
        type: "error",
        message: `알 수 없는 오류가 발생하였습니다. [${error}]`,
      })
    );
  } finally {
    yield put(finishLoading("login"));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginTask);
}
