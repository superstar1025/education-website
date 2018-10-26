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

const initialState = {
  staffs: [],
  staffsRequesting: false,
  removeStaffRequesting: false,
  createStaffRequesting: false,
};

export default function staff(state = initialState, action) {
  switch (action.type) {
    case LIST_STAFF_REQUEST:
      return {
        ...state,
        staffsRequesting: true,
        removeStaffRequesting: false,
        createStaffRequesting: false,
      };
    case LIST_STAFF_SUCCESS:
      return {
        ...state,
        staffs: action.payload,
        staffsRequesting: false,
        removeStaffRequesting: false,
        createStaffRequesting: false,
      };
    case LIST_STAFF_FAILURE:
      return {
        ...state,
        staffsRequesting: false,
        removeProjectRequesting: false,
        createStaffRequesting: false,
      };
    case REMOVE_STAFF_REQUEST:
      return {
        ...state,
        staffsRequesting: false,
        removeStaffRequesting: true,
        createStaffRequesting: false,
      };
    case REMOVE_STAFF_SUCCESS:
      return {
        ...state,
        staffsRequesting: true,
        removeStaffRequesting: false,
        createStaffRequesting: false,
      };
    case REMOVE_STAFF_FAILURE:
      return {
        ...state,
        staffsRequesting: true,
        removeStaffRequesting: false,
        createStaffRequesting: false,
      };
    case CREATE_STAFF_REQUEST:
      return {
        ...state,
        staffsRequesting: false,
        removeStaffRequesting: false,
        createStaffRequesting: true,
      };
    case CREATE_STAFF_SUCCESS:
      return {
        ...state,
        staffsRequesting: true,
        removeStaffRequesting: false,
        createStaffRequesting: false,
      };
    case CREATE_STAFF_FAILURE:
      return {
        ...state,
        staffsRequesting: true,
        removeStaffRequesting: false,
        createStaffRequesting: false,
      };
    default:
      return state;
  }
}
