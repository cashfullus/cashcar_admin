import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type MessageAction = ActionType<typeof actions>;

export interface Message {
  type: 'success' | 'error';
  message: string;
}

export interface MessageState {
  initialization: Message;
  login: Message;
  getADList: Message;
  postAD: Message;
  getADUserList: Message;
  getADApplyList: Message;
  getUserList: Message;
  getCertifiedList: Message;
  getAllMissionList: Message;
  getDonateList: Message;
  postDonateList: Message;
  getPointList: Message;
  postPoint: Message;
  postPointList: Message;
  getWithdrawList: Message;
  postWithdrawList: Message;
  getNoticeList: Message;
  deleteNotice: Message;
  postADApply: Message;
  postNotice: Message;
  postMissionApply: Message;
  getCashcarTipList: Message;
  getAppPushList: Message;
  sendAppPush: Message;
  resendAppPush: Message;
  postCashcarTip: Message;
  deleteCashcarTip: Message;
}

export interface SetMessagePayload extends Message {
  key: keyof MessageState;
}

export type ClearMessagePayload = keyof MessageState;
