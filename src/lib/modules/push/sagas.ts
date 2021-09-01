import { call, put, takeLatest } from '@redux-saga/core/effects';
import alarmAPI from 'lib/apis/alarm';
import { finishLoading, startLoading } from '../loading';
import { setMessageAction } from '../messages';
import { GetAppPushListResponse, ResendAppPushResponse, SendAppPushResponse } from '../shared';
import {
  getAppPushListAsync,
  GET_APP_PUSH_LIST_REQUEST,
  resendAppPushAsync,
  RESEND_APP_PUSH_REQUEST,
  sendAppPushAsync,
  SEND_APP_PUSH_REQUEST,
} from './actions';

function* getAppPushListTask({ payload }: ReturnType<typeof getAppPushListAsync.request>) {
  yield put(startLoading('getAppPushList'));
  try {
    const response: GetAppPushListResponse = yield call(alarmAPI.getAppPushList, payload);
    yield put(getAppPushListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'getAppPushList', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('getAppPushList'));
  }
}

function* sendAppPushTask({ payload }: ReturnType<typeof sendAppPushAsync.request>) {
  yield put(startLoading('sendAppPush'));
  try {
    const response: SendAppPushResponse = yield call(alarmAPI.sendAppPush, payload);
    yield put(sendAppPushAsync.success(response));
    yield put(setMessageAction({ key: 'sendAppPush', type: 'success', message: '성공적으로 Push 알림을 보냈습니다.' }));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'sendAppPush', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('sendAppPush'));
  }
}

function* resendAppPushTask({ payload }: ReturnType<typeof resendAppPushAsync.request>) {
  yield put(startLoading('resendAppPush'));
  try {
    const response: ResendAppPushResponse = yield call(alarmAPI.resendAppPush, payload);
    yield put(resendAppPushAsync.success(response));
    yield put(setMessageAction({ key: 'resendAppPush', type: 'success', message: '성공적으로 Push 알림을 재전송했습니다.' }));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'resendAppPush', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('resendAppPush'));
  }
}

export function* pushSaga() {
  yield takeLatest(GET_APP_PUSH_LIST_REQUEST, getAppPushListTask);
  yield takeLatest(SEND_APP_PUSH_REQUEST, sendAppPushTask);
  yield takeLatest(RESEND_APP_PUSH_REQUEST, resendAppPushTask);
}
