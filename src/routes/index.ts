// 메인 화면
export const HOME_URL = "/";

// 광고 목록
export const AD_LIST_URL = "/ads";
export const EDIT_AD_URL = (id?: number) =>
  id ? `${AD_LIST_URL}/edit/${id}` : `${AD_LIST_URL}/edit/:id`;
export const CREATE_AD_URL = `${AD_LIST_URL}/create/`;

// 전체 회원 목록
export const USER_LIST_URL = "/users";

// 광고 신청 회원 목록
export const AD_APPLY_LIST_URL = "/applies";

// 미션 인증 관리
export const MISSION_URL = "/mission";
export const CERTIFIED_URL = `${MISSION_URL}/certified`;
export const DRIVING_URL = `${MISSION_URL}/driving`;

// 포인트 관리
export const POINT_URL = "/point";
export const POINT_OVERVIEW_URL = `${POINT_URL}/overview`;
export const POINT_WITHDRAW_URL = `${POINT_URL}/withdraw`;
export const POINT_DONATE_URL = `${POINT_URL}/donate`;

// 컨텐츠 관리
export const CONTENT_URL = "/content";
export const CONTENT_CASHCAR_TIP_URL = `${CONTENT_URL}/cashcar-tip`;
export const CONTENT_NOTIFICATION_URL = `${CONTENT_URL}/notification`;
export const CONTENT_QNA_URL = `${CONTENT_URL}/qna`;

// 알림 관리
export const ALARM_URL = "/alarm";
export const ALARM_PUSH_URL = `${ALARM_URL}/push`;
export const ALARM_SMS_URL = `${ALARM_URL}/sms`;
export const ALARM_EMAIL_URL = `${ALARM_URL}/email`;

// 광고주 문의
export const AD_QNA_URL = "/ad-qna";

// 통계
export const CHART_URL = "/chart";

// 업데이트 노트
export const RELEASE_URL = "/release";

const routes = {
  home: HOME_URL,
  adList: AD_LIST_URL,
  userList: USER_LIST_URL,
  adApplyList: AD_APPLY_LIST_URL,
  editAD: EDIT_AD_URL,
  createAD: CREATE_AD_URL,
  certified: CERTIFIED_URL,
  driving: DRIVING_URL,
  pointOverview: POINT_OVERVIEW_URL,
  pointWithdraw: POINT_WITHDRAW_URL,
  pointDonate: POINT_DONATE_URL,
  contentCashcarTip: CONTENT_CASHCAR_TIP_URL,
  contentNotification: CONTENT_NOTIFICATION_URL,
  contentQna: CONTENT_QNA_URL,
  alarmPush: ALARM_PUSH_URL,
  alarmSMS: ALARM_SMS_URL,
  alarmEmail: ALARM_EMAIL_URL,
  adQna: AD_QNA_URL,
  chart: CHART_URL,
  release: RELEASE_URL,
};

export default routes;
