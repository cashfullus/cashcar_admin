import { ActionType } from 'typesafe-actions';
import { CommonState } from '../shared';
import * as actions from './actions';

export const POINT_DISCRIMINATOR = 'point';

export interface Point {
  id: number;
  call_number: string;
  deposit: number;
  email: string;
  name: string;
  nickname: string;
  point_history: {
    contents: string;
    point: number;
    register_time: string;
  }[];
}

export interface ExtendedPoint extends Point {
  discriminator: typeof POINT_DISCRIMINATOR;
}

export type PointAction = ActionType<typeof actions>;

export interface PointState extends CommonState<ExtendedPoint> {}
