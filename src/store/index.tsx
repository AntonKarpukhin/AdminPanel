import {configureStore} from "@reduxjs/toolkit";

import filtersSlice from "../reducers/filters.Slice";
import {StoreType} from "../reducers/reducers.props";
import employeesSlice from "../reducers/employees.Slice";




const store = configureStore<StoreType>({
	reducer: {employeesSlice, filtersSlice},
	// @ts-ignore
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production',

})


export default store;