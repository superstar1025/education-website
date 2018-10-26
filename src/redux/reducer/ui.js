import {
  SET_SIDEBAR_ITEM_SUCCESS,
  SET_SIDEBAR_ITEM_FAILURE,
} from '../constants';

const initialState = {
  sidebarItems: [],
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_ITEM_SUCCESS:
      return {
        ...state,
        sidebarItems: action.payload,
      };
    case SET_SIDEBAR_ITEM_FAILURE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
