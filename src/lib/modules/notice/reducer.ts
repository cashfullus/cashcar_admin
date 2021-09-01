import { createReducer } from "typesafe-actions";
import {
  DELETE_NOTICE_SUCCESS,
  DESELECT_NOTICE_LIST,
  EDIT_NOTICE_SUCCESS,
  GET_NOTICE_LIST_SUCCESS,
  REGISTER_NOTICE_SUCCESS,
  SELECT_NOTICE_LIST,
  TOGGLE_NOTICE,
} from "./actions";
import {
  ExtendedNotice,
  NoticeAction,
  NoticeState,
  NOTICE_DISCRIMINATOR,
} from "./types";

const initialState: NoticeState = {
  item_count: 0,
  items: [],
  selected: [],
};

const notice = createReducer<NoticeState, NoticeAction>(initialState, {
  [GET_NOTICE_LIST_SUCCESS]: (state, { payload: { data, item_count } }) => {
    const items: ExtendedNotice[] = data.map(notice => {
      return {
        discriminator: NOTICE_DISCRIMINATOR,
        ...notice,
        id: notice.notice_id,
      };
    });
    return { ...state, items, item_count, selected: [] };
  },
  [REGISTER_NOTICE_SUCCESS]: (state, { payload: { data } }) => {
    const item: ExtendedNotice = {
      discriminator: NOTICE_DISCRIMINATOR,
      ...data,
      id: data.notice_id,
    };
    const items = [item, ...state.items];
    return { ...state, items };
  },
  [EDIT_NOTICE_SUCCESS]: (state, { payload: { data } }) => {
    const { notice_id } = data;
    const items = state.items.map(item =>
      item.id === notice_id ? { ...item, ...data } : item
    );
    return { ...state, items };
  },
  [DELETE_NOTICE_SUCCESS]: (state, { payload: noticeId }) => {
    const items = state.items.filter(item => item.id !== noticeId);
    return { ...state, items };
  },
  [TOGGLE_NOTICE]: (state, { payload: noticeId }) => {
    let selected: number[];
    const notice = state.selected.find(id => id === noticeId);
    if (notice !== undefined) {
      selected = state.selected.filter(id => id !== notice);
    } else {
      selected = state.selected.concat(noticeId);
    }
    return { ...state, selected };
  },
  [SELECT_NOTICE_LIST]: state => {
    const selected = state.items.map(notice => notice.id);
    return { ...state, selected };
  },
  [DESELECT_NOTICE_LIST]: state => {
    return { ...state, selected: [] };
  },
});

export default notice;
