import { createSelector } from 'reselect'
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect} from "react";
import {Spinner} from "../Spinner/Spinner";
import {HttpHooks} from "../../hooks/http.hooks";
import {
	employeesDelete,
	employeesFetched,
	employeesFetching,
	employeesFetchingError
} from "../../action";
import {AdminEmployeesItem} from "../AdminEmployeesItem/AdminEmployeesItem";
import {Employees} from "./AdminEmployeesProps";
import {IEmployeesFilters} from "../AdminFilters/AdminFiltersProps";
import {IStoreEmployees} from "../../reducers/employees.props";
import './AdminEmployees.css';

export const AdminEmployees = () => {

	const filteredEmployeesSelector = createSelector(
		(state: IEmployeesFilters) => state.filters.activeFilter,
		(state: IEmployeesFilters) => state.employees.employees,
		(filter, employees) => {
			if (filter === 'all') {
				return employees
			} else {
				return employees.filter(item => item.jobTitle === filter)
			}
		}
	);

	const filteredEmployees = useSelector(filteredEmployeesSelector)
	const employeesLoadingStatus = useSelector<IStoreEmployees, string>(state => state.employeesLoadingStatus)
	const dispatch = useDispatch();
	const {request} = HttpHooks();

	useEffect(() => {
		dispatch(employeesFetching());
		request<Employees[]>("http://localhost:3010/employees")
			.then(data => dispatch(employeesFetched(data)))
			.catch(() => dispatch(employeesFetchingError()));
	}, [])

	const onDelete = useCallback((id: number) => {
		request<number>(`http://localhost:3010/employees/${id}`, "DELETE")
			.then(() => dispatch(employeesDelete(id)))
			.catch(err => console.log(err));
	}, [])

	if (employeesLoadingStatus === 'loading') {
		return <Spinner/>
	} else if (employeesLoadingStatus === 'error') {
		return <h5>Ошибка загрузки</h5>
	}

	const renderEmployeesList = (arr: Employees[]) => {
		if (arr.length === 0) {
			return <h5>Сотрудники не добавлены</h5>
		}

		return arr.map(({id, ...props}) => {
			return <AdminEmployeesItem
				key={id}
				{...props}
				onDelete={() => onDelete(id as number)}
			/>
		});
	}

	const elements = renderEmployeesList(filteredEmployees);


	return (
		<>
			<div className="employees_header">
				<div className="col-span-4">ФИО</div>
				<div className="col-span-4">Должность</div>
				<div >Зарплата</div>
				<div>Удалить</div>
			</div>

			<ul className="view">
				{elements}
			</ul>
		</>
	)
}
