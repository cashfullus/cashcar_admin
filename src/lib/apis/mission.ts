import {
  GetAllMissionListPayload,
  GetAllMissionListResponse,
  GetCertifiedListPayload,
  GetCertifiedListResponse,
  PostMissionApplyPayload,
  PostMissionApplyResponse,
} from "lib/modules/shared/types";
import client from "./client";

const GET_CERTIFIED_MISSION_LIST_URL = "/admin/mission/list";
const POST_MISSION_APPLY_URL = "/admin/mission/apply";
const GET_ALL_MISSION_LIST_URL = "/admin/mission/all/list";

const getCertifiedList = async (params: GetCertifiedListPayload) => {
  const response = await client.get<GetCertifiedListResponse>(
    GET_CERTIFIED_MISSION_LIST_URL,
    { params }
  );
  return response.data;
};

const getAllMissionList = async (params: GetAllMissionListPayload) => {
  const response = await client.get<GetAllMissionListResponse>(
    GET_ALL_MISSION_LIST_URL,
    { params }
  );
  return response.data;
};

const postMissionApply = async ({
  status,
  reason,
  ...params
}: PostMissionApplyPayload) => {
  const payload = { status, reason };
  const response = await client.post<PostMissionApplyResponse>(
    POST_MISSION_APPLY_URL,
    payload,
    { params }
  );
  return response.data;
};

const missionAPI = {
  getCertifiedList,
  getAllMissionList,
  postMissionApply,
};

export default missionAPI;
