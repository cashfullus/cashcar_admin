import ADAPI from 'lib/apis/ad';
import { call, getContext, put, takeLatest } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../loading';
import { setMessageAction } from '../messages';
import { GetADListResponse, PostADResponse } from '../shared/types';
import { getADListAsync, GET_AD_LIST_REQUEST, postADAsync, POST_AD_REQUEST } from './actions';

// yield getContext에서 에러가 발생해서 임시로 추가한 interface
export interface ResponseGenerator extends History {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* postADTask({ payload }: ReturnType<typeof postADAsync.request>) {
  const { usage } = payload;
  yield put(startLoading('postAD'));
  try {
    const response: PostADResponse = yield call(ADAPI.postAD, payload);
    yield put(postADAsync.success({ ...response, usage }));
    yield put(
      setMessageAction({
        key: 'postAD',
        type: 'success',
        message: `광고가 정상적으로 ${usage === 'edit' ? '수정' : '등록'}되었습니다.`,
      }),
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'postAD', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('postAD'));
    const history: ResponseGenerator = yield getContext('history');
    history.back();
  }
}

function* getADListTask({ payload }: ReturnType<typeof getADListAsync.request>) {
  yield put(startLoading('getADList'));
  try {
    const response: GetADListResponse = yield call(ADAPI.getADList, payload);
    yield put(getADListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'getADList', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('getADList'));
  }
}

export function* adSaga() {
  yield takeLatest(GET_AD_LIST_REQUEST, getADListTask);
  yield takeLatest(POST_AD_REQUEST, postADTask);
}
