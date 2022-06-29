import {legacy_createStore as createStore, combineReducers} from 'redux';

import filters from "../reducers/filters";
import employees from "../reducers/employees";


const store = createStore( combineReducers({employees, filters}))

export default store;