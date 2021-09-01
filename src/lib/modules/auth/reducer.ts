import { createReducer } from "typesafe-actions";
import { LOGIN_SUCCESS, LOGOUT, SET_IS_LOGGED_IN } from "./actions";
import { AuthAction, AuthState } from "./types";

const initialState: AuthState = {
  isLoggedIn: false,
};

const auth = createReducer<AuthState, AuthAction>(initialState, {
  [SET_IS_LOGGED_IN]: (state, { payload }) => ({
    ...state,
    isLoggedIn: payload,
  }),
  [LOGIN_SUCCESS]: state => ({ ...state, isLoggedIn: true }),
  [LOGOUT]: state => ({ ...state, isLoggedIn: false }),
});

export default auth;
