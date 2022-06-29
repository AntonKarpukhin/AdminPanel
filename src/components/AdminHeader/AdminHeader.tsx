import {useSelector} from "react-redux";
import {AdminHeaderProps} from "./AdminHeader.Props";
import {Employees} from "../AdminEmployees/AdminEmployeesProps";
import './AdminHeader.css';

export const AdminHeader = () => {

	const employees = useSelector<AdminHeaderProps, Employees[]>(state => state.employees.employees)

	const sum = (arr: Employees[]) => {
		let a: number = 0
		arr.map(item => {
			return a += +item.salary
		})
		return a
	}

	const sums = (actions: string) => {
		switch (actions) {
			case "Специалист":
				let a = employees.filter(item => item.jobTitle === "Специалист").length
				let b = employees.filter(item => item.jobTitle === "Ведущий специалист").length
				let c = employees.filter(item => item.jobTitle === "Главный специалист").length
				return a + b + c
			case "Начальник отдела":
				return employees.filter(item => item.jobTitle === "Начальник отдела").length
			case "Директор департамента":
				return employees.filter(item => item.jobTitle === "Директор департамента").length
		}

	}

	return (
		<>
			<header className="header">
				<div className="header_wrapper bg-red-500 shadow-xl shadow-red-500/50 ">
					<div className="header_item">Штат: </div>
					<div className="header_number">{employees.length}</div>
				</div>
				<div className="header_wrapper bg-blue-500 shadow-xl shadow-blue-500/50">
					<div className="header_item">Специалисты: </div>
					<div className="header_number">{sums('Специалист')}</div>
				</div>
				<div className="header_wrapper bg-green-500 shadow-xl shadow-green-500/50">
					<div className="header_item">Начальники отдела: </div>
					<div className="header_number">{sums('Начальник отдела')}</div>
				</div>
				<div className="header_wrapper bg-purple-500 shadow-xl shadow-purple-500/50">
					<div className="header_item">Директора: </div>
					<div className="header_number">{sums('Директор департамента')}</div>
				</div>
				<div className="header_wrapper bg-cyan-500 shadow-xl shadow-cyan-500/50">
					<div className="header_item">Общая З/П: </div>
					<div className="header_number">{sum(employees)}</div>
				</div>
			</header>
		</>
	)
}