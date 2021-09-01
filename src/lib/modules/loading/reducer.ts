import { createReducer } from 'typesafe-actions';
import { FINISH_LOADING, START_LOADING } from './actions';
import { LoadingAction, LoadingState } from './types';

const initialState: LoadingState = {
  initialization: false,
  login: false,
  getADList: false,
  postAD: false,
  getADUserList: false,
  getADApplyList: false,
  getUserList: false,
  getCertifiedList: false,
  getAllMissionList: false,
  getDonateList: false,
  postDonateList: false,
  getWithdrawList: false,
  postWithdrawList: false,
  getNoticeList: false,
  deleteNotice: false,
  postADApply: false,
  postNotice: false,
  postMissionApply: false,
  getCashcarTipList: false,
  getAppPushList: false,
  sendAppPush: false,
  resendAppPush: false,
  postCashcarTip: false,
  deleteCashcarTip: false,
  getPointList: false,
  postPoint: false,
  postPointList: false,
};

const loading = createReducer<LoadingState, LoadingAction>(initialState, {
  [START_LOADING]: (state, { payload: key }) => {
    return { ...state, [key]: true };
  },
  [FINISH_LOADING]: (state, { payload: key }) => {
    return { ...state, [key]: false };
  },
});

export default loading;
