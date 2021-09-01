import { createAction, createAsyncAction } from "typesafe-actions";
import { AdminLoginPayload, AdminLoginResponse } from "../shared/types";

export const SET_IS_LOGGED_IN = "auth/SET_IS_LOGGED_IN";

export const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

export const LOGOUT = "auth/LOGOUT";

export const loginAsync = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<AdminLoginPayload, AdminLoginResponse, string>();

export const logout = createAction(LOGOUT)();

export const setIsLoggedIn = createAction(SET_IS_LOGGED_IN)<boolean>();
