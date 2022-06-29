import {Employees} from "../components/AdminEmployees/AdminEmployeesProps";

export interface IStoreEmployees {
	employees: Employees[],
	employeesLoadingStatus: string
}

export enum ActionPointsEmployeesEnum {
	EMPLOYEES_FETCHING = 'EMPLOYEES_FETCHING',
	EMPLOYEES_FETCHED = 'EMPLOYEES_FETCHED',
	EMPLOYEES_FETCHING_ERROR = 'EMPLOYEES_FETCHING_ERROR',
	EMPLOYEES_DELETE = 'EMPLOYEES_DELETE',
	EMPLOYEES_CREATED = 'EMPLOYEES_CREATED',
}

type AlbumType = {
	type: string,
	payload: Employees[]
}

export type ActionTypeEmployees = {
	type: ActionPointsEmployeesEnum.EMPLOYEES_FETCHING;
	employeesLoadingStatus: string;
} | {
	type: ActionPointsEmployeesEnum.EMPLOYEES_FETCHED;
	payload: AlbumType['payload'];
	employeesLoadingStatus: string;
	filteredEmployees: Employees[]
} | {
	type: ActionPointsEmployeesEnum.EMPLOYEES_FETCHING_ERROR;
	employeesLoadingStatus: string;
} | {
	type: ActionPointsEmployeesEnum.EMPLOYEES_DELETE;
	payload: number;
	filteredEmployees: Employees[]
} | {
	type: ActionPointsEmployeesEnum.EMPLOYEES_CREATED;
	payload: Employees
	filteredEmployees: Employees[]
}
