import {ActionPointsEmployeesEnum, ActionTypeEmployees, IStoreEmployees} from "./employees.props";

const initialState: IStoreEmployees = {
	employees: [],
	employeesLoadingStatus: 'idle'
}

const employees = (state = initialState, action: ActionTypeEmployees) => {
	switch (action.type) {
		case ActionPointsEmployeesEnum.EMPLOYEES_FETCHING:
			return {
				...state,
				employeesLoadingStatus: 'loading'
			}
		case ActionPointsEmployeesEnum.EMPLOYEES_FETCHED:
			return {
				...state,
				employees: action.payload,
				employeesLoadingStatus: 'idle'
			}
		case ActionPointsEmployeesEnum.EMPLOYEES_FETCHING_ERROR:
			return {
				...state,
				employeesLoadingStatus: 'error'
			}
		case ActionPointsEmployeesEnum.EMPLOYEES_CREATED:
			return {
				...state,
				employees: [...state.employees, action.payload]
			}
		case ActionPointsEmployeesEnum.EMPLOYEES_DELETE:
			return {
				...state,
				employees: state.employees.filter(item => item.id !== action.payload)

			}
		default: return state
	}
}

export default employees;
