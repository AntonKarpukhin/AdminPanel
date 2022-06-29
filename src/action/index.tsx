import {Employees} from "../components/AdminEmployees/AdminEmployeesProps";
import {IBtnSelect} from "../components/AdminFilters/AdminFiltersProps";

export const employeesFetching = () => {
	return {
		type: 'EMPLOYEES_FETCHING'
	}
}

export const employeesFetched = (employees: Employees[]) => {
	return {
		type: 'EMPLOYEES_FETCHED',
		payload: employees
	}
}

export const employeesFetchingError = () => {
	return {
		type: 'EMPLOYEES_FETCHING'
	}
}

export const filtersFetching = () => {
	return {
		type: 'FILTERS_FETCHING'
	}
}

export const filtersFetched = (filters: IBtnSelect[]) => {
	return {
		type: 'FILTERS_FETCHED',
		payload: filters
	}
}

export const filtersFetchingError = () => {
	return {
		type: 'FILTERS_FETCHING_ERROR'
	}
}

export const activeFilterChanged = (filter: string) => {
	return {
		type: 'ACTIVE_FILTER_CHANGED',
		payload: filter
	}
}

export const employeesCreated = (employees: Employees) => {
	return {
		type: 'EMPLOYEES_CREATED',
		payload: employees
	}
}

export const employeesDelete = (id: number) => {
	return {
		type: 'EMPLOYEES_DELETE',
		payload: id
	}
}

