import { createAction } from "typesafe-actions";
import { LoadingState } from "./types";

export const START_LOADING = "loading/START_LOADING";
export const FINISH_LOADING = "loading/FINISH_LOADING";

export const startLoading = createAction(START_LOADING)<keyof LoadingState>();
export const finishLoading = createAction(FINISH_LOADING)<keyof LoadingState>();
