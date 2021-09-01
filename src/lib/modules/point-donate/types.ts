import { ActionType } from 'typesafe-actions';
import { DonateStatus } from '../commonType';
import { CommonState } from '../shared';
import * as actions from './actions';

export const POINT_DONATE_DISCRIMINATOR = 'point_donate';

export interface Donate {
  amount: number;
  change_done: string;
  donation_organization: string;
  name: string;
  name_of_donor: string;
  receipt: number;
  call_number: number;
  register_time: string;
  status: DonateStatus;
  user_id: number;
  id: number;
}

export interface ExtendedDonate extends Donate {
  discriminator: typeof POINT_DONATE_DISCRIMINATOR;
}

export type DonateAction = ActionType<typeof actions>;

export interface DonateState extends CommonState<ExtendedDonate> {}
