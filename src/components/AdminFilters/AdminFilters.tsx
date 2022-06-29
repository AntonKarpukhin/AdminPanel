import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import cn from 'classnames';
import {Spinner} from "../Spinner/Spinner";
import {HttpHooks} from "../../hooks/http.hooks";
import {
	activeFilterChanged,
	filtersFetched,
	filtersFetching,
	filtersFetchingError,
} from "../../action";
import {IStoreFilters} from "../../reducers/filters.props";
import {IBtnSelect, ISelectBtn} from "./AdminFiltersProps";

import './AdminFilter.css';

export const AdminFilters = () => {

	const filters = useSelector<ISelectBtn, IBtnSelect[]>(state => state.filters.filters)
	const filtersLoadingStatus = useSelector<IStoreFilters, string>(state => state.filtersLoadingStatus)
	const activeFilter = useSelector<IStoreFilters, string>(state => state.activeFilter)
	const dispatch = useDispatch();
	const {request} = HttpHooks();

	useEffect(() => {
		dispatch(filtersFetching());
		request<IBtnSelect[]>("http://localhost:3010/filters")
			.then(data => dispatch(filtersFetched(data)))
			.catch(() => dispatch(filtersFetchingError()))
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