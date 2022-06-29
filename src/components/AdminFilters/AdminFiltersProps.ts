import {Employees} from "../AdminEmployees/AdminEmployeesProps";

export interface IBtnSelect {
	name: string,
	label: string
	filters: string[]
}

export interface IEmployeesFilters {
	filters: {
		activeFilter: string
	},
	employees: {
		employees: Employees[]
	}
}

export interface ISelectBtn {
	filters: {
		filters: IBtnSelect[]
	}
}


