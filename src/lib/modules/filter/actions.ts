import { createAction } from "typesafe-actions";
import { SetFilterPayload } from "./types";

export const SET_FILTER = "filter/SET_FILTER";
export const CLEAR_FILTER = "filter/CLEAR_FILTER";

export const setFilter = createAction(SET_FILTER)<SetFilterPayload>();
export const clearFilter = createAction(CLEAR_FILTER)();
