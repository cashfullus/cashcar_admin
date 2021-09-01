import { call, put, takeLatest } from '@redux-saga/core/effects';
import pointAPI from 'lib/apis/point';
import { withdrawStatusMapper } from 'lib/mapper';
import { finishLoading, startLoading } from '../loading';
import { setMessageAction } from '../messages';
import { GetWithdrawListResponse, PostWithdrawListResponse } from '../shared';
import { getWithdrawListAsync, GET_WITHDRAW_LIST_REQUEST, postWithdrawListAsync, POST_WITHDRAW_LIST_REQUEST } from './actions';

function* getWithdrawListTask({ payload }: ReturnType<typeof getWithdrawListAsync.request>) {
  yield put(startLoading('getWithdrawList'));
  try {
    const response: GetWithdrawListResponse = yield call(pointAPI.getWithdrawList, payload);
    yield put(getWithdrawListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({
        key: 'getWithdrawList',
        type: 'error',
        message: error,
      }),
    );
  } finally {
    yield put(finishLoading('getWithdrawList'));
  }
}

function* postWithdrawListTask({ payload }: ReturnType<typeof postWithdrawListAsync.request>) {
  yield put(startLoading('postWithdrawList'));
  try {
    const response: PostWithdrawListResponse = yield call(pointAPI.postWithdrawList, payload);
    yield put(postWithdrawListAsync.success({ ...response, withdrawal_list: payload.withdrawal_list }));
    yield put(
      setMessageAction({
        key: 'postWithdrawList',
        type: 'success',
        message: `성공적으로 ${withdrawStatusMapper(payload.status).label} 처리하였습니다.`,
      }),
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(
      setMessageAction({
        key: 'postWithdrawList',
        type: 'error',
        message: error,
      }),
    );
  } finally {
    yield put(finishLoading('postWithdrawList'));
  }
}

export function* withdrawSaga() {
  yield takeLatest(POST_WITHDRAW_LIST_REQUEST, postWithdrawListTask);
  yield takeLatest(GET_WITHDRAW_LIST_REQUEST, getWithdrawListTask);
}
