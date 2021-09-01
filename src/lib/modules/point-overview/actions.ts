import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  GetPointListPayload,
  GetPointListResponse,
  PostPointListPayload,
  PostPointListResponse,
  PostPointPayload,
  PostPointResponse,
} from '../shared';
import { ExtendedPoint } from './types';

export const GET_POINT_LIST_REQUEST = 'point/GET_POINT_LIST_REQUEST';
export const GET_POINT_LIST_SUCCESS = 'point/GET_POINT_LIST_SUCCESS';
export const GET_POINT_LIST_FAILURE = 'point/GET_POINT_LIST_FAILURE';

export const POST_POINT_REQUEST = 'point/POST_POINT_REQUEST';
export const POST_POINT_SUCCESS = 'point/POST_POINT_SUCCESS';
export const POST_POINT_FAILURE = 'point/POST_POINT_FAILURE';

export const POST_POINT_LIST_REQUEST = 'point/POST_POINT_LIST_REQUEST';
export const POST_POINT_LIST_SUCCESS = 'point/POST_POINT_LIST_SUCCESS';
export const POST_POINT_LIST_FAILURE = 'point/POST_POINT_LIST_FAILURE';

export const TOGGLE_POINT = 'point/TOGGLE_POINT';
export const DESELECT_POINT_LIST = 'point/DESELECT_POINT_LIST';
export const SELECT_POINT_LIST = 'point/SELECT_POINT_LIST';

export const togglePointAction = createAction(TOGGLE_POINT)<ExtendedPoint['id']>();
export const deselectPointListAction = createAction(DESELECT_POINT_LIST)();
export const selectPointListAction = createAction(SELECT_POINT_LIST)();

export const getPointListAsync = createAsyncAction(GET_POINT_LIST_REQUEST, GET_POINT_LIST_SUCCESS, GET_POINT_LIST_FAILURE)<
  GetPointListPayload,
  GetPointListResponse,
  string
>();

export const postPointAsync = createAsyncAction(POST_POINT_REQUEST, POST_POINT_SUCCESS, POST_POINT_FAILURE)<
  PostPointPayload,
  PostPointResponse,
  string
>();

export const postPointListAsync = createAsyncAction(POST_POINT_LIST_REQUEST, POST_POINT_LIST_SUCCESS, POST_POINT_LIST_FAILURE)<
  PostPointListPayload,
  PostPointListResponse,
  string
>();
