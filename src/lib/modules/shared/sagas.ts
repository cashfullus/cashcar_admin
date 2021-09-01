import { setClientHeaders } from "lib/apis/client";
import { CASHCARPLUS_TOKEN } from "lib/constants";
import { put, takeLatest } from "redux-saga/effects";
import { setIsLoggedIn } from "../auth";
import { finishLoading, startLoading } from "../loading";
import { setMessageAction } from "../messages";
import { INITIALIZATION_REQUEST } from "./actions";

function* initializationSaga() {
  yield put(startLoading("initialization"));
  const authData = localStorage.getItem(CASHCARPLUS_TOKEN);
  try {
    if (!authData) {
      yield put(setIsLoggedIn(false));
    } else {
      const token = JSON.parse(authData)["token"];
      const userId = JSON.parse(authData)["userId"];
      yield setClientHeaders(token, userId);
      yield put(setIsLoggedIn(true));
    }
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({ key: "initialization", type: "error", message: error })
    );
  } finally {
    yield put(finishLoading("initialization"));
  }
}

export function* sharedSaga() {
  yield takeLatest(INITIALIZATION_REQUEST, initializationSaga);
}
