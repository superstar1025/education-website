import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { uiSaga } from './ui';
import { studentsSaga } from './students';
import { adminSaga } from './admin';
import { staffSaga } from './staff';

export default function* rootSaga() {
  yield all([
    authSaga(),
    uiSaga(),
    studentsSaga(),
    adminSaga(),
    staffSaga(),
  ]);
}
