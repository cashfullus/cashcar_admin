import { ActionType } from "typesafe-actions";
import { ADApplyStatus } from "../commonType";
import { CommonState } from "../shared";
import * as actions from "./actions";

export const AD_APPLY_DISCRIMINATOR = "ad-apply";

export interface ADApply {
  accept_status_time: string;
  id: number;
  email: string;
  detail_address: string;
  main_address: string;
  max_recruiting_count: number;
  name: string;
  owner_name: string;
  recruit_number: number | string;
  register_time: string;
  status: ADApplyStatus;
  title: string;
  user_id: number;
  call_number: string;
}

export interface ExtendedADApply extends ADApply {
  discriminator: typeof AD_APPLY_DISCRIMINATOR;
}

export type ADApplyAction = ActionType<typeof actions>;

export interface ADApplyState extends CommonState<ExtendedADApply> {}
