import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calculator from './Components/Calculator';
import Counter from './Components/Counter';
import List from './Components/List';
import PropertySearch from './Components/PropertySearch';

function App(props) {
	const [hello, setHello] = useState('');

	useEffect(() => {
		axios.get('/api/hello').then((response) => setHello(response.data));
	}, []);

	return (
		<div>
			<p>{hello.response_text}</p>
			<hr></hr>
			<h4>Counter</h4>
      <Counter />
			<hr></hr>
			<h4>Calculator</h4>
			<Calculator />
			<hr></hr>
			<h4>To-Do List</h4>
      <List />
      <hr></hr>
			<h4>Rightmove Property Search</h4>
			<PropertySearch />
			<hr></hr>
		</div>
	);
}

export default App;
