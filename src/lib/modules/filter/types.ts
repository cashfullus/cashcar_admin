import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type SelectedFilter = {
  [key: string]: any;
};

export type SetFilterPayload = {
  field: keyof FilterState;
  value: any;
};

export type FilterAction = ActionType<typeof actions>;

export type FilterState = {
  adList: SelectedFilter;
  adApply: SelectedFilter;
  allUsers: SelectedFilter;
  certified: SelectedFilter;
  driving: SelectedFilter;
  pointOverview: SelectedFilter;
  pointDonate: SelectedFilter;
  pointWithdraw: SelectedFilter;
  push: SelectedFilter;
  marketingUser: SelectedFilter;
};
