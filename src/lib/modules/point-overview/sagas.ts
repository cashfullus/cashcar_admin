import { call, put, takeLatest } from '@redux-saga/core/effects';
import pointAPI from 'lib/apis/point';
import { finishLoading, startLoading } from '../loading';
import { setMessageAction } from '../messages';
import { GetPointListResponse, PostPointListResponse, PostPointResponse } from '../shared';
import {
  getPointListAsync,
  GET_POINT_LIST_REQUEST,
  postPointAsync,
  postPointListAsync,
  POST_POINT_LIST_REQUEST,
  POST_POINT_REQUEST,
} from './actions';

function* getPointListTask({ payload }: ReturnType<typeof getPointListAsync.request>) {
  yield put(startLoading('getDonateList'));
  try {
    const response: GetPointListResponse = yield call(pointAPI.getPointList, payload);
    yield put(getPointListAsync.success(response));
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'getDonateList', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('getDonateList'));
  }
}

function* postPointTask({ payload }: ReturnType<typeof postPointAsync.request>) {
  yield put(startLoading('postPoint'));
  try {
    const response: PostPointResponse = yield call(pointAPI.postPoint, payload);
    yield put(postPointAsync.success({ ...response, user_id: payload.user_id }));
    yield put(
      setMessageAction({
        key: 'postPoint',
        type: 'success',
        message: `성공적으로 처리하였습니다.`,
      }),
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'postPoint', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('postPoint'));
  }
}

function* postPointListTask({ payload }: ReturnType<typeof postPointListAsync.request>) {
  yield put(startLoading('postPointList'));
  try {
    const response: PostPointListResponse = yield call(pointAPI.postPointList, payload);
    yield put(postPointListAsync.success({ ...response, user_list: payload.user_list }));
    yield put(
      setMessageAction({
        key: 'postPointList',
        type: 'success',
        message: `성공적으로 처리하였습니다.`,
      }),
    );
  } catch (e) {
    const error = `알 수 없는 오류가 발생하였습니다. [${e}]`;
    yield put(setMessageAction({ key: 'postPointList', type: 'error', message: error }));
  } finally {
    yield put(finishLoading('postPointList'));
  }
}

export function* pointSaga() {
  yield takeLatest(POST_POINT_LIST_REQUEST, postPointListTask);
  yield takeLatest(POST_POINT_REQUEST, postPointTask);
  yield takeLatest(GET_POINT_LIST_REQUEST, getPointListTask);
}
