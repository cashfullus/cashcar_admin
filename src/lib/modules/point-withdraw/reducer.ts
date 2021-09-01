import { createReducer } from 'typesafe-actions';
import {
  DESELECT_WITHDRAW_LIST,
  GET_WITHDRAW_LIST_SUCCESS,
  POST_WITHDRAW_LIST_SUCCESS,
  SELECT_WITHDRAW_LIST,
  TOGGLE_WITHDRAW,
} from './actions';
import { ExtendedWithdraw, WithdrawAction, WithdrawState, POINT_WITHDRAW_DISCRIMINATOR } from './types';

const initialState: WithdrawState = {
  item_count: 0,
  items: [],
  selected: [],
};

const withdraw = createReducer<WithdrawState, WithdrawAction>(initialState, {
  [GET_WITHDRAW_LIST_SUCCESS]: (state, { payload: { data, item_count } }) => {
    const items: ExtendedWithdraw[] = data.map(withdraw => {
      return {
        discriminator: POINT_WITHDRAW_DISCRIMINATOR,
        ...withdraw,
        id: withdraw.withdrawal_self_id,
      };
    });
    return { ...state, items, item_count, selected: [] };
  },
  [POST_WITHDRAW_LIST_SUCCESS]: (state, { payload: { data, withdrawal_list } }) => {
    const items: ExtendedWithdraw[] = state.items.map(item =>
      withdrawal_list.includes(item.id) ? { ...item, status: data } : item,
    );
    return { ...state, items, selected: [] };
  },
  [TOGGLE_WITHDRAW]: (state, { payload: withdrawId }) => {
    let selected: number[];
    const withdraw = state.selected.find(id => id === withdrawId);
    if (withdraw !== undefined) {
      selected = state.selected.filter(id => id !== withdraw);
    } else {
      selected = state.selected.concat(withdrawId);
    }
    return { ...state, selected };
  },
  [SELECT_WITHDRAW_LIST]: state => {
    const selected = state.items.map(withdraw => withdraw.id);
    return { ...state, selected };
  },
  [DESELECT_WITHDRAW_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default withdraw;
