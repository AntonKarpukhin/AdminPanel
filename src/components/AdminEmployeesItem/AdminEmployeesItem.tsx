import {Delete} from "../AdminEmployees/Svg/Delete";
import {IAdminEmployeesItemProps} from "./AdminEmployeesItemProps";
import './AdminEmployeesItem.css'


export const AdminEmployeesItem = ({name, salary, jobTitle, onDelete}: IAdminEmployeesItemProps) => {

	return (
		<li>
			<div className="employees_item">
				<div className="col-span-4">{name}</div>
				<div className="col-span-4">{jobTitle}</div>
				<div >{salary}</div>
				<button onClick={onDelete}>
					<Delete/>
				</button>
			</div>
		</li>
	)
}
