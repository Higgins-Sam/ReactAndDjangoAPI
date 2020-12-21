import React, { useState } from 'react';
import axios from 'axios';

function Counter(props) {
	const [count, setCount] = useState(0);

	function increment() {
		axios.post('/api/counter/increment', { Num: count }).then((response) => {
			setCount(response.data.updated_count);
		});
	}

	function decrement() {
		axios.post('/api/counter/decrement', { Num: count }).then((response) => {
			setCount(response.data.updated_count);
		});
	}

	return (
		<div>
			<span>
			<button onClick={decrement}> [-] </button>
			<output>          {count}          </output>
			<button onClick={increment}> [+] </button>
			</span>
		</div>
	);
}

export default Counter;
