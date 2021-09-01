import { ActionType } from 'typesafe-actions';
import { AppPushStatus } from '../commonType';
import { CommonState, GetMarketingUserListResponse } from '../shared';
import * as actions from './actions';

export const APP_PUSH_DISCRIMINATOR = 'app-push';
export const MARKETING_USER_DISCRIMINATOR = 'marketing-user';
export const APP_PUSH_USER_DISCRIMINATOR = 'app-push-user';
export interface MarketingUser {
  id: number;
  age: number;
  call_number: string;
  email: string;
  gender: string;
  name: string;
  nickname: string;
  register_time: string;
  vehicle_information: {
    brand: string;
    car_number: string;
    vehicle_model_name: string;
  };
}

export interface AppPushUser extends MarketingUser {
  status: AppPushStatus;
  updated_time: string;
}

export interface AppPush {
  id: number;
  notification_body: string;
  notification_title: string;
  success_count: number;
  transfer_count: number;
  register_time: string;
}

export interface ExtendedAppPush extends AppPush {
  discriminator: typeof APP_PUSH_DISCRIMINATOR;
}

export interface ExtendedMarketingUser extends MarketingUser {
  discriminator: typeof MARKETING_USER_DISCRIMINATOR;
}

export interface ExtendedAppPushUser extends AppPushUser {
  discriminator: typeof APP_PUSH_USER_DISCRIMINATOR;
}

export type AppPushAction = ActionType<typeof actions>;

export interface AppPushState extends CommonState<ExtendedAppPush> {
  userList: GetMarketingUserListResponse['data'];
}
