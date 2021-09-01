import { call, put, takeLatest } from '@redux-saga/core/effects';
import pointAPI from 'lib/apis/point';
import { donateStatusMapper } from 'lib/mapper';
import { finishLoading, startLoading } from '../loading';
import { setMessageAction } from '../messages';
import { GetDonateListResponse, PostDonateListResponse } from '../shared';
import { getDonateListAsync, GET_DONATE_LIST_REQUEST, postDonateListAsync, POST_DONATE_LIST_REQUEST } from './actions';

function* getDonateListTask({ payload }: ReturnType<typeof getDonateListAsync.request>) {
  yield put(startLoading('getDonateList'));
  try {
    const response: GetDonateListResponse = yield call(pointAPI.getDonateList, payload);
    yield put(getDonateListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'getDonateList', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('getDonateList'));
  }
}

function* postDonateListTask({ payload }: ReturnType<typeof postDonateListAsync.request>) {
  yield put(startLoading('postDonateList'));
  try {
    const response: PostDonateListResponse = yield call(pointAPI.postDonateList, payload);
    yield put(postDonateListAsync.success({ ...response, withdrawal_donate_list: payload.withdrawal_donate_list }));
    yield put(
      setMessageAction({
        key: 'postDonateList',
        type: 'success',
        message: `성공적으로 ${donateStatusMapper(payload.status).label} 처리하였습니다.`,
      }),
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'postDonateList', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('postDonateList'));
  }
}

export function* donateSaga() {
  yield takeLatest(POST_DONATE_LIST_REQUEST, postDonateListTask);
  yield takeLatest(GET_DONATE_LIST_REQUEST, getDonateListTask);
}
