import {
  GetPointHistoryPayload,
  GetPointHistoryResponse,
  GetUserListPayload,
  GetUserListResponse,
} from "lib/modules/shared/types";
import client from "./client";

const GET_USERS_URL = "/admin/user/list";
const GET_USER_POINT_URL = "/user/point";

const getUserList = async (params: GetUserListPayload) => {
  const response = await client.get<GetUserListResponse>(GET_USERS_URL, {
    params,
  });
  return response.data;
};

const getPointHistory = async (params: GetPointHistoryPayload) => {
  const response = await client.get<GetPointHistoryResponse>(
    GET_USER_POINT_URL,
    { params }
  );
  return response.data;
};

const userAPI = {
  getUserList,
  getPointHistory,
};

export default userAPI;
