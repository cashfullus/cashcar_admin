import {
  GetAppPushListParams,
  GetAppPushListResponse,
  GetAppPushUserListParams,
  GetAppPushUserListResponse,
  GetMarketingUserListParams,
  GetMarketingUserListResponse,
  ResendAppPushParams,
  ResendAppPushResponse,
  SendAppPushPayload,
  SendAppPushResponse,
} from 'lib/modules/shared/types';
import client from './client';

const APP_PUSH_URL = '/admin/app-push/list';

const MARKETING_USER_URL = '/admin/marketing/user-list';

const APP_PUSH_USER_URL = '/admin/app-push/user-list';
const APP_PUSH_RETRANSFER_URL = '/admin/app-push/re-transfer';

const getAppPushList = async (params: GetAppPushListParams) => {
  const response = await client.get<GetAppPushListResponse>(APP_PUSH_URL, { params });
  return response.data;
};

const getMarketingUserList = async (params: GetMarketingUserListParams) => {
  const response = await client.get<GetMarketingUserListResponse>(MARKETING_USER_URL, { params });
  return response.data;
};

const getAppPushUserList = async (params: GetAppPushUserListParams) => {
  const response = await client.get<GetAppPushUserListResponse>(APP_PUSH_USER_URL, { params });
  return response.data;
};

const sendAppPush = async (payload: SendAppPushPayload) => {
  const response = await client.post<SendAppPushResponse>(APP_PUSH_USER_URL, payload);
  return response.data;
};

const resendAppPush = async (params: ResendAppPushParams) => {
  const response = await client.post<ResendAppPushResponse>(APP_PUSH_RETRANSFER_URL, undefined, { params });
  return response.data;
};

const alarmAPI = {
  getAppPushList,
  getMarketingUserList,
  getAppPushUserList,
  sendAppPush,
  resendAppPush,
};

export default alarmAPI;
