import { createReducer } from 'typesafe-actions';
import {
  DESELECT_DONATE_LIST,
  GET_DONATE_LIST_SUCCESS,
  POST_DONATE_LIST_SUCCESS,
  SELECT_DONATE_LIST,
  TOGGLE_DONATE,
} from './actions';
import { ExtendedDonate, DonateAction, DonateState, POINT_DONATE_DISCRIMINATOR } from './types';

const initialState: DonateState = {
  item_count: 0,
  items: [],
  selected: [],
};

const donate = createReducer<DonateState, DonateAction>(initialState, {
  [GET_DONATE_LIST_SUCCESS]: (state, { payload: { data, item_count } }) => {
    const items: ExtendedDonate[] = data.map(donate => {
      return {
        discriminator: POINT_DONATE_DISCRIMINATOR,
        ...donate,
        id: donate.withdrawal_donate_id,
      };
    });
    return { ...state, items, item_count, selected: [] };
  },
  [POST_DONATE_LIST_SUCCESS]: (state, { payload: { data, withdrawal_donate_list } }) => {
    const items: ExtendedDonate[] = state.items.map(item =>
      withdrawal_donate_list.includes(item.id) ? { ...item, status: data } : item,
    );
    return { ...state, items, selected: [] };
  },
  [TOGGLE_DONATE]: (state, { payload: donateId }) => {
    let selected: number[];
    const donate = state.selected.find(id => id === donateId);
    if (donate !== undefined) {
      selected = state.selected.filter(id => id !== donate);
    } else {
      selected = state.selected.concat(donateId);
    }
    return { ...state, selected };
  },
  [SELECT_DONATE_LIST]: state => {
    const selected = state.items.map(donate => donate.id);
    return { ...state, selected };
  },
  [DESELECT_DONATE_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default donate;
