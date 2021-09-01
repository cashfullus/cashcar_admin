import { createAction, createAsyncAction } from 'typesafe-actions';
import { GetDonateListPayload, GetDonateListResponse, PostDonateListPayload, PostDonateListResponse } from '../shared';
import { ExtendedDonate } from './types';

export const GET_DONATE_LIST_REQUEST = 'point/GET_DONATE_LIST_REQUEST';
export const GET_DONATE_LIST_SUCCESS = 'point/GET_DONATE_LIST_SUCCESS';
export const GET_DONATE_LIST_FAILURE = 'point/GET_DONATE_LIST_FAILURE';

export const POST_DONATE_LIST_REQUEST = 'point/POST_DONATE_LIST_REQUEST';
export const POST_DONATE_LIST_SUCCESS = 'point/POST_DONATE_LIST_SUCCESS';
export const POST_DONATE_LIST_FAILURE = 'point/POST_DONATE_LIST_FAILURE';

export const TOGGLE_DONATE = 'point/TOGGLE_DONATE';
export const DESELECT_DONATE_LIST = 'point/DESELECT_DONATE_LIST';
export const SELECT_DONATE_LIST = 'point/SELECT_DONATE_LIST';

export const toggleDonateAction = createAction(TOGGLE_DONATE)<ExtendedDonate['id']>();
export const deselectDonateListAction = createAction(DESELECT_DONATE_LIST)();
export const selectDonateListAction = createAction(SELECT_DONATE_LIST)();

export const getDonateListAsync = createAsyncAction(GET_DONATE_LIST_REQUEST, GET_DONATE_LIST_SUCCESS, GET_DONATE_LIST_FAILURE)<
  GetDonateListPayload,
  GetDonateListResponse,
  string
>();

export const postDonateListAsync = createAsyncAction(
  POST_DONATE_LIST_REQUEST,
  POST_DONATE_LIST_SUCCESS,
  POST_DONATE_LIST_FAILURE,
)<PostDonateListPayload, PostDonateListResponse, string>();
