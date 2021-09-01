import { createAction, createAsyncAction } from "typesafe-actions";
import {
  GetAllMissionListPayload,
  GetAllMissionListResponse,
  GetCertifiedListPayload,
  GetCertifiedListResponse,
  PostMissionApplyPayload,
  PostMissionApplyResponse,
} from "../shared";
import { ExtendedCertified } from "./types";

export const GET_CERTIFIED_LIST_REQUEST =
  "certified-mission/GET_CERTIFIED_LIST_REQUEST";
export const GET_CERTIFIED_LIST_SUCCESS =
  "certified-mission/GET_CERTIFIED_LIST_SUCCESS";
export const GET_CERTIFIED_LIST_FAILURE =
  "certified-mission/GET_CERTIFIED_LIST_FAILURE";

export const GET_ALL_MISSION_LIST_REQUEST =
  "certified-mission/GET_ALL_MISSION_LIST_REQUEST";
export const GET_ALL_MISSION_LIST_SUCCESS =
  "certified-mission/GET_ALL_MISSION_LIST_SUCCESS";
export const GET_ALL_MISSION_LIST_FAILURE =
  "certified-mission/GET_ALL_MISSION_LIST_FAILURE";

export const POST_MISSION_APPLY_REQUEST =
  "certified-mission/POST_MISSION_APPLY_REQUEST";
export const POST_MISSION_APPLY_SUCCESS =
  "certified-mission/POST_MISSION_APPLY_SUCCESS";
export const POST_MISSION_APPLY_FAILURE =
  "certified-mission/POST_MISSION_APPLY_FAILURE";

export const TOGGLE_CERTIFIED = "certified-mission/TOGGLE_CERTIFIED";
export const DESELECT_CERTIFIED_LIST =
  "certified-mission/DESELECT_CERTIFIED_LIST";
export const SELECT_CERTIFIED_LIST = "certified-mission/SELECT_CERTIFIED_LIST";

export const SET_MISSION_LIST = "certified-mission/SET_MISSION_LIST";

export const toggleCertifiedAction =
  createAction(TOGGLE_CERTIFIED)<ExtendedCertified["id"]>();
export const deselectCertifiedListAction = createAction(
  DESELECT_CERTIFIED_LIST
)();
export const selectCertifiedListAction = createAction(SELECT_CERTIFIED_LIST)();

export const getCertifiedListAsync = createAsyncAction(
  GET_CERTIFIED_LIST_REQUEST,
  GET_CERTIFIED_LIST_SUCCESS,
  GET_CERTIFIED_LIST_FAILURE
)<GetCertifiedListPayload, GetCertifiedListResponse, string>();

export const getAllMissionListAsync = createAsyncAction(
  GET_ALL_MISSION_LIST_REQUEST,
  GET_ALL_MISSION_LIST_SUCCESS,
  GET_ALL_MISSION_LIST_FAILURE
)<GetAllMissionListPayload, GetAllMissionListResponse, string>();

export const postMissionApplyAsync = createAsyncAction(
  POST_MISSION_APPLY_REQUEST,
  POST_MISSION_APPLY_SUCCESS,
  POST_MISSION_APPLY_FAILURE
)<PostMissionApplyPayload, PostMissionApplyResponse, string>();
