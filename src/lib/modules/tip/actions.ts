import { createAction, createAsyncAction } from "typesafe-actions";
import {
  DeleteCashcarTipPayload,
  EditCashcarTipPayload,
  EditCashcarTipResponse,
  GetCashcarTipListPayload,
  GetCashcarTipListResponse,
  RegisterCashcarTipPayload,
  RegisterCashcarTipResponse,
} from "../shared";
import { ExtendedCashcarTip } from "./types";

export const GET_CASHCAR_TIP_LIST_REQUEST = "tip/GET_CASHCAR_TIP_LIST_REQUEST";
export const GET_CASHCAR_TIP_LIST_SUCCESS = "tip/GET_CASHCAR_TIP_LIST_SUCCESS";
export const GET_CASHCAR_TIP_LIST_FAILURE = "tip/GET_CASHCAR_TIP_LIST_FAILURE";

export const REGISTER_CASHCAR_TIP_REQUEST = "tip/REGISTER_CASHCAR_TIP_REQUEST";
export const REGISTER_CASHCAR_TIP_SUCCESS = "tip/REGISTER_CASHCAR_TIP_SUCCESS";
export const REGISTER_CASHCAR_TIP_FAILURE = "tip/REGISTER_CASHCAR_TIP_FAILURE";

export const EDIT_CASHCAR_TIP_REQUEST = "tip/EDIT_CASHCAR_TIP_REQUEST";
export const EDIT_CASHCAR_TIP_SUCCESS = "tip/EDIT_CASHCAR_TIP_SUCCESS";
export const EDIT_CASHCAR_TIP_FAILURE = "tip/EDIT_CASHCAR_TIP_FAILURE";

export const DELETE_CASHCAR_TIP_REQUEST = "tip/DELETE_CASHCAR_TIP_REQUEST";
export const DELETE_CASHCAR_TIP_SUCCESS = "tip/DELETE_CASHCAR_TIP_SUCCESS";
export const DELETE_CASHCAR_TIP_FAILURE = "tip/DELETE_CASHCAR_TIP_FAILURE";

export const TOGGLE_CASHCAR_TIP = "tip/TOGGLE_CASHCAR_TIP";
export const DESELECT_CASHCAR_TIP_LIST = "tip/DESELECT_CASHCAR_TIP_LIST";
export const SELECT_CASHCAR_TIP_LIST = "tip/SELECT_CASHCAR_TIP_LIST";

export const toggleCashcarTipAction =
  createAction(TOGGLE_CASHCAR_TIP)<ExtendedCashcarTip["id"]>();
export const deselectCashcarTipListAction = createAction(
  DESELECT_CASHCAR_TIP_LIST
)();
export const selectCashcarTipListAction = createAction(
  SELECT_CASHCAR_TIP_LIST
)();

export const getCashcarTipListAsync = createAsyncAction(
  GET_CASHCAR_TIP_LIST_REQUEST,
  GET_CASHCAR_TIP_LIST_SUCCESS,
  GET_CASHCAR_TIP_LIST_FAILURE
)<GetCashcarTipListPayload, GetCashcarTipListResponse, string>();

export const registerCashcarTipAsync = createAsyncAction(
  REGISTER_CASHCAR_TIP_REQUEST,
  REGISTER_CASHCAR_TIP_SUCCESS,
  REGISTER_CASHCAR_TIP_FAILURE
)<RegisterCashcarTipPayload, RegisterCashcarTipResponse, string>();

export const editCashcarTipAsync = createAsyncAction(
  EDIT_CASHCAR_TIP_REQUEST,
  EDIT_CASHCAR_TIP_SUCCESS,
  EDIT_CASHCAR_TIP_FAILURE
)<EditCashcarTipPayload, EditCashcarTipResponse, string>();

export const deleteCashcarTipAsync = createAsyncAction(
  DELETE_CASHCAR_TIP_REQUEST,
  DELETE_CASHCAR_TIP_SUCCESS,
  DELETE_CASHCAR_TIP_FAILURE
)<DeleteCashcarTipPayload, number, string>();
