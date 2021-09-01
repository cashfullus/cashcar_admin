import { createReducer } from 'typesafe-actions';
import { CLEAR_MESSAGE, SET_MESSAGE } from './actions';
import { MessageAction, MessageState } from './types';

type PartialState = Partial<MessageState>;

const initialState: PartialState = {};

const error = createReducer<PartialState, MessageAction>(initialState, {
  [SET_MESSAGE]: (state, { payload: { key, ...message } }) => {
    return { ...state, [key]: message };
  },
  [CLEAR_MESSAGE]: (state, { payload: key }) => {
    const copiedState = { ...state };
    delete copiedState[key];
    return copiedState;
  },
});

export default error;
