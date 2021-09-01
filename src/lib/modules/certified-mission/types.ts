import { ActionType } from 'typesafe-actions';
import { MissionStatus } from '../commonType';
import { CommonState } from '../shared';
import * as actions from './actions';

export const CERTIFIED_DISCRIMINATOR = 'certified';

export interface SubMission {
  back_image: string;
  instrument_panel: string;
  mission_name: string;
  mission_type: 0 | 1;
  side_image: string;
  status: MissionStatus;
  latitude: number;
  longitude: number;
  travelled_distance: number;
}
export interface Certified {
  id: string;
  ad_user_apply_id: number;
  mission_card_id: number;
  order: number;
  mission_history: {
    reason: string;
    register_time: string;
  }[];
  latitude: number;
  longitude: number;
  back_image: string;
  call_number: string;
  instrument_panel: string;
  mission_end_date: string;
  mission_name: string;
  mission_type: 0 | 1;
  name: string;
  email: string;
  car_number: string;
  register_time: string;
  side_image: string;
  status: MissionStatus;
  title: string;
  travelled_distance: number;
}

export interface ExtendedCertified extends Certified {
  discriminator: typeof CERTIFIED_DISCRIMINATOR;
  mission_list: SubMission[];
}

export type CertifiedAction = ActionType<typeof actions>;

export interface CertifiedState extends Omit<CommonState<ExtendedCertified>, 'selected'> {
  selected: string[];
}
