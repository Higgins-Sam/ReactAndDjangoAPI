import React, {useState, useEffect} from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'
import Calculator from './Components/Calculator';
import Counter from './Components/Counter';
import List from './Components/List';
import PropertySearch from './Components/PropertySearch';
import Hello from './Components/Hello';
import styles from './Styles/App.module.css';

function App(props) {

	const path = window.location.origin

	function updatePath(destination) {
		window.location.href = path + destination
	}

	return (
		<div>
			<div className={styles.menu}>
				<button onClick={() => updatePath('/hello')}>Hello</button>
				<button onClick={() => updatePath('/counter')}>Counter</button>
				<button onClick={() => updatePath('/calculator')}>Calculator</button>
				<button onClick={() => updatePath('/todo')}>To-Do List</button>
				<button onClick={() => updatePath('/property')}>Property</button>
			</div>
			<hr></hr>
			<Switch>
				<Route path='/hello' component={Hello} />
				<Route path='/counter' component={Counter} />
				<Route path='/calculator' component={Calculator} />
				<Route path='/todo' component={List} />
				<Route path='/property' component={PropertySearch} />
			</Switch>
		</div>
	);
}

export default App;
