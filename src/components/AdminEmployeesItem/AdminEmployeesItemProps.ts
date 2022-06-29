import {Employees} from "../AdminEmployees/AdminEmployeesProps";

export interface IAdminEmployeesItemProps extends Omit <Employees, 'id'> {
	onDelete: () => void
}