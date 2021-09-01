import { createAction, createAsyncAction } from "typesafe-actions";
import { ExtendedDriving } from "./types";

export const GET_DRIVING_LIST_REQUEST =
  "driving-mission/GET_DRIVING_LIST_REQUEST";
export const GET_DRIVING_LIST_SUCCESS =
  "driving-mission/GET_DRIVING_LIST_SUCCESS";
export const GET_DRIVING_LIST_FAILURE =
  "driving-mission/GET_DRIVING_LIST_FAILURE";

export const TOGGLE_DRIVING = "driving-mission/TOGGLE_DRIVING";
export const DESELECT_DRIVING_LIST = "driving-mission/DESELECT_DRIVING_LIST";
export const SELECT_DRIVING_LIST = "driving-mission/SELECT_DRIVING_LIST";

export const toggleDrivingAction = createAction(TOGGLE_DRIVING)<
  ExtendedDriving["id"]
>();
export const deselectDrivingListAction = createAction(DESELECT_DRIVING_LIST)();
export const selectDrivingListAction = createAction(SELECT_DRIVING_LIST)();

export const getDrivingListAsync = createAsyncAction(
  GET_DRIVING_LIST_REQUEST,
  GET_DRIVING_LIST_SUCCESS,
  GET_DRIVING_LIST_FAILURE
)();
