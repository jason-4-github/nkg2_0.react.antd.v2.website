import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import admin from './admin';

const rootReducer = combineReducers({
  admin,
  routing: routerReducer,
});

export default rootReducer;
