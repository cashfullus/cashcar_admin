import {
  GRAY_SCALE_BLACK,
  SYSTEM_COLOR_BLUE,
  SYSTEM_COLOR_GREEN,
  SYSTEM_COLOR_RED,
  SYSTEM_COLOR_YELLOW,
} from 'styles/color.constants';
import { ExtendedAD } from './modules/ad';
import { ExtendedADApply } from './modules/ad-apply';
import { ExtendedCertified } from './modules/certified-mission';
import { Gender } from './modules/commonType';
import { ExtendedDonate } from './modules/point-donate';
import { ExtendedWithdraw } from './modules/point-withdraw';
import { ExtendedAppPush, ExtendedAppPushUser, ExtendedMarketingUser } from './modules/push';
import { ExtendedUser } from './modules/users';

const GENDER_IRRELEVANT = '무관';
const GENDER_MALE = '남자';
const GENDER_FEMALE = '여자';

const AD_STATUS_SCHEDULED = '예정';
// const AD_STATUS_STAND_BY = "대기";
const AD_STATUS_ONGOING = '모집중';
const AD_STATUS_DONE = '종료';

const AD_APPLY_STATUS_ACCEPT = '승인';
const AD_APPLY_STATUS_STAND_BY = '대기';
const AD_APPLY_STATUS_REJECT = '거절';
const AD_APPLY_STATUS_DONE = '종료';

const WITHDRAW_STATUS_STAND_BY = '출금신청';
const WITHDRAW_STATUS_CONFIRM = '진행중';
const WITHDRAW_STATUS_DONE = '출금완료';
const WITHDRAW_STATUS_REJECT = '출금취소';

const DONATE_STATUS_STAND_BY = '기부신청';
const DONATE_STATUS_CONFIRM = '진행중';
const DONATE_STATUS_DONE = '기부완료';
const DONATE_STATUS_REJECT = '기부취소';

const APP_PUSH_STATUS_STAND_BY = '대기';
const APP_PUSH_STATUS_SUCCESS = '성공';
const APP_PUSH_STATUS_FAIL = '실패';

const MISSION_STATUS_REVIEW = '대기';
const MISSION_STATUS_RE_REVIEW = '재인증';
const MISSION_STATUS_SUCCESS = '승인';
const MISSION_STATUS_REJECT = '실패';

const MARKETING_ON = 'ON';
const MARKETING_OFF = 'OFF';

// 성별을 매핑하는 함수
export const genderMapper = (gender: Gender) => {
  if (+gender === 1) {
    return GENDER_MALE;
  }
  if (+gender === 2) {
    return GENDER_FEMALE;
  }
  return GENDER_IRRELEVANT;
};

// 광고의 상태를 매핑하는 함수
export const adStatusMapper = (adStatus: ExtendedAD['ad_status']) => {
  if (adStatus === 'scheduled') {
    return { label: AD_STATUS_SCHEDULED, color: SYSTEM_COLOR_YELLOW };
  }
  if (adStatus === 'ongoing') {
    return { label: AD_STATUS_ONGOING, color: SYSTEM_COLOR_BLUE };
  }
  // if (adStatus === "stand_by") {
  //   return { label: AD_STATUS_STAND_BY, color: SYSTEM_COLOR_GREEN };
  // }
  return { label: AD_STATUS_DONE, color: SYSTEM_COLOR_RED };
};

// 광고 신청의 상태를 매핑하는 함수
export const adApplyStatusMapper = (adApplyStatus: ExtendedADApply['status']) => {
  if (adApplyStatus === 'accept') {
    return { label: AD_APPLY_STATUS_ACCEPT, color: SYSTEM_COLOR_BLUE };
  }
  if (adApplyStatus === 'stand_by') {
    return { label: AD_APPLY_STATUS_STAND_BY, color: SYSTEM_COLOR_YELLOW };
  }
  if (adApplyStatus === 'success') {
    return { label: AD_APPLY_STATUS_DONE, color: GRAY_SCALE_BLACK };
  }
  return { label: AD_APPLY_STATUS_REJECT, color: SYSTEM_COLOR_RED };
};

// 포인트 출금의 상태를 매핑하는 함수
export const withdrawStatusMapper = (withdrawStatus: ExtendedWithdraw['status']) => {
  if (withdrawStatus === 'stand_by') {
    return { label: WITHDRAW_STATUS_STAND_BY, color: SYSTEM_COLOR_YELLOW };
  }
  if (withdrawStatus === 'confirm') {
    return { label: WITHDRAW_STATUS_CONFIRM, color: SYSTEM_COLOR_GREEN };
  }
  if (withdrawStatus === 'done') {
    return { label: WITHDRAW_STATUS_DONE, color: SYSTEM_COLOR_BLUE };
  }
  return { label: WITHDRAW_STATUS_REJECT, color: SYSTEM_COLOR_RED };
};

// 포인트 출금의 상태를 매핑하는 함수
export const missionStatusMapper = (status: ExtendedCertified['status']) => {
  if (status === 'review') {
    return { label: MISSION_STATUS_REVIEW, color: SYSTEM_COLOR_YELLOW };
  }
  if (status === 're_review') {
    return { label: MISSION_STATUS_RE_REVIEW, color: SYSTEM_COLOR_GREEN };
  }
  if (status === 'success') {
    return { label: MISSION_STATUS_SUCCESS, color: SYSTEM_COLOR_BLUE };
  }
  return { label: MISSION_STATUS_REJECT, color: SYSTEM_COLOR_RED };
};

// 포인트 기부의 상태를 매핑하는 함수
export const donateStatusMapper = (donateStatus: ExtendedDonate['status']) => {
  if (donateStatus === 'stand_by') {
    return { label: DONATE_STATUS_STAND_BY, color: SYSTEM_COLOR_YELLOW };
  }
  if (donateStatus === 'confirm') {
    return { label: DONATE_STATUS_CONFIRM, color: SYSTEM_COLOR_GREEN };
  }
  if (donateStatus === 'done') {
    return { label: DONATE_STATUS_DONE, color: SYSTEM_COLOR_BLUE };
  }
  return { label: DONATE_STATUS_REJECT, color: SYSTEM_COLOR_RED };
};

// 마케팅 수신 동의 여부를 매핑하는 함수
export const marketingMapper = (marketing: ExtendedUser['marketing']) => {
  if (marketing === 1) {
    return MARKETING_ON;
  } else {
    return MARKETING_OFF;
  }
};

// 사용자의 차량 중 서포터즈 차량을 찾는 함수
// 서포터즈 차량이 없는 경우는 없지만, find 함수의 리턴값에 undefined가 있어서 undefined인 경우 하이픈을 리턴한다.
export const supportersMapper = (infomation: ExtendedUser['vehicle_information']) => {
  const supporters = infomation.find(vehicle => vehicle.supporters === 1);
  if (supporters) {
    const { car_number, brand, vehicle_model_name } = supporters;
    return `${car_number} ${brand} ${vehicle_model_name}`;
  } else {
    return '-';
  }
};

export const getVehicleMapper = (vehicle: ExtendedMarketingUser['vehicle_information']) => {
  const { car_number, brand, vehicle_model_name } = vehicle;
  const string = `${car_number} ${brand} ${vehicle_model_name}`;
  if (string.length === 2) {
    return '-';
  }
  return `${car_number} ${brand} ${vehicle_model_name}`;
};

export const appPushStatusMapper = (status: ExtendedAppPushUser['status']) => {
  if (status === 'stand_by') {
    return { label: APP_PUSH_STATUS_STAND_BY, color: SYSTEM_COLOR_YELLOW };
  }
  if (status === 'success') {
    return { label: APP_PUSH_STATUS_SUCCESS, color: SYSTEM_COLOR_BLUE };
  }
  return { label: APP_PUSH_STATUS_FAIL, color: SYSTEM_COLOR_RED };
};

// YYMMDD 혹은 YYYYMMDD 형태의 string데이터를 YYYY, MM, DD로 분리해서 배열로 리턴하는 함수
export const extractYearMonthDate = (dateOfBirth: ExtendedUser['date_of_birth']) => {
  if (dateOfBirth.length === 8) {
    const year = dateOfBirth.slice(0, 4);
    const month = dateOfBirth.slice(4, 6);
    const date = dateOfBirth.slice(6);
    return [year, month, date];
  }
  const today = new Date();
  let year = dateOfBirth.slice(0, 2);
  const month = dateOfBirth.slice(2, 4);
  const date = dateOfBirth.slice(4);
  const currentYear = (today.getFullYear() - 2000).toString();
  if (year > currentYear) {
    year = `19${year}`;
  } else {
    year = `20${year}`;
  }
  return [year, month, date];
};

// YYMMDD 혹은 YYYYMMDD 형태의 string 데이터로부터 만나이 계산을 하는 함수
export const dateOfBirthMapper = (dateOfBirth: ExtendedUser['date_of_birth']) => {
  let age: number;
  const today = new Date();
  const [year, month, date] = extractYearMonthDate(dateOfBirth);
  const formattedDate = `${year}-${month}-${date}`;
  const birthday = new Date(formattedDate);
  const isOverMonth = today.getMonth() >= birthday.getMonth();
  const isOverDate = today.getDate() >= birthday.getDate();
  age = today.getFullYear() - birthday.getFullYear();
  if (Number.isNaN(age - 1)) {
    return '-';
  }
  if (!isOverMonth) {
    return `${age - 1}세`;
  }
  if (today.getMonth() === birthday.getMonth()) {
    if (!isOverDate) {
      return `${age - 1}세`;
    }
  }
  return `${age}세`;
};

// YYMMDD 혹은 YYYYMMDD 형태의 string 데이터를 한국식 형태 (YYYY년 MM월 DD일)로 변경하는 함수
export const koreanBirthMapper = (dateOfBirth?: ExtendedUser['date_of_birth']) => {
  if (!dateOfBirth) {
    return '-';
  }
  const [year, month, date] = extractYearMonthDate(dateOfBirth);
  return `${year}년 ${month}월 ${date}일`;
};

// push 발송번호 mapper
export const pushIdMapper = (id: ExtendedAppPush['id']) => {
  const newId = id.toString().padStart(5, '0');
  return newId;
};
