import { ActionType } from 'typesafe-actions';
import { Gender, Marketing, Supporters } from '../commonType';
import { CommonState } from '../shared';
import * as actions from './actions';

export const USER_DISCRIMINATOR = 'user';

export interface UserVehicle {
  vehicle_id: number;
  vehicle_model_name: string;
  car_number: string;
  brand: string;
  owner_relationship: string;
  supporters: Supporters;
}

export interface PointHistory {
  contents: string;
  point: number;
  register_time: string;
}

export interface User {
  id: number;
  activity_history: {
    history_name: string;
    register_time: string;
  }[];
  call_number: string;
  date_of_birth: string;
  email: string;
  gender: Gender;
  marketing: Marketing;
  main_address: string;
  detail_address: string;
  deposit: number;
  name: string;
  nickname: string;
  register_time: string;
  vehicle_information: UserVehicle[];
}

export interface ExtendedUser extends User {
  discriminator: typeof USER_DISCRIMINATOR;
}

export type UserAction = ActionType<typeof actions>;

export interface UserState extends CommonState<ExtendedUser> {
  allUserIds: number[];
}
