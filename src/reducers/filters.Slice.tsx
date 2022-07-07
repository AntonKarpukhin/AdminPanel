import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IStoreFilters} from "./reducers.props";
import {HttpHooks} from "../hooks/http.hooks";
import {IBtnSelect} from "../components/AdminFilters/AdminFiltersProps";


const initialState: IStoreFilters = {
	filters: [],
	filtersLoadingStatus: 'idle',
	activeFilter: 'all'
}

export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters',
	async () => {
		const {request} = HttpHooks();
		return await request<IBtnSelect[]>("http://localhost:3010/filters")
	}
);

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		activeFilterChanged: (state, action) => {
			state.activeFilter = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filters = action.payload
				state.filtersLoadingStatus = 'idle'
			})
			.addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
			.addDefaultCase(() => {})
	}
})

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
	activeFilterChanged
} = actions