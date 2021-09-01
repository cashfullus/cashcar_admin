import { createAsyncAction } from "typesafe-actions";

export const INITIALIZATION_REQUEST = "shared/INITIALIZATION_REQUEST";
export const INITIALIZATION_SUCCESS = "shared/INITIALIZATION_SUCCESS";
export const INITIALIZATION_FAILURE = "shared/INITIALIZATION_FAILURE";

export const initializationAsync = createAsyncAction(
  INITIALIZATION_REQUEST,
  INITIALIZATION_SUCCESS,
  INITIALIZATION_FAILURE
)<undefined, undefined, string>();
