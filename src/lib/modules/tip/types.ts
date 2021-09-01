import { ActionType } from "typesafe-actions";
import { CommonState } from "../shared";
import * as actions from "./actions";

export const TIP_DISCRIMINATOR = "tip";

export interface CashcarTip {
  id: number;
  image_information: {
    image: string;
  }[];
  main_description: string;
  register_time: string;
  thumbnail_image: string;
  title: string;
}

export interface ExtendedCashcarTip extends CashcarTip {
  discriminator: typeof TIP_DISCRIMINATOR;
}

export type CashcarTipAction = ActionType<typeof actions>;

export interface CashcarTipState extends CommonState<ExtendedCashcarTip> {}
