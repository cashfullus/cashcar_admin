import { createReducer } from 'typesafe-actions';
import {
  DESELECT_POINT_LIST,
  GET_POINT_LIST_SUCCESS,
  POST_POINT_LIST_SUCCESS,
  POST_POINT_SUCCESS,
  SELECT_POINT_LIST,
  TOGGLE_POINT,
} from './actions';
import { ExtendedPoint, PointAction, PointState, POINT_DISCRIMINATOR } from './types';

const initialState: PointState = {
  item_count: 0,
  items: [],
  selected: [],
};

const point = createReducer<PointState, PointAction>(initialState, {
  [GET_POINT_LIST_SUCCESS]: (state, { payload: { data, item_count } }) => {
    const items: ExtendedPoint[] = data.map(point => {
      return {
        discriminator: POINT_DISCRIMINATOR,
        ...point,
        id: point.user_id,
      };
    });
    return { ...state, items, item_count, selected: [] };
  },
  [POST_POINT_SUCCESS]: (state, { payload: { user_id, data } }) => {
    const items = state.items.map(user =>
      user.id === user_id ? { ...user, point_history: [data, ...user.point_history], deposit: data.point + user.deposit } : user,
    );
    return { ...state, items };
  },
  [POST_POINT_LIST_SUCCESS]: (state, { payload: { user_list, data } }) => {
    const items = state.items.map(user =>
      user_list.includes(user.id)
        ? { ...user, point_history: [data, ...user.point_history], deposit: data.point + user.deposit }
        : user,
    );
    return { ...state, items, selected: [] };
  },
  [TOGGLE_POINT]: (state, { payload: pointId }) => {
    let selected: number[];
    const donate = state.selected.find(id => id === pointId);
    if (donate !== undefined) {
      selected = state.selected.filter(id => id !== donate);
    } else {
      selected = state.selected.concat(pointId);
    }
    return { ...state, selected };
  },
  [SELECT_POINT_LIST]: state => {
    const selected = state.items.map(point => point.id);
    return { ...state, selected };
  },
  [DESELECT_POINT_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default point;
