import ADAPI from 'lib/apis/ad';
import { call, put, takeLatest } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../loading';
import { setMessageAction } from '../messages';
import { GetADApplyListResponse, PostADApplyResponse } from '../shared/types';
import { getADApplyListAsync, GET_AD_APPLY_LIST_REQUEST, postADApplyAsync, POST_AD_APPLY_REQUEST } from './actions';

function* getADApplyListTask({ payload }: ReturnType<typeof getADApplyListAsync.request>) {
  yield put(startLoading('getADApplyList'));
  try {
    const response: GetADApplyListResponse = yield call(ADAPI.getADApplyList, payload);
    yield put(getADApplyListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'getADApplyList', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('getADApplyList'));
  }
}

function* postADApplyTask({ payload }: ReturnType<typeof postADApplyAsync.request>) {
  yield put(startLoading('postADApply'));
  try {
    const { data }: PostADApplyResponse = yield call(ADAPI.postADApply, payload);
    console.log(data);
    if (data.accept && data.rejected) {
      yield put(postADApplyAsync.success({ ...data, status: payload.status }));
      yield put(
        setMessageAction({
          key: 'postADApply',
          type: 'success',
          message: `정상적으로 ${payload.status === 'reject' ? '거절' : '승인'}처리되었습니다.`,
        }),
      );
    } else {
      yield put(
        setMessageAction({
          key: 'postADApply',
          type: 'error',
          message: `대기중인 광고 신청 회원의 상태만 변경할 수 있습니다.`,
        }),
      );
    }
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'postADApply', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('postADApply'));
  }
}

export function* adApplySaga() {
  yield takeLatest(GET_AD_APPLY_LIST_REQUEST, getADApplyListTask);
  yield takeLatest(POST_AD_APPLY_REQUEST, postADApplyTask);
}
