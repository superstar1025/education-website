import { put, call, takeEvery } from 'redux-saga/effects';
import {
  LIST_STAFF_REQUEST,
  LIST_STAFF_SUCCESS,
  LIST_STAFF_FAILURE,
  REMOVE_STAFF_REQUEST,
  REMOVE_STAFF_SUCCESS,
  REMOVE_STAFF_FAILURE,
  CREATE_STAFF_REQUEST,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILURE,
} from '../constants';
import { api } from '../api';

const listStaffsAPI = () => api.get('users?searchTerm=userType&searchValue=Staff');
const removeStaffAPI = staffId => api.delete(`/users/${staffId}`);
const createStaffAPI = user => api.post('users', user);

function* listStaffs() {
  try {
    const response = yield call(listStaffsAPI);
    yield put({ type: LIST_STAFF_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: LIST_STAFF_FAILURE, payload: err });
  }
}

function* removeStaff({ payload: { staffId } }) {
  try {
    const response = yield call(removeStaffAPI, staffId);
    yield put({ type: REMOVE_STAFF_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: REMOVE_STAFF_FAILURE, payload: err });
  }
}

function* createStaff({ payload: { user } }) {
  try {
    const response = yield call(createStaffAPI, user);
    yield put({ type: CREATE_STAFF_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: CREATE_STAFF_FAILURE, payload: err });
  }
}

export function* staffSaga() {
  yield [
    takeEvery(LIST_STAFF_REQUEST, listStaffs),
    takeEvery(REMOVE_STAFF_REQUEST, removeStaff),
    takeEvery(CREATE_STAFF_REQUEST, createStaff),
  ];
}
