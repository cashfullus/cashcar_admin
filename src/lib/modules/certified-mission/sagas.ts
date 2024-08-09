import missionAPI from "lib/apis/mission";
import { call, put, takeLatest } from "redux-saga/effects";
import { finishLoading, startLoading } from "../loading";
import { setMessageAction } from "../messages";
import {
  GetAllMissionListResponse,
  GetCertifiedListResponse,
  PostMissionApplyResponse,
} from "../shared";
import {
  getAllMissionListAsync,
  getCertifiedListAsync,
  GET_ALL_MISSION_LIST_REQUEST,
  GET_CERTIFIED_LIST_REQUEST,
  postMissionApplyAsync,
  POST_MISSION_APPLY_REQUEST,
} from "./actions";

function* getCertifiedListTask({
  payload,
}: ReturnType<typeof getCertifiedListAsync.request>) {
  yield put(startLoading("getCertifiedList"));
  try {
    const response: GetCertifiedListResponse = yield call(
      missionAPI.getCertifiedList,
      payload
    );
    yield put(getCertifiedListAsync.success(response));
  } catch (e) {
    const error = `잠시후 다시 시도하십시오. [${e}]`;
    yield put(
      setMessageAction({
        key: "getCertifiedList",
        type: "error",
        message: error,
      })
    );
  } finally {
    yield put(finishLoading("getCertifiedList"));
  }
}

function* getAllMissionListTask({
  payload,
}: ReturnType<typeof getAllMissionListAsync.request>) {
  const { ad_user_apply_id, mission_card_id } = payload;
  yield put(startLoading("getAllMissionList"));
  try {
    const { data }: GetAllMissionListResponse = yield call(
      missionAPI.getAllMissionList,
      payload
    );
    yield put(
      getAllMissionListAsync.success({
        ad_user_apply_id,
        mission_card_id,
        data,
      })
    );
  } catch (e) {
    const error = `잠시후 다시 시도하십시오. [${e}]`;
    yield put(
      setMessageAction({
        key: "getAllMissionList",
        type: "error",
        message: error,
      })
    );
  } finally {
    yield put(finishLoading("getAllMissionList"));
  }
}

function* postMissionApplyTask({
  payload,
}: ReturnType<typeof postMissionApplyAsync.request>) {
  const { ad_user_apply_id, mission_card_id } = payload;
  yield put(startLoading("postMissionApply"));
  try {
    const response: PostMissionApplyResponse = yield call(
      missionAPI.postMissionApply,
      payload
    );
    yield put(
      postMissionApplyAsync.success({
        ...response,
        ad_user_apply_id,
        mission_card_id,
      })
    );
    yield put(
      setMessageAction({
        key: "postMissionApply",
        type: "success",
        message: `정상적으로 ${payload.status === "reject" ? "실패" : "승인"
          }처리 되었습니다.`,
      })
    );
  } catch (e) {
    const error = `잠시후 다시 시도하십시오. [${e}]`;
    yield put(
      setMessageAction({
        key: "postMissionApply",
        type: "error",
        message: error,
      })
    );
  } finally {
    yield put(finishLoading("postMissionApply"));
  }
}

export function* certifiedSaga() {
  yield takeLatest(GET_CERTIFIED_LIST_REQUEST, getCertifiedListTask);
  yield takeLatest(GET_ALL_MISSION_LIST_REQUEST, getAllMissionListTask);
  yield takeLatest(POST_MISSION_APPLY_REQUEST, postMissionApplyTask);
}
