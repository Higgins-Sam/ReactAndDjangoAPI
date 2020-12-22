import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Styles/Counter.module.css';

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
		<div className={styles.counter}>
			<span>
			<button className={styles.minus} onClick={decrement}> [-] </button>
			<output className={count >= 0 ? styles.positive : styles.negative}>{count}</output>
			<button className={styles.plus} onClick={increment}> [+] </button>
			</span>
		</div>
	);
}

export default Counter;
