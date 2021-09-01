import {
  GetDonateListPayload,
  GetDonateListResponse,
  GetPointListPayload,
  GetPointListResponse,
  GetWithdrawListPayload,
  GetWithdrawListResponse,
  PostDonateListPayload,
  PostDonateListResponse,
  PostPointListPayload,
  PostPointListResponse,
  PostPointPayload,
  PostPointResponse,
  PostWithdrawListPayload,
  PostWithdrawListResponse,
} from 'lib/modules/shared/types';
import client from './client';

const POINT_WITHDRAW_URL = '/admin/user/withdrawal/point';
const POINT_DONATE_URL = '/admin/user/withdrawal/donate';
const POINT_URL = '/admin/point';
const POINT_ALL_URL = '/admin/point/all';

const getPointList = async (params: GetPointListPayload) => {
  const response = await client.get<GetPointListResponse>(POINT_URL, { params });
  return response.data;
};

const postPoint = async (payload: PostPointPayload) => {
  const response = await client.post<PostPointResponse>(POINT_URL, payload);
  return response.data;
};

const postPointList = async (payload: PostPointListPayload) => {
  const response = await client.post<PostPointListResponse>(POINT_ALL_URL, payload);
  return response.data;
};

const getWithdrawList = async (params: GetWithdrawListPayload) => {
  const response = await client.get<GetWithdrawListResponse>(POINT_WITHDRAW_URL, {
    params,
  });
  return response.data;
};

const postWithdrawList = async (payload: PostWithdrawListPayload) => {
  const response = await client.post<PostWithdrawListResponse>(POINT_WITHDRAW_URL, payload);
  return response.data;
};

const getDonateList = async (params: GetDonateListPayload) => {
  const response = await client.get<GetDonateListResponse>(POINT_DONATE_URL, {
    params,
  });
  return response.data;
};

const postDonateList = async (payload: PostDonateListPayload) => {
  const response = await client.post<PostDonateListResponse>(POINT_DONATE_URL, payload);
  return response.data;
};

const pointAPI = {
  getWithdrawList,
  getDonateList,
  postWithdrawList,
  postDonateList,
  getPointList,
  postPoint,
  postPointList,
};

export default pointAPI;
