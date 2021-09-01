import { createReducer } from "typesafe-actions";
import {
  DELETE_CASHCAR_TIP_SUCCESS,
  DESELECT_CASHCAR_TIP_LIST,
  EDIT_CASHCAR_TIP_SUCCESS,
  GET_CASHCAR_TIP_LIST_SUCCESS,
  REGISTER_CASHCAR_TIP_SUCCESS,
  SELECT_CASHCAR_TIP_LIST,
  TOGGLE_CASHCAR_TIP,
} from "./actions";
import {
  CashcarTipAction,
  CashcarTipState,
  ExtendedCashcarTip,
  TIP_DISCRIMINATOR,
} from "./types";

const initialState: CashcarTipState = {
  item_count: 0,
  items: [],
  selected: [],
};

const tip = createReducer<CashcarTipState, CashcarTipAction>(initialState, {
  [GET_CASHCAR_TIP_LIST_SUCCESS]: (
    state,
    { payload: { data, item_count } }
  ) => {
    const items: ExtendedCashcarTip[] = data.map(item => ({
      discriminator: TIP_DISCRIMINATOR,
      ...item,
      id: item.cash_car_tip_id,
    }));
    return { ...state, items, item_count };
  },
  [REGISTER_CASHCAR_TIP_SUCCESS]: (state, { payload: { data } }) => {
    const item: ExtendedCashcarTip = {
      discriminator: TIP_DISCRIMINATOR,
      ...data,
      id: data.cash_car_tip_id,
    };
    const items = [item, ...state.items];
    return { ...state, items };
  },
  [EDIT_CASHCAR_TIP_SUCCESS]: (state, { payload: { data } }) => {
    const items: ExtendedCashcarTip[] = state.items.map(item =>
      item.id === data.cash_car_tip_id
        ? { ...data, id: data.cash_car_tip_id }
        : item
    );
    return { ...state, items };
  },
  [DELETE_CASHCAR_TIP_SUCCESS]: (state, { payload }) => {
    const items = state.items.filter(item => item.id !== payload);
    return { ...state, items };
  },
  [TOGGLE_CASHCAR_TIP]: (state, { payload: cashcarTipId }) => {
    let selected: number[];
    const cashcarTip = state.selected.find(id => id === cashcarTipId);
    if (cashcarTip !== undefined) {
      selected = state.selected.filter(id => id !== cashcarTip);
    } else {
      selected = state.selected.concat(cashcarTipId);
    }
    return { ...state, selected };
  },
  [SELECT_CASHCAR_TIP_LIST]: state => {
    const selected = state.items.map(cashcarTip => cashcarTip.id);
    return { ...state, selected };
  },
  [DESELECT_CASHCAR_TIP_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default tip;
