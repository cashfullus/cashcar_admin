import { createReducer } from 'typesafe-actions';
import { DESELECT_AD_LIST, GET_AD_LIST_SUCCESS, POST_AD_SUCCESS, SELECT_AD_LIST, TOGGLE_AD } from './actions';
import { ADAction, ADState, AD_DISCRIMINATOR, ExtendedAD } from './types';

const initialState: ADState = {
  item_count: 0,
  items: [],
  selected: [],
};

const ad = createReducer<ADState, ADAction>(initialState, {
  [GET_AD_LIST_SUCCESS]: (state, { payload: { item_count, data } }) => {
    const items: ExtendedAD[] = data.map(ad => {
      const recruit_start_date = ad.recruit_start_date.split(' ')[0];
      const recruit_end_date = ad.recruit_end_date.split(' ')[0];
      return {
        discriminator: AD_DISCRIMINATOR,
        ...ad,
        id: ad.ad_id,
        recruit_start_date,
        recruit_end_date,
      };
    });
    return { ...state, item_count, items, selected: [] };
  },
  [POST_AD_SUCCESS]: (state, { payload }) => {
    const { usage, data } = payload;
    let items: ExtendedAD[];
    const newAD: ExtendedAD = {
      discriminator: AD_DISCRIMINATOR,
      ...data.registered,
      id: data.registered.ad_id,
    };
    if (usage === 'register') {
      items = [...state.items, newAD];
    } else {
      items = state.items.map(ad => (ad.id === newAD.id ? newAD : ad));
    }
    return { ...state, items };
  },
  [TOGGLE_AD]: (state, { payload: adId }) => {
    let selected: number[];
    const ad = state.selected.find(id => id === adId);
    if (ad !== undefined) {
      selected = state.selected.filter(id => id !== ad);
    } else {
      selected = state.selected.concat(adId);
    }
    return { ...state, selected };
  },
  [SELECT_AD_LIST]: state => {
    const selected = state.items.map(ad => ad.id);
    return { ...state, selected };
  },
  [DESELECT_AD_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default ad;
