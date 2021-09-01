import { createAction, createAsyncAction } from "typesafe-actions";
import {
  GetADApplyListResponse,
  GetADApplyListPayload,
  PostADApplyPayload,
  PostADApplyResponse,
} from "../shared";
import { ExtendedADApply } from "./types";

export const GET_AD_APPLY_LIST_REQUEST = "ad-apply/GET_AD_APPLY_LIST_REQUEST";
export const GET_AD_APPLY_LIST_SUCCESS = "ad-apply/GET_AD_APPLY_LIST_SUCCESS";
export const GET_AD_APPLY_LIST_FAILURE = "ad-apply/GET_AD_APPLY_LIST_FAILURE";

export const POST_AD_APPLY_REQUEST = "ad-apply/POST_AD_APPLY_REQUEST";
export const POST_AD_APPLY_SUCCESS = "ad-apply/POST_AD_APPLY_SUCCESS";
export const POST_AD_APPLY_FAILURE = "ad-apply/POST_AD_APPLY_FAILURE";

export const TOGGLE_AD_APPLY = "ad-apply/TOGGLE_AD_APPLY";
export const DESELECT_AD_APPLY_LIST = "ad-apply/DESELECT_AD_APPLY_LIST";
export const SELECT_AD_APPLY_LIST = "ad-apply/SELECT_AD_APPLY_LIST";

export const toggleADApplyAction = createAction(TOGGLE_AD_APPLY)<
  ExtendedADApply["id"]
>();
export const deselectADApplyListAction = createAction(DESELECT_AD_APPLY_LIST)();
export const selectADApplyListAction = createAction(SELECT_AD_APPLY_LIST)();

export const getADApplyListAsync = createAsyncAction(
  GET_AD_APPLY_LIST_REQUEST,
  GET_AD_APPLY_LIST_SUCCESS,
  GET_AD_APPLY_LIST_FAILURE
)<GetADApplyListPayload, GetADApplyListResponse, string>();

export const postADApplyAsync = createAsyncAction(
  POST_AD_APPLY_REQUEST,
  POST_AD_APPLY_SUCCESS,
  POST_AD_APPLY_FAILURE
)<PostADApplyPayload, PostADApplyResponse["data"], string>();
