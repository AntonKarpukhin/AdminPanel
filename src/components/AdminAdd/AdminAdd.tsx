import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from 'react-select'
import {useDispatch} from "react-redux";
import React, {useState} from "react";
import { v4 as uuidv4} from 'uuid';
import {HttpHooks} from "../../hooks/http.hooks";
import {employeesCreated} from "../../reducers/employees.Slice";
import {Employees} from "../AdminEmployees/AdminEmployeesProps";
import {IAdd, IAddServer, IOptions} from "./AdminAddProps";
import './AdminAdd.css';

export const AdminAdd = () => {

	const [employeesName, setEmployeesName] = useState('');
	const [employeesSalary, setEmployeesSalary] = useState('');

	const dispatch = useDispatch();
	const {request} = HttpHooks();

	const { register, handleSubmit, reset, control, formState: {errors}} = useForm<IAdd>({mode: 'all'});

	const options: IOptions[] = [
		{ value: 'Специалист', label: 'Специалист' },
		{ value: 'Ведущий специалист', label: 'Ведущий специалист' },
		{ value: 'Главный специалист', label: 'Главный специалист' },
		{ value: 'Начальник отдела', label: 'Начальник отдела' },
		{ value: 'Директор департамента', label: 'Директор департамента' },
	]

	const getValue = (value: string) =>
		value ? options.find((options) => options.value === value) : ''

	const onSubmit: SubmitHandler<IAdd> = (data, event?: React.BaseSyntheticEvent) => {
		event?.preventDefault();
		const newEmployees: Employees = {
			id: uuidv4(),
			name: data.name,
			salary: data.salary,
			jobTitle: data.jobTitle
		}


		request<IAddServer>("http://localhost:3010/employees", "POST", JSON.stringify(newEmployees))
			.then(() => dispatch(employeesCreated(newEmployees)))
			.catch(err => console.log(err));

		setEmployeesName('');
		setEmployeesSalary('');
		reset();
	}

	return (
		<div className="form">
			<h1>Добавить нового сотрудника</h1>
			<form
				className="form_wrapper"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="form_input_wrapper">
					<input
						value={employeesName}
						className="form_input"
						{...register('name', { required: 'Обязательное поле', pattern: {value: /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/, message: 'Заполните полностью ФИО'}})}
						placeholder="Введите ФИО"
						type="text"
						onChange={(e) => setEmployeesName(e.target.value)}
					/>
					{errors.name && <div className="form_error">{errors.name.message}</div>}
				</div>

				<div className="form_input_wrapper">
					<input
						value={employeesSalary}
						className="form_input"
						{...register('salary', { required: 'Обязательное поле', pattern: {value: /^\d{1,}$/, message: 'Введите зарплату в цифрах'}  })}
						placeholder="Введите зарплату"
						type="number"
						onChange={(e) => setEmployeesSalary(e.target.value)}
					/>
					{errors.salary && <div className="form_error">{errors.salary.message}</div>}
				</div>

				<div className="form_input_wrapper">
					<Controller
						control={control}
						name="jobTitle"
						rules={{
							required: "Выберите должность!"
						}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<>
								<Select
									className="form_select"
									placeholder="Выберите должность"
									options={options}
									value={getValue(value)}
									onChange={(newValue) => onChange((newValue as IOptions).value)}
								/>
								{error && <div className="form_error">{error.message}</div>}
							</>
						)}
					/>
				</div>

				<div><button className="form_btn" type="submit">Click</button></div>
			</form>
		</div>
	)
}