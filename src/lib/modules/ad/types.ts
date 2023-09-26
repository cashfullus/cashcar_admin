import { ActionType } from 'typesafe-actions';
import { ADStatus, Gender } from '../commonType';
import { CommonState } from '../shared';
import * as actions from './actions';

export const AD_DISCRIMINATOR = 'ad';
export const AD_USER_DISCRIMINATOR = 'ad-user';

export interface AD {
  id: number;
  activity_period: number;
  ad_images: { image: string }[];
  additional_mission_items: {
    additional_point: number;
    due_date: number;
    based_on_activity_period: number;
    mission_name: string;
    mission_type: 1;
    order: number;
  }[];
  default_mission_items: {
    based_on_activity_period: number;
    due_date: number;
    mission_type: 0;
    order: number;
  }[];
  area: string;
  back_image: string;
  back_length: number;
  back_width: number;
  description: string;
  new_description: string;
  gender: Gender;
  max_age_group: number;
  recruiting_count: number;
  max_recruiting_count: number;
  min_age_group: number;
  min_distance: number;
  owner_name: string;
  recruit_end_date: string;
  recruit_start_date: string;
  side_image: string;
  logo_image: string;
  side_length: number;
  side_width: number;
  thumbnail_image: string;
  title: string;
  total_point: number;
  // ad_status
  ad_status: ADStatus;
}

export interface ADUser {
  accept_status_time: string;
  birth_of_date: string;
  call_number: string;
  car_number: string;
  email: string;
  gender: Gender;
  name: string;
  brand: string;
  nickname: string;
  id: number;
  vehicle_model_name: string;
  max_recruiting_count: number;
  recruit_number: number;
}

export interface ExtendedAD extends AD {
  discriminator: typeof AD_DISCRIMINATOR;
}

export interface ExtendedADUser extends ADUser {
  discriminator: typeof AD_USER_DISCRIMINATOR;
}

export type ADAction = ActionType<typeof actions>;

export interface ADState extends CommonState<ExtendedAD> {}
