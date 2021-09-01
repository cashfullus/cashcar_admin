import { createAction, createAsyncAction } from "typesafe-actions";
import { GetUserListPayload, GetUserListResponse } from "../shared";
import { ExtendedUser } from "./types";

export const GET_USER_LIST_REQUEST = "users/GET_USER_LIST_REQUEST";
export const GET_USER_LIST_SUCCESS = "users/GET_USER_LIST_SUCCESS";
export const GET_USER_LIST_FAILURE = "users/GET_USER_LIST_FAILURE";

export const TOGGLE_USER = "users/TOGGLE_USER";
export const DESELECT_USER_LIST = "users/DESELECT_USER_LIST";
export const SELECT_USER_LIST = "users/SELECT_USER_LIST";

export const toggleUserAction = createAction(TOGGLE_USER)<ExtendedUser["id"]>();
export const deselectUserListAction = createAction(DESELECT_USER_LIST)();
export const selectUserListAction = createAction(SELECT_USER_LIST)();

export const getUserListAsync = createAsyncAction(
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE
)<GetUserListPayload, GetUserListResponse, string>();
