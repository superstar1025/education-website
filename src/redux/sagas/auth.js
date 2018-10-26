import { put, call, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  CLEAR_AUTH_TOKEN_REQUEST,
  CLEAR_AUTH_TOKEN_SUCCESS,
  CLEAR_AUTH_TOKEN_FAILURE,
} from '../constants';
import { api } from '../api';


const loginAPI = user => api.post('login', user);
const signupAPI = user => api.post('signup', user);

function* loginUser({ payload: { user } }) {
  try {
    const response = yield call(loginAPI, user);
    console.log(response);
    localStorage.setItem('tokenInfo', response.data.access_token);
    yield put({ type: LOGIN_USER_SUCCESS, payload: response.data });
  } catch (err) {
    yield put({ type: LOGIN_USER_FAILURE, payload: err });
  }
}

function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(signupAPI, user);
    localStorage.setItem('tokenInfo', response.data.message);
    yield put({ type: REGISTER_USER_SUCCESS, payload: true });
  } catch (err) {
    yield put({ type: REGISTER_USER_FAILURE, payload: err });
  }
}

function* clearAuthToken() {
  try {
    localStorage.removeItem('tokenInfo');
    yield put({ type: CLEAR_AUTH_TOKEN_SUCCESS });
  } catch (err) {
    yield put({ type: CLEAR_AUTH_TOKEN_FAILURE });
  }
}

export function* authSaga() {
  yield [
    takeEvery(LOGIN_USER_REQUEST, loginUser),
    takeEvery(REGISTER_USER_REQUEST, registerUser),
    takeEvery(CLEAR_AUTH_TOKEN_REQUEST, clearAuthToken),
  ];
}
