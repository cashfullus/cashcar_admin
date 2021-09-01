import { createReducer } from 'typesafe-actions';
import { DESELECT_APP_PUSH_LIST, GET_APP_PUSH_LIST_SUCCESS, SELECT_APP_PUSH_LIST, TOGGLE_APP_PUSH } from './actions';
import { AppPushAction, AppPushState, APP_PUSH_DISCRIMINATOR, ExtendedAppPush } from './types';

const initialState: AppPushState = {
  item_count: 0,
  items: [],
  userList: [],
  selected: [],
};

const push = createReducer<AppPushState, AppPushAction>(initialState, {
  [GET_APP_PUSH_LIST_SUCCESS]: (state, { payload: { data, item_count } }) => {
    const items: ExtendedAppPush[] = data.map(appPush => {
      return {
        discriminator: APP_PUSH_DISCRIMINATOR,
        ...appPush,
      };
    });
    return { ...state, items, item_count, selected: [] };
  },
  [TOGGLE_APP_PUSH]: (state, { payload: appPushId }) => {
    let selected: number[];
    const appPush = state.selected.find(id => id === appPushId);
    if (appPush !== undefined) {
      selected = state.selected.filter(id => id !== appPush);
    } else {
      selected = state.selected.concat(appPushId);
    }
    return { ...state, selected };
  },
  [SELECT_APP_PUSH_LIST]: state => {
    const selected = state.items.map(appPush => appPush.id);
    return { ...state, selected };
  },
  [DESELECT_APP_PUSH_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default push;
