import { createAction, createAsyncAction } from 'typesafe-actions';
import { GetWithdrawListPayload, GetWithdrawListResponse, PostWithdrawListPayload, PostWithdrawListResponse } from '../shared';
import { ExtendedWithdraw } from './types';

export const GET_WITHDRAW_LIST_REQUEST = 'point/GET_WITHDRAW_LIST_REQUEST';
export const GET_WITHDRAW_LIST_SUCCESS = 'point/GET_WITHDRAW_LIST_SUCCESS';
export const GET_WITHDRAW_LIST_FAILURE = 'point/GET_WITHDRAW_LIST_FAILURE';

export const POST_WITHDRAW_LIST_REQUEST = 'point/POST_WITHDRAW_LIST_REQUEST';
export const POST_WITHDRAW_LIST_SUCCESS = 'point/POST_WITHDRAW_LIST_SUCCESS';
export const POST_WITHDRAW_LIST_FAILURE = 'point/POST_WITHDRAW_LIST_FAILURE';

export const TOGGLE_WITHDRAW = 'point/TOGGLE_WITHDRAW';
export const DESELECT_WITHDRAW_LIST = 'point/DESELECT_WITHDRAW_LIST';
export const SELECT_WITHDRAW_LIST = 'point/SELECT_WITHDRAW_LIST';

export const toggleWithdrawAction = createAction(TOGGLE_WITHDRAW)<ExtendedWithdraw['id']>();
export const deselectWithdrawListAction = createAction(DESELECT_WITHDRAW_LIST)();
export const selectWithdrawListAction = createAction(SELECT_WITHDRAW_LIST)();

export const getWithdrawListAsync = createAsyncAction(
  GET_WITHDRAW_LIST_REQUEST,
  GET_WITHDRAW_LIST_SUCCESS,
  GET_WITHDRAW_LIST_FAILURE,
)<GetWithdrawListPayload, GetWithdrawListResponse, string>();

export const postWithdrawListAsync = createAsyncAction(
  POST_WITHDRAW_LIST_REQUEST,
  POST_WITHDRAW_LIST_SUCCESS,
  POST_WITHDRAW_LIST_FAILURE,
)<PostWithdrawListPayload, PostWithdrawListResponse, string>();
