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

const initialState = {
  students: [],
  studentsRequesting: false,
  removeStudentRequesting: false,
  createStudentRequesting: false,
};

export default function students(state = initialState, action) {
  switch (action.type) {
    case LIST_STUDENTS_REQUEST:
      return {
        ...state,
        studentsRequesting: true,
        removeStudentRequesting: false,
        createStudentRequesting: false,
      };
    case LIST_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
        studentsRequesting: false,
        removeStudentRequesting: false,
        createStudentRequesting: false,
      };
    case LIST_STUDENTS_FAILURE:
      return {
        ...state,
        studentsRequesting: false,
        removeProjectRequesting: false,
        createStudentRequesting: false,
      };
    case REMOVE_STUDENTS_REQUEST:
      return {
        ...state,
        studentsRequesting: false,
        removeStudentRequesting: true,
        createStudentRequesting: false,
      };
    case REMOVE_STUDENTS_SUCCESS:
      return {
        ...state,
        studentsRequesting: true,
        removeStudentRequesting: false,
        createStudentRequesting: false,
      };
    case REMOVE_STUDENTS_FAILURE:
      return {
        ...state,
        studentsRequesting: true,
        removeStudentRequesting: false,
        createStudentRequesting: false,
      };
    case CREATE_STUDENTS_REQUEST:
      return {
        ...state,
        studentsRequesting: false,
        removeStudentRequesting: false,
        createStudentRequesting: true,
      };
    case CREATE_STUDENTS_SUCCESS:
      return {
        ...state,
        studentsRequesting: true,
        removeStudentRequesting: false,
        createStudentRequesting: false,
      };
    case CREATE_STUDENTS_FAILURE:
      return {
        ...state,
        studentsRequesting: true,
        removeStudentRequesting: false,
        createStudentRequesting: false,
      };
    default:
      return state;
  }
}
