import {Employees} from "../components/AdminEmployees/AdminEmployeesProps";
import {IBtnSelect} from "../components/AdminFilters/AdminFiltersProps";

export interface IStoreEmployees {
	employees: Employees[],
	employeesLoadingStatus: string
}

export interface IStoreFilters {
	filters: IBtnSelect[],
	filtersLoadingStatus: string,
	activeFilter: string
}

export type StoreType = {}