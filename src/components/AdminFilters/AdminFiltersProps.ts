import {Employees} from "../AdminEmployees/AdminEmployeesProps";

export interface IBtnSelect {
	name: string,
	label: string
	filters: string[]
}

export interface IEmployeesFilters {
	filtersSlice: {
		activeFilter: string
	},
	employeesSlice: {
		employees: Employees[]
	}
}

export interface ISelectBtn {
	filtersSlice: {
		filters: IBtnSelect[]
		filtersLoadingStatus: string,
		activeFilter: string
	}
}


