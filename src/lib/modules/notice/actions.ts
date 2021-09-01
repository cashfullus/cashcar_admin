import { createAction, createAsyncAction } from "typesafe-actions";
import {
  DeleteNoticePayload,
  EditNoticePayload,
  EditNoticeResponse,
  GetNoticeListPayload,
  GetNoticeListResponse,
  RegisterNoticePayload,
  RegisterNoticeResponse,
} from "../shared";
import { ExtendedNotice } from "./types";

export const GET_NOTICE_LIST_REQUEST = "notice/GET_NOTICE_LIST_REQUEST";
export const GET_NOTICE_LIST_SUCCESS = "notice/GET_NOTICE_LIST_SUCCESS";
export const GET_NOTICE_LIST_FAILURE = "notice/GET_NOTICE_LIST_FAILURE";

export const REGISTER_NOTICE_REQUEST = "notice/REGISTER_NOTICE_REQUEST";
export const REGISTER_NOTICE_SUCCESS = "notice/REGISTER_NOTICE_SUCCESS";
export const REGISTER_NOTICE_FAILURE = "notice/REGISTER_NOTICE_FAILURE";

export const EDIT_NOTICE_REQUEST = "notice/EDIT_NOTICE_REQUEST";
export const EDIT_NOTICE_SUCCESS = "notice/EDIT_NOTICE_SUCCESS";
export const EDIT_NOTICE_FAILURE = "notice/EDIT_NOTICE_FAILURE";

export const DELETE_NOTICE_REQUEST = "notice/DELETE_NOTICE_REQUEST";
export const DELETE_NOTICE_SUCCESS = "notice/DELETE_NOTICE_SUCCESS";
export const DELETE_NOTICE_FAILURE = "notice/DELETE_NOTICE_FAILURE";

export const TOGGLE_NOTICE = "notice/TOGGLE_NOTICE";
export const DESELECT_NOTICE_LIST = "notice/DESELECT_NOTICE_LIST";
export const SELECT_NOTICE_LIST = "notice/SELECT_NOTICE_LIST";

export const toggleNoticeAction =
  createAction(TOGGLE_NOTICE)<ExtendedNotice["id"]>();
export const deselectNoticeListAction = createAction(DESELECT_NOTICE_LIST)();
export const selectNoticeListAction = createAction(SELECT_NOTICE_LIST)();

export const registerNoticeAsync = createAsyncAction(
  REGISTER_NOTICE_REQUEST,
  REGISTER_NOTICE_SUCCESS,
  REGISTER_NOTICE_FAILURE
)<RegisterNoticePayload, RegisterNoticeResponse, string>();

export const getNoticeListAsync = createAsyncAction(
  GET_NOTICE_LIST_REQUEST,
  GET_NOTICE_LIST_SUCCESS,
  GET_NOTICE_LIST_FAILURE
)<GetNoticeListPayload, GetNoticeListResponse, string>();

export const editNoticeAsync = createAsyncAction(
  EDIT_NOTICE_REQUEST,
  EDIT_NOTICE_SUCCESS,
  EDIT_NOTICE_FAILURE
)<EditNoticePayload, EditNoticeResponse, string>();

export const deleteNoticeAsync = createAsyncAction(
  DELETE_NOTICE_REQUEST,
  DELETE_NOTICE_SUCCESS,
  DELETE_NOTICE_FAILURE
)<DeleteNoticePayload, number, string>();
