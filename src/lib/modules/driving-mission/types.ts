import { ActionType } from "typesafe-actions";
import { CommonState } from "../shared";
import * as actions from "./actions";

export const DRIVING_DISCRIMINATOR = "driving";

export interface Driving {
  id: number;
  appliedAt: string;
  certifiedPeriod: string;
  title: string;
  missionName: string;
  name: string;
  contact: string;
  status: "confirm" | "waiting" | "reject";
}

export interface ExtendedDriving extends Driving {
  discriminator: typeof DRIVING_DISCRIMINATOR;
}

export type DrivingAction = ActionType<typeof actions>;

export interface DrivingState extends CommonState<ExtendedDriving> {}
