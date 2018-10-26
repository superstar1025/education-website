import { put, call, takeEvery } from 'redux-saga/effects';
import {
  LIST_ADMIN_REQUEST,
  LIST_ADMIN_SUCCESS,
  LIST_ADMIN_FAILURE,
  REMOVE_ADMIN_REQUEST,
  REMOVE_ADMIN_SUCCESS,
  REMOVE_ADMIN_FAILURE,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_FAILURE,
} from '../constants';
import { api } from '../api';

const listAdminsAPI = () => api.get('users?searchTerm=userType&searchValue=Admin');
const removeAdminAPI = adminId => api.delete(`/users/${adminId}`);
const createAdminAPI = user => api.post('users', user);

function* listAdmins() {
  try {
    const response = yield call(listAdminsAPI);
    yield put({ type: LIST_ADMIN_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: LIST_ADMIN_FAILURE, payload: err });
  }
}

function* removeAdmin({ payload: { adminId } }) {
  try {
    const response = yield call(removeAdminAPI, adminId);
    yield put({ type: REMOVE_ADMIN_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: REMOVE_ADMIN_FAILURE, payload: err });
  }
}

function* createAdmin({ payload: { user } }) {
  try {
    const response = yield call(createAdminAPI, user);
    yield put({ type: CREATE_ADMIN_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: CREATE_ADMIN_FAILURE, payload: err });
  }
}

export function* adminSaga() {
  yield [
    takeEvery(LIST_ADMIN_REQUEST, listAdmins),
    takeEvery(REMOVE_ADMIN_REQUEST, removeAdmin),
    takeEvery(CREATE_ADMIN_REQUEST, createAdmin),
  ];
}
