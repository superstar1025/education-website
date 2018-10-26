import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import auth from './reducer/auth';
import ui from './reducer/ui';
import students from './reducer/students';
import admin from './reducer/admin';
import staff from './reducer/staff';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  ui,
  students,
  admin,
  staff,
});

export default rootReducer;
