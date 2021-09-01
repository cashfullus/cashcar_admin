import { createAction, createAsyncAction } from 'typesafe-actions';
import { GetADListPayload, GetADListResponse, PostADPayload, PostADResponse } from '../shared';
import { ExtendedAD } from './types';

export const POST_AD_REQUEST = 'ad/POST_AD_REQUEST';
export const POST_AD_SUCCESS = 'ad/POST_AD_SUCCESS';
export const POST_AD_FAILURE = 'ad/POST_AD_FAILURE';

export const GET_AD_LIST_REQUEST = 'ad/GET_AD_LIST_REQUEST';
export const GET_AD_LIST_SUCCESS = 'ad/GET_AD_LIST_SUCCESS';
export const GET_AD_LIST_FAILURE = 'ad/GET_AD_LIST_FAILURE';

export const TOGGLE_AD = 'ad/TOGGLE_AD';
export const DESELECT_AD_LIST = 'ad/DESELECT_AD_LIST';
export const SELECT_AD_LIST = 'ad/SELECT_AD_LIST';

export const toggleADAction = createAction(TOGGLE_AD)<ExtendedAD['id']>();
export const deselectADListAction = createAction(DESELECT_AD_LIST)();
export const selectADListAction = createAction(SELECT_AD_LIST)();

export const postADAsync = createAsyncAction(POST_AD_REQUEST, POST_AD_SUCCESS, POST_AD_FAILURE)<
  PostADPayload,
  PostADResponse,
  string
>();

export const getADListAsync = createAsyncAction(GET_AD_LIST_REQUEST, GET_AD_LIST_SUCCESS, GET_AD_LIST_FAILURE)<
  GetADListPayload,
  GetADListResponse,
  string
>();
