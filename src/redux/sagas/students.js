import { put, call, takeEvery } from 'redux-saga/effects';
import {
  LIST_STUDENTS_REQUEST,
  LIST_STUDENTS_SUCCESS,
  LIST_STUDENTS_FAILURE,
  REMOVE_STUDENTS_REQUEST,
  REMOVE_STUDENTS_SUCCESS,
  REMOVE_STUDENTS_FAILURE,
  CREATE_STUDENTS_REQUEST,
  CREATE_STUDENTS_SUCCESS,
  CREATE_STUDENTS_FAILURE,
} from '../constants';
import { api } from '../api';

const listStudentsAPI = () => api.get('users?searchTerm=userType&searchValue=Student');
const removeStudentAPI = studentId => api.delete(`/users/${studentId}`);
const createStudentAPI = user => api.post('users', user);

function* listStudents() {
  try {
    const response = yield call(listStudentsAPI);
    console.log('response', response);
    yield put({ type: LIST_STUDENTS_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: LIST_STUDENTS_FAILURE, payload: err });
  }
}

function* removeStudent({ payload: { studentId } }) {
  try {
    const response = yield call(removeStudentAPI, studentId);
    yield put({ type: REMOVE_STUDENTS_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: REMOVE_STUDENTS_FAILURE, payload: err });
  }
}

function* createStudent({ payload: { user } }) {
  try {
    const response = yield call(createStudentAPI, user);
    yield put({ type: CREATE_STUDENTS_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: CREATE_STUDENTS_FAILURE, payload: err });
  }
}

export function* studentsSaga() {
  yield [
    takeEvery(LIST_STUDENTS_REQUEST, listStudents),
    takeEvery(REMOVE_STUDENTS_REQUEST, removeStudent),
    takeEvery(CREATE_STUDENTS_REQUEST, createStudent),
  ];
}
