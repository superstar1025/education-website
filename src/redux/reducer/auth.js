import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../constants';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
  registerSuccess: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, action.payload);
    case LOGIN_USER_SUCCESS:
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGIN_USER_FAILURE:
      return Object.assign({}, action.payload);
    case REGISTER_USER_REQUEST:
      return Object.assign({}, action.payload);
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerSuccess: action.payload,
      };
    case REGISTER_USER_FAILURE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
