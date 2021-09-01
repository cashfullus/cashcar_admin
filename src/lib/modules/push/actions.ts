import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  GetAppPushListParams,
  GetAppPushListResponse,
  ResendAppPushParams,
  ResendAppPushResponse,
  SendAppPushPayload,
  SendAppPushResponse,
} from '../shared';
import { ExtendedAppPush } from './types';

export const GET_APP_PUSH_LIST_REQUEST = 'push/GET_APP_PUSH_LIST_REQUEST';
export const GET_APP_PUSH_LIST_SUCCESS = 'push/GET_APP_PUSH_LIST_SUCCESS';
export const GET_APP_PUSH_LIST_FAILURE = 'push/GET_APP_PUSH_LIST_FAILURE';

export const SEND_APP_PUSH_REQUEST = 'push/SEND_APP_PUSH_REQUEST';
export const SEND_APP_PUSH_SUCCESS = 'push/SEND_APP_PUSH_SUCCESS';
export const SEND_APP_PUSH_FAILURE = 'push/SEND_APP_PUSH_FAILURE';

export const RESEND_APP_PUSH_REQUEST = 'push/RESEND_APP_PUSH_REQUEST';
export const RESEND_APP_PUSH_SUCCESS = 'push/RESEND_APP_PUSH_SUCCESS';
export const RESEND_APP_PUSH_FAILURE = 'push/RESEND_APP_PUSH_FAILURE';

export const TOGGLE_APP_PUSH = 'push/TOGGLE_APP_PUSH';
export const DESELECT_APP_PUSH_LIST = 'push/DESELECT_APP_PUSH_LIST';
export const SELECT_APP_PUSH_LIST = 'push/SELECT_APP_PUSH_LIST';

export const toggleAppPushAction = createAction(TOGGLE_APP_PUSH)<ExtendedAppPush['id']>();
export const deselectAppPushListAction = createAction(DESELECT_APP_PUSH_LIST)();
export const selectAppPushListAction = createAction(SELECT_APP_PUSH_LIST)();

export const getAppPushListAsync = createAsyncAction(
  GET_APP_PUSH_LIST_REQUEST,
  GET_APP_PUSH_LIST_SUCCESS,
  GET_APP_PUSH_LIST_FAILURE,
)<GetAppPushListParams, GetAppPushListResponse, string>();

export const sendAppPushAsync = createAsyncAction(SEND_APP_PUSH_REQUEST, SEND_APP_PUSH_SUCCESS, SEND_APP_PUSH_FAILURE)<
  SendAppPushPayload,
  SendAppPushResponse,
  string
>();

export const resendAppPushAsync = createAsyncAction(RESEND_APP_PUSH_REQUEST, RESEND_APP_PUSH_SUCCESS, RESEND_APP_PUSH_FAILURE)<
  ResendAppPushParams,
  ResendAppPushResponse,
  string
>();
