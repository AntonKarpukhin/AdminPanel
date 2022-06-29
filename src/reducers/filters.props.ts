import {Employees} from "../components/AdminEmployees/AdminEmployeesProps";
import {IBtnSelect} from "../components/AdminFilters/AdminFiltersProps";

export interface IStoreFilters {
	filters: IBtnSelect[],
	filtersLoadingStatus: string,
	activeFilter: string
}

export enum ActionPointsFiltersEnum {
	FILTERS_FETCHING = 'FILTERS_FETCHING',
	FILTERS_FETCHED = 'FILTERS_FETCHED',
	FILTERS_FETCHING_ERROR = 'FILTERS_FETCHING_ERROR',
	ACTIVE_FILTER_CHANGED = 'ACTIVE_FILTER_CHANGED'
}

export type IBtnsSelect = {
	payload: IBtnSelect[]
}

export type ActionTypeFilters = {
	type: ActionPointsFiltersEnum.FILTERS_FETCHING;
	filtersLoadingStatus: string
} | {
	type: ActionPointsFiltersEnum.FILTERS_FETCHED;
	payload: IBtnsSelect['payload'],
	filtersLoadingStatus: string
} | {
	type: ActionPointsFiltersEnum.FILTERS_FETCHING_ERROR;
	filtersLoadingStatus: string
} | {
	type: ActionPointsFiltersEnum.ACTIVE_FILTER_CHANGED;
	payload: string,
	filteredEmployees: Employees[]
}
