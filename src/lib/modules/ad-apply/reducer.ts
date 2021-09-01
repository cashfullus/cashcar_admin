import { createReducer } from "typesafe-actions";
import {
  DESELECT_AD_APPLY_LIST,
  GET_AD_APPLY_LIST_SUCCESS,
  POST_AD_APPLY_SUCCESS,
  SELECT_AD_APPLY_LIST,
  TOGGLE_AD_APPLY,
} from "./actions";
import {
  ADApplyAction,
  ADApplyState,
  AD_APPLY_DISCRIMINATOR,
  ExtendedADApply,
} from "./types";

const initialState: ADApplyState = {
  item_count: 0,
  items: [],
  selected: [],
};

const adApply = createReducer<ADApplyState, ADApplyAction>(initialState, {
  [GET_AD_APPLY_LIST_SUCCESS]: (state, { payload: { data, item_count } }) => {
    const items: ExtendedADApply[] = data.map(
      ({ ad_user_apply_id, ...item }) => ({
        discriminator: AD_APPLY_DISCRIMINATOR,
        ...item,
        id: ad_user_apply_id,
        recruit_number: item.status === "reject" ? "X" : item.recruit_number,
      })
    );
    return { ...state, items, item_count, selected: [] };
  },
  [POST_AD_APPLY_SUCCESS]: (state, { payload: { status } }) => {
    const items = state.items.map(item =>
      state.selected.includes(item.id) ? { ...item, status } : item
    );
    return { ...state, items, selected: [] };
  },
  [TOGGLE_AD_APPLY]: (state, { payload: adApplyId }) => {
    let selected: number[];
    const adApply = state.selected.find(id => id === adApplyId);
    if (adApply) {
      selected = state.selected.filter(id => id !== adApply);
    } else {
      selected = state.selected.concat(adApplyId);
    }
    return { ...state, selected };
  },
  [SELECT_AD_APPLY_LIST]: state => {
    const selected = state.items.map(adApply => adApply.id);
    return { ...state, selected };
  },
  [DESELECT_AD_APPLY_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default adApply;
