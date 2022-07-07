import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {IStoreEmployees} from "./reducers.props";
import {HttpHooks} from "../hooks/http.hooks";
import {Employees} from "../components/AdminEmployees/AdminEmployeesProps";

const initialState: IStoreEmployees = {
	employees: [],
	employeesLoadingStatus: 'idle'
}

export const fetchEmployees = createAsyncThunk(
	'employees/fetchEmployees',
	async () => {
		const {request} = HttpHooks();
		return await request<Employees[]>("http://localhost:3010/employees")
	}
);

const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		employeesCreated: (state, action) => {
				state.employees.push(action.payload)
			},
		employeesDelete: (state, action) => {
				state.employees = state.employees.filter(item => item.id !== action.payload)
			}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEmployees.pending, state => {state.employeesLoadingStatus = 'loading'})
			.addCase(fetchEmployees.fulfilled,  (state, action) => {
				state.employees = action.payload
				state.employeesLoadingStatus = 'idle'
			})
			.addCase(fetchEmployees.rejected, state => {state.employeesLoadingStatus = 'error'})
			.addDefaultCase(() => {})
	}
});

const {actions, reducer} = employeesSlice;

export default reducer;
export const {
	employeesCreated,
	employeesDelete
} = actions