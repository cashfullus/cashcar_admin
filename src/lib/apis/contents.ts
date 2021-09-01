import {
  EditNoticePayload,
  EditNoticeResponse,
  GetNoticeListPayload,
  GetNoticeListResponse,
  RegisterNoticePayload,
  RegisterNoticeResponse,
  DeleteNoticePayload,
  DeleteNoticeResponse,
  GetCashcarTipListPayload,
  GetCashcarTipListResponse,
  RegisterCashcarTipPayload,
  RegisterCashcarTipResponse,
  EditCashcarTipPayload,
  EditCashcarTipResponse,
  DeleteCashcarTipPayload,
  DeleteCashcarTipResponse,
} from "lib/modules/shared";
import client from "./client";

const NOTICE_URL = "/admin/notice"; // 조회, 수정, 삭제
const CASHCAR_TIP_URL = "/admin/cash-car-tip"; // 조회, 수정, 삭제
const REGISTER_NOTICE_URL = "/admin/notice/register";
const REGISTER_CASHCAR_TIP_URL = "/admin/cash-car-tip/register";

const getNoticeList = async (params: GetNoticeListPayload) => {
  const response = await client.get<GetNoticeListResponse>(NOTICE_URL, {
    params,
  });
  return response.data;
};

const editNotice = async ({ notice_id, ...payload }: EditNoticePayload) => {
  const response = await client.post<EditNoticeResponse>(NOTICE_URL, payload, {
    params: { notice_id },
  });
  return response.data;
};

const deleteNotice = async (params: DeleteNoticePayload) => {
  const response = await client.delete<DeleteNoticeResponse>(NOTICE_URL, {
    params,
  });
  return response.data;
};

const registerNotice = async (payload: RegisterNoticePayload) => {
  const response = await client.post<RegisterNoticeResponse>(
    REGISTER_NOTICE_URL,
    payload
  );
  return response.data;
};

const getCashcarTipList = async (params: GetCashcarTipListPayload) => {
  const response = await client.get<GetCashcarTipListResponse>(
    CASHCAR_TIP_URL,
    {
      params,
    }
  );
  return response.data;
};

const registerCashcarTip = async ({ formData }: RegisterCashcarTipPayload) => {
  const response = await client.post<RegisterCashcarTipResponse>(
    REGISTER_CASHCAR_TIP_URL,
    formData
  );
  return response.data;
};

const editCashcarTip = async ({
  cash_car_tip_id,
  formData,
}: EditCashcarTipPayload) => {
  const response = await client.post<EditCashcarTipResponse>(
    CASHCAR_TIP_URL,
    formData,
    {
      params: { cash_car_tip_id },
    }
  );
  return response.data;
};

const deleteCashcarTip = async (params: DeleteCashcarTipPayload) => {
  const response = await client.delete<DeleteCashcarTipResponse>(
    CASHCAR_TIP_URL,
    {
      params,
    }
  );
  return response.data;
};

const contentAPI = {
  getNoticeList,
  registerNotice,
  editNotice,
  deleteNotice,
  getCashcarTipList,
  registerCashcarTip,
  editCashcarTip,
  deleteCashcarTip,
};

export default contentAPI;
