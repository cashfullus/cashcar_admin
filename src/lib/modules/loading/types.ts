import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type LoadingAction = ActionType<typeof actions>;

export type LoadingState = {
  initialization: boolean;
  login: boolean;
  getADList: boolean;
  postAD: boolean;
  getADUserList: boolean;
  getADApplyList: boolean;
  getUserList: boolean;
  getCertifiedList: boolean;
  getAllMissionList: boolean;
  getDonateList: boolean;
  postDonateList: boolean;
  getPointList: boolean;
  postPoint: boolean;
  postPointList: boolean;
  getWithdrawList: boolean;
  postWithdrawList: boolean;
  getNoticeList: boolean;
  deleteNotice: boolean;
  postADApply: boolean;
  postNotice: boolean;
  postMissionApply: boolean;
  getCashcarTipList: boolean;
  getAppPushList: boolean;
  sendAppPush: boolean;
  resendAppPush: boolean;
  postCashcarTip: boolean;
  deleteCashcarTip: boolean;
};
