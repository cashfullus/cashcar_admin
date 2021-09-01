import { createReducer } from 'typesafe-actions';
import { CLEAR_FILTER, SET_FILTER } from './actions';
import { FilterAction, FilterState } from './types';

const initialState: FilterState = {
  adList: {},
  adApply: {},
  allUsers: {},
  certified: {},
  driving: {},
  pointOverview: {},
  pointDonate: {},
  pointWithdraw: {},
  push: {},
};

const filter = createReducer<FilterState, FilterAction>(initialState, {
  [SET_FILTER]: (state, { payload }) => {
    const { field, value } = payload;
    return { ...state, [field]: value };
  },
  [CLEAR_FILTER]: () => initialState,
});

export default filter;
