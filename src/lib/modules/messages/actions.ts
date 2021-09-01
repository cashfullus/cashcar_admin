import { createAction } from 'typesafe-actions';
import { ClearMessagePayload, SetMessagePayload } from './types';

export const SET_MESSAGE = 'messages/SET_MESSAGE';
export const CLEAR_MESSAGE = 'messages/CLEAR_MESSAGE';

export const setMessageAction = createAction(SET_MESSAGE)<SetMessagePayload>();
export const clearMessageAction = createAction(CLEAR_MESSAGE)<ClearMessagePayload>();
