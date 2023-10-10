import { createReducer } from "typesafe-actions";
import {
  DESELECT_USER_LIST,
  GET_ALL_USER_LIST_SUCCESS,
  GET_USER_LIST_SUCCESS,
  SELECT_USER_LIST,
  TOGGLE_USER,
} from "./actions";
import {
  ExtendedUser,
  UserAction,
  UserState,
  USER_DISCRIMINATOR,
} from "./types";

const initialState: UserState = {
  item_count: 0,
  items: [],
  selected: [],
  allUserIds: []
};

const users = createReducer<UserState, UserAction>(initialState, {
  [GET_USER_LIST_SUCCESS]: (state, { payload: { data, item_count } }) => {
    const items: ExtendedUser[] = data.map(user => ({
      discriminator: USER_DISCRIMINATOR,
      ...user,
      id: user.user_id,
    }));
    return { ...state, items, item_count, selected: [] };
  },
  [GET_ALL_USER_LIST_SUCCESS]: (state, { payload: { data } }) => {
    const items = data.map(user => user.user_id);
    console.log(items);
    return { ...state, allUserIds: items };
  },
  [TOGGLE_USER]: (state, { payload: userId }) => {
    let selected: number[];
    const user = state.selected.find(id => id === userId);
    if (user !== undefined) {
      selected = state.selected.filter(id => id !== user);
    } else {
      selected = state.selected.concat(userId);
    }
    return { ...state, selected };
  },
  [SELECT_USER_LIST]: state => {
    const selected = state.items.map(user => user.id);
    return { ...state, selected };
  },
  [DESELECT_USER_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default users;
