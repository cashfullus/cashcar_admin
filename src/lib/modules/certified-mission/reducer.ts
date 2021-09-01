import { createReducer } from 'typesafe-actions';
import {
  DESELECT_CERTIFIED_LIST,
  GET_ALL_MISSION_LIST_SUCCESS,
  GET_CERTIFIED_LIST_SUCCESS,
  POST_MISSION_APPLY_SUCCESS,
  SELECT_CERTIFIED_LIST,
  TOGGLE_CERTIFIED,
} from './actions';
import { CertifiedAction, CertifiedState, CERTIFIED_DISCRIMINATOR, ExtendedCertified } from './types';

const initialState: CertifiedState = {
  item_count: 0,
  items: [],
  selected: [],
};

const certified = createReducer<CertifiedState, CertifiedAction>(initialState, {
  [GET_CERTIFIED_LIST_SUCCESS]: (state, { payload: { data, item_count } }) => {
    const items: ExtendedCertified[] = data.map(certified => ({
      discriminator: CERTIFIED_DISCRIMINATOR,
      ...certified,
      id: `${certified.ad_user_apply_id}-${certified.mission_card_id}`,
      mission_list: [],
    }));
    return { ...state, items, item_count, selected: [] };
  },
  [POST_MISSION_APPLY_SUCCESS]: (state, { payload }) => {
    const { ad_user_apply_id, mission_card_id, status } = payload;
    const items = state.items.map(item => {
      const [adUserApplyId, missionCardId] = item.id.split('-').map(i => +i);
      return adUserApplyId === ad_user_apply_id && missionCardId === mission_card_id ? { ...item, status } : item;
    });
    return { ...state, items };
  },
  [GET_ALL_MISSION_LIST_SUCCESS]: (state, { payload }) => {
    const { ad_user_apply_id, mission_card_id, data } = payload;
    const items = state.items.map(item => {
      const [adUserApplyId, missionCardId] = item.id.split('-').map(i => +i);
      return adUserApplyId === ad_user_apply_id && missionCardId === mission_card_id ? { ...item, mission_list: data } : item;
    });
    return { ...state, items };
  },
  [TOGGLE_CERTIFIED]: (state, { payload: certifiedId }) => {
    let selected: string[];
    const certified = state.selected.find(id => id === certifiedId);
    if (certified !== undefined) {
      selected = state.selected.filter(id => id !== certified);
    } else {
      selected = state.selected.concat(certifiedId);
    }
    return { ...state, selected };
  },
  [SELECT_CERTIFIED_LIST]: state => {
    const selected = state.items.map(certified => certified.id);
    return { ...state, selected };
  },
  [DESELECT_CERTIFIED_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default certified;
