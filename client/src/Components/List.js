import React, { useEffect, useState } from 'react';
import axios from 'axios';

function List(props) {
	const [input, setInput] = useState('');
	const [list, setList] = useState([]);

	useEffect(() => {
		getToDoList();
	}, []);

	function updateText() {
		setInput(document.getElementById('user-input').value);
	}

	function getToDoList() {
		axios
			.get('/api/todo/get')
			.then((response) => setList(response.data.list));
	}

	function addItemToList() {
		event.preventDefault();
		axios
			.post('api/todo/add', { new_item: input })
			.then((response) => setList(response.data.updated_list));
		setInput('');
	}

	function clearList() {
		event.preventDefault();
		axios
			.post('/api/todo/clear')
			.then((response) => setList(response.data.cleared_list));
	}

	return (
		<div>
			<form>
				<input
					type='text'
					id='user-input'
					onChange={updateText}
					value={input}
				></input>
				<input type='submit' value='Add' onClick={addItemToList}></input>
				<input type='submit' value='Clear' onClick={clearList}></input>
			</form>
			<ul id='to-do-list'>
				{list.map((item) => (
					<li>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}

export default List;
