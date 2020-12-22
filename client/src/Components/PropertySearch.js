import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../Styles/PropertySearch.module.css'

function PropertySearch(props) {
	const [criteria, setCriteria] = useState({
		minBedrooms: '0',
		maxPrice: '0',
		radius: '0',
		detached: true,
		semiDetached: false,
	});
	const [filter, setFilter] = useState('');
	const [list, setList] = useState([]);

	function updateCriteria() {
		setCriteria({
			minBedrooms: document.getElementById('min-bedrooms').value,
			maxPrice: document.getElementById('max-price').value,
			radius: document.getElementById('radius').value,
			detached: document.getElementById('detached').checked,
			semiDetached: document.getElementById('semi-detached').checked,
		});
	}

	function updateFilter() {
		setFilter(document.getElementById('filter').value);
	}

	function filterResults() {
		event.preventDefault();
		axios
			.post('api/property/filter', { filter: filter })
			.then((response) => setList(response.data.filtered_list));
	}

	function search() {
		event.preventDefault();
		axios
			.post('api/property/search', { criteria })
			.then((response) => setList(response.data.list_of_properties));
	}

	return (
		<div className={styles.propertySearch}>
			<div className={styles.propertySearchForms}>
				<form className={styles.searchForm} onChange={updateCriteria}>
					<label className={styles.searchLabel} for='min-bedrooms'>Min-bedrooms: </label>
					<input type='number' id='min-bedrooms'></input>
					<br />
					<label className={styles.searchLabel} for='max-price'>Max-price: </label>
					<input type='number' id='max-price'></input>
					<br />
					<label className={styles.searchLabel} for='radius'>Radius: </label>
					<select id='radius'>
						<option>0</option>
						<option>0.25</option>
						<option>0.5</option>
						<option>1</option>
						<option>3</option>
						<option>5</option>
						<option>10</option>
					</select>
					<br />
					<label className={styles.searchLabel} for='detached'>Detached: </label>
					<input type='checkbox' id='detached' defaultChecked='true'></input>
					<br />
					<label className={styles.searchLabel} for='semi-detached'>Semi-Detached: </label>
					<input type='checkbox' id='semi-detached'></input>
					<br />
					<br />
					<input className={styles.searchButton} type='submit' value='Search' onClick={search}></input>
				</form>
				<p>This returned {list.length} results</p>
				<form className={styles.searchForm} onSubmit={filterResults}>
					<label className={styles.searchLabel} for='filter'>Filter: </label>
					<input type='text' id='filter' onChange={updateFilter}></input>
					<br />
					<br />
					<input className={styles.searchButton} type='submit' value='Filter'></input>
				</form>
			</div>
			<div className={styles.results}>
				<ul className={styles.resultsList} id='results-list'>
					{list.map((item) => (
						<li>
							{item.tag} {item.address} for {item.price} - <a href={item.link} target='_blank'>Link</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default PropertySearch;
