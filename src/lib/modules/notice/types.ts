import { ActionType } from "typesafe-actions";
import { CommonState } from "../shared";
import * as actions from "./actions";

export const NOTICE_DISCRIMINATOR = "notice";

export interface Notice {
  description: string;
  id: number;
  register_time: string;
  title: string;
}

export interface ExtendedNotice extends Notice {
  discriminator: typeof NOTICE_DISCRIMINATOR;
}

export type NoticeAction = ActionType<typeof actions>;

export interface NoticeState extends CommonState<ExtendedNotice> {}
