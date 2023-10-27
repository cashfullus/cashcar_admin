import { ActionType } from 'typesafe-actions';
import { PointStatus } from '../commonType';
import { CommonState } from '../shared';
import * as actions from './actions';

export const POINT_WITHDRAW_DISCRIMINATOR = 'point_withdraw';

export interface Withdraw {
  account_bank: string;
  account_number: string;
  amount: number;
  change_done: string;
  name: string;
  email: string;
  call_number: string;
  register_time: string;
  status: PointStatus;
  user_id: number;
  id: number;
}

export interface ExtendedWithdraw extends Withdraw {
  discriminator: typeof POINT_WITHDRAW_DISCRIMINATOR;
}

export type WithdrawAction = ActionType<typeof actions>;

export interface WithdrawState extends CommonState<ExtendedWithdraw> {}
