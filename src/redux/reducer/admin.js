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

const initialState = {
  admins: [],
  adminsRequesting: false,
  removeAdminRequesting: false,
  createAdminRequesting: false,
};

export default function admin(state = initialState, action) {
  switch (action.type) {
    case LIST_ADMIN_REQUEST:
      return {
        ...state,
        adminsRequesting: true,
        removeAdminRequesting: false,
        createAdminRequesting: false,
      };
    case LIST_ADMIN_SUCCESS:
      return {
        ...state,
        admins: action.payload,
        adminsRequesting: false,
        removeAdminRequesting: false,
        createAdminRequesting: false,
      };
    case LIST_ADMIN_FAILURE:
      return {
        ...state,
        adminsRequesting: false,
        removeProjectRequesting: false,
        createAdminRequesting: false,
      };
    case REMOVE_ADMIN_REQUEST:
      return {
        ...state,
        adminsRequesting: false,
        removeAdminRequesting: true,
        createAdminRequesting: false,
      };
    case REMOVE_ADMIN_SUCCESS:
      return {
        ...state,
        adminsRequesting: true,
        removeAdminRequesting: false,
        createAdminRequesting: false,
      };
    case REMOVE_ADMIN_FAILURE:
      return {
        ...state,
        adminsRequesting: true,
        removeAdminRequesting: false,
        createAdminRequesting: false,
      };
    case CREATE_ADMIN_REQUEST:
      return {
        ...state,
        adminsRequesting: false,
        removeAdminRequesting: false,
        createAdminRequesting: true,
      };
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        adminsRequesting: true,
        removeAdminRequesting: false,
        createAdminRequesting: false,
      };
    case CREATE_ADMIN_FAILURE:
      return {
        ...state,
        adminsRequesting: true,
        removeAdminRequesting: false,
        createAdminRequesting: false,
      };
    default:
      return state;
  }
}
