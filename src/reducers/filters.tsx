import {ActionPointsFiltersEnum, ActionTypeFilters, IStoreFilters} from "./filters.props";

const initialState: IStoreFilters = {
	filters: [],
	filtersLoadingStatus: 'idle',
	activeFilter: 'all'
}

const filters = (state = initialState, action: ActionTypeFilters) => {
	switch (action.type) {

		case ActionPointsFiltersEnum.FILTERS_FETCHING:
			return {
				...state,
				filtersLoadingStatus: 'loading'
			}
		case ActionPointsFiltersEnum.FILTERS_FETCHED:
			return {
				...state,
				filters: action.payload,
				filtersLoadingStatus: 'idle'
			}
		case ActionPointsFiltersEnum.FILTERS_FETCHING_ERROR:
			return {
				...state,
				filtersLoadingStatus:  'error'
			}
		case ActionPointsFiltersEnum.ACTIVE_FILTER_CHANGED:
			return {
				...state,
				activeFilter: action.payload
			}
		default: return state
	}
}

export default filters;


