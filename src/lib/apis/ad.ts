import {
  GetADApplyListResponse,
  GetADApplyListPayload,
  GetADListPayload,
  GetADListResponse,
  GetADUserListPayload,
  GetADUserListResponse,
  PostADApplyPayload,
  PostADApplyResponse,
  PostADPayload,
  PostADResponse,
} from 'lib/modules/shared/types';
import client from './client';

const GET_AD_URL = '/admin/ad/list';
const POST_AD_APPLY_URL = '/admin/ad/apply';
const GET_AD_APPLY_URL = '/admin/ad/apply/list';
const POST_AD_URL = '/admin/adverting/register';
const GET_AD_USER_URL = '/admin/ad/list/user-list';

const getADList = async (params: GetADListPayload) => {
  const response = await client.get<GetADListResponse>(GET_AD_URL, { params });
  return response.data;
};

const getADUserList = async (params: GetADUserListPayload) => {
  const response = await client.get<GetADUserListResponse>(GET_AD_USER_URL, {
    params,
  });
  return response.data;
};

const postAD = async (payload: PostADPayload) => {
  const response = await client.post<PostADResponse>(POST_AD_URL, payload.formData, {
    params: {
      ad_id: payload.adId,
    },
  });
  return response.data;
};

const getADApplyList = async (params: GetADApplyListPayload) => {
  const response = await client.get<GetADApplyListResponse>(GET_AD_APPLY_URL, {
    params,
  });
  return response.data;
};

const postADApply = async (payload: PostADApplyPayload) => {
  const response = await client.post<PostADApplyResponse>(POST_AD_APPLY_URL, payload);
  return response.data;
};

const ADAPI = {
  postAD,
  getADList,
  getADUserList,
  getADApplyList,
  postADApply,
};

export default ADAPI;
