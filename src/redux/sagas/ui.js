import { put, takeEvery } from 'redux-saga/effects';
import {
  SET_SIDEBAR_ITEM_REQUEST,
  SET_SIDEBAR_ITEM_SUCCESS,
  SET_SIDEBAR_ITEM_FAILURE,
} from '../constants';

function* setSidebarItems({ payload: { items } }) {
  try {
    yield put({ type: SET_SIDEBAR_ITEM_SUCCESS, payload: items });
  } catch (err) {
    yield put({ type: SET_SIDEBAR_ITEM_FAILURE, payload: err });
  }
}

export function* uiSaga() {
  yield [
    takeEvery(SET_SIDEBAR_ITEM_REQUEST, setSidebarItems),
  ];
}
