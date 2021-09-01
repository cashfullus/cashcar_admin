import {
  AdminLoginPayload,
  AdminLoginResponse,
} from "lib/modules/shared/types";
import client from "./client";

const LOGIN_URL = "/admin/user/login";

const login = async (payload: AdminLoginPayload) => {
  const response = await client.post<AdminLoginResponse>(LOGIN_URL, payload);
  return response.data;
};

const authAPI = {
  login,
};

export default authAPI;
