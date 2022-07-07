import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import cn from 'classnames';
import {Spinner} from "../Spinner/Spinner";
import {activeFilterChanged, fetchFilters} from "../../reducers/filters.Slice";
import {IBtnSelect, ISelectBtn} from "./AdminFiltersProps";

import './AdminFilter.css';

export const AdminFilters = () => {

	const filters = useSelector<ISelectBtn, IBtnSelect[]>(state => state.filtersSlice.filters)
	const filtersLoadingStatus = useSelector<ISelectBtn, string>(state => state.filtersSlice.filtersLoadingStatus)
	const activeFilter = useSelector<ISelectBtn, string>(state => state.filtersSlice.activeFilter)
	const dispatch = useDispatch();

	useEffect(() => {
		// @ts-ignore
		dispatch(fetchFilters())
	}, []);

	if (filtersLoadingStatus === 'loading') {
		return <Spinner/>
	} else if (filtersLoadingStatus === 'error') {
		return <h5>Ошибка загрузки</h5>
	}

	const renderButtons = (btn: IBtnSelect[]) => {
		if (btn.length === 0) {
			return <h5>Фильтры не найдены</h5>
		}

		return btn.map(({name, label}) => {
			const btnClass = cn('btn_filter border-2 rounded-2xl mt-5', cn, {
				'active': name === activeFilter
			});

			return <button
				key={name}
				id={name}
				className={btnClass}
				onClick={() => dispatch(activeFilterChanged(name))}>
				{label}
			</button>
		});

	}

	const elementsBtn = renderButtons(filters)

	return (
		<div className="filter">
			<div className="inputs">
				<input
					className="input"
					type="text"
					placeholder="Найти сотрудника"
				/>
			</div>

			<div className="btn">
				{elementsBtn}
			</div>

		</div>
	)
}