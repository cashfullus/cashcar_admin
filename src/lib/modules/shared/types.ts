import { ADApplyStatus, ADStatus, Gender, PointStatus } from '../commonType';
import { AD, ADUser } from '../ad';
import { PointHistory, User } from '../users';
import { ADApply } from '../ad-apply';
import { Certified, SubMission } from '../certified-mission';
import { Donate } from '../point-donate';
import { Withdraw } from '../point-withdraw';
import { Notice } from '../notice';
import { CashcarTip, ExtendedCashcarTip } from '../tip';
import { AppPush, AppPushUser, MarketingUser } from '../push';
import { Point } from '../point-overview';

export interface CommonState<Entity> {
  item_count: number;
  items: Entity[];
  selected: number[];
}

export interface CommonPaginationPayload {
  page: number;
  count: number;
}

export interface AdminLoginPayload {
  login_id: string;
  password: string;
}

export interface AdminLoginResponse {
  data: {
    jwt_token?: string;
    user_id?: number;
  };
  login_id: boolean;
  password: boolean;
}

export interface PostADPayload {
  usage: 'edit' | 'register';
  formData: FormData;
  adId?: number;
}

export interface PostADResponse {
  usage: 'edit' | 'register';
  data: {
    allowed_image: boolean;
    registered: Omit<AD, 'id'> & { ad_id: number };
    success: boolean;
  };
}

export interface GetADListPayload extends CommonPaginationPayload {
  category?: ADStatus;
  point?: number;
  area?: string;
  gender?: Gender;
  age?: number;
  distance?: number;
  recruit_time?: string;
  order_by?: string;
  sort?: 'ASC' | 'DESC';
  q?: string;
}

export interface GetADListResponse {
  data: (Omit<AD, 'id'> & { ad_id: number })[];
  item_count: number;
}

export interface GetADUserListPayload {
  ad_id: number;
  page: number;
  count: number;
}

export interface GetADUserListResponse {
  data: (Omit<ADUser, 'id'> & { user_id: number })[];
  item_count: number;
}

export interface GetUserListPayload extends CommonPaginationPayload {
  area?: string;
  gender?: number;
  age?: string;
  register_time?: string;
  q?: string;
}

export interface GetUserListResponse {
  data: (Omit<User, 'id'> & { user_id: number })[];
  item_count: number;
}
export interface GetAllUserListResponse {
  data: (Omit<User, 'id'> & { user_id: number })[];
  item_count: number;
}

export interface PostADApplyPayload {
  apply_user_list: number[];
  status: ADApplyStatus;
}

export interface PostADApplyResponse {
  data: {
    accept: boolean; // 이미 accept인 ad apply가 들어오는 경우 false
    apply_data: boolean; // status를 잘못보내는 경우 false
    rejected: boolean; // 이미 reject인 ad apply가 들어오는 경우 false
    status: ADApplyStatus; // 실제 response에는 없지만 redux action에서 필요함
  };
}

export interface GetADApplyListPayload extends CommonPaginationPayload {
  status?: ADApplyStatus;
  area?: string;
  gender?: number;
  age?: string;
  apply_time?: string;
  q?: string;
}

export interface GetADApplyListResponse {
  data: (Omit<ADApply, 'id'> & { ad_user_apply_id: number })[];
  item_count: number;
}

export interface GetCertifiedListPayload extends CommonPaginationPayload {}

export interface GetCertifiedListResponse {
  data: Omit<Certified, 'id'>[];
  item_count: number;
}

export interface GetAllMissionListPayload {
  ad_user_apply_id: number;
  mission_card_id: number;
}

// GetAllMissionListPayload를 확장한 이유는 리듀서에서 고유한 값이 필요하기 때문임
export interface GetAllMissionListResponse extends GetAllMissionListPayload {
  data: SubMission[];
}

export interface PostMissionApplyPayload {
  ad_user_apply_id: number;
  mission_card_id: number;
  status: 'success' | 'reject';
  reason?: string;
}

export interface PostMissionApplyResponse {
  ad_user_apply_id: number;
  mission_card_id: number;
  accept: boolean;
  reason: string;
  status: 'success' | 'reject';
}

export interface GetPointListPayload extends CommonPaginationPayload {
  point?: string;
}

export interface GetPointListResponse {
  data: (Omit<Point, 'id'> & { user_id: number })[];
  item_count: number;
}

export interface PostPointPayload {
  user_id: number;
  point: number;
  contents: string;
}

export interface PostPointResponse {
  data: {
    contents: string;
    point: number;
    register_time: string;
  };
  user_id: number;
}

export interface PostPointListPayload {
  user_list: number[];
  point: number;
  contents: string;
}

export interface PostPointListResponse {
  data: {
    contents: string;
    point: number;
    register_time: string;
  };
  user_list: number[];
}

export interface GetWithdrawListPayload extends CommonPaginationPayload {}

export interface GetWithdrawListResponse {
  data: (Omit<Withdraw, 'id'> & { withdrawal_self_id: number })[];
  item_count: number;
}

export interface PostWithdrawListPayload {
  withdrawal_list: number[];
  status: PointStatus;
}

export interface PostWithdrawListResponse {
  withdrawal_list: number[];
  data: PointStatus;
}

export interface GetDonateListPayload extends CommonPaginationPayload {}

export interface GetDonateListResponse {
  data: (Omit<Donate, 'id'> & { withdrawal_donate_id: number })[];
  item_count: number;
}

export interface PostDonateListPayload {
  withdrawal_donate_list: number[];
  status: PointStatus;
}

export interface PostDonateListResponse {
  withdrawal_donate_list: number[];
  data: PointStatus;
}

export interface GetPointHistoryPayload {
  user_id: number;
}

export interface GetPointHistoryResponse {
  data: PointHistory[];
}

export interface GetNoticeListPayload {
  page?: number;
  count?: number;
}

export interface GetNoticeListResponse {
  data: (Omit<Notice, 'id'> & { notice_id: number })[];
  item_count: number;
}

export interface EditNoticePayload extends Omit<Notice, 'register_time' | 'id'> {
  notice_id: number;
}

export interface EditNoticeResponse {
  data: Omit<Notice, 'register_time' | 'id'> & { notice_id: number };
}
export interface DeleteNoticePayload {
  notice_id: number;
}

export interface DeleteNoticeResponse {
  status: boolean;
}

export interface RegisterNoticePayload {
  title: string;
  description: string;
}

export interface RegisterNoticeResponse {
  data: Omit<Notice, 'id'> & { notice_id: number };
}

export interface GetCashcarTipListPayload {
  page: number;
  count: number;
}

export interface GetCashcarTipListResponse {
  data: (Omit<CashcarTip, 'id'> & { cash_car_tip_id: number })[];
  item_count: number;
}

export interface RegisterCashcarTipPayload {
  formData: FormData;
}

export interface RegisterCashcarTipResponse {
  data: Omit<CashcarTip, 'id'> & { cash_car_tip_id: number };
}
export interface EditCashcarTipPayload {
  cash_car_tip_id: number;
  formData: FormData;
}

export interface EditCashcarTipResponse {
  data: Omit<ExtendedCashcarTip, 'id'> & {
    cash_car_tip_id: number;
  };
}
export interface DeleteCashcarTipPayload {
  cash_car_tip_id: number;
}

export interface DeleteCashcarTipResponse {
  status: boolean;
}

export interface GetAppPushListParams {
  page: number;
  count: number;
}

export interface GetAppPushListResponse {
  data: AppPush[];
  item_count: number;
}

export interface GetAppPushUserListParams {
  id: number;
  page: number;
  count: number;
}

export interface GetAppPushUserListResponse {
  data: (Omit<AppPushUser, 'id'> & { user_id: number })[];
  item_count: number;
}

export interface GetMarketingUserListParams {
  page: number;
  count: number;
  area?: string;
  gender?: string;
  register_time?: string;
}

export interface GetMarketingUserListResponse {
  data: (Omit<MarketingUser, 'id'> & { user_id: number })[];
  item_count: number;
}

export interface SendAppPushPayload {
  user_list: MarketingUser['id'][];
  title: string;
  body: string;
}

export interface SendAppPushResponse {
  data: boolean;
}

export interface ResendAppPushParams {
  id: number;
  user_id: number;
}

export interface ResendAppPushResponse {
  data: boolean;
}
