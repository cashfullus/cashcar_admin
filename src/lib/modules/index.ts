import { combineReducers } from 'redux';
import { all } from '@redux-saga/core/effects';
import ad, { adSaga } from './ad';
import users, { userSaga } from './users';
import adApply, { adApplySaga } from './ad-apply';
import certified, { certifiedSaga } from './certified-mission';
import driving from './driving-mission';
import donate, { donateSaga } from './point-donate';
import withdraw, { withdrawSaga } from './point-withdraw';
import loading from './loading';
import auth, { authSaga } from './auth';
import notice, { noticeSaga } from './notice';
import filter from './filter';
import messages from './messages';
import push, { pushSaga } from './push';
import point, { pointSaga } from './point-overview';
import { sharedSaga } from './shared';
import tip, { tipSaga } from './tip';

const rootReducer = combineReducers({
  ad,
  users,
  adApply,
  certified,
  driving,
  donate,
  withdraw,
  loading,
  auth,
  filter,
  notice,
  messages,
  tip,
  push,
  point,
});

export function* rootSaga() {
  yield all([
    adSaga(),
    authSaga(),
    tipSaga(),
    sharedSaga(),
    userSaga(),
    adApplySaga(),
    certifiedSaga(),
    donateSaga(),
    withdrawSaga(),
    noticeSaga(),
    pushSaga(),
    pointSaga(),
  ]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
