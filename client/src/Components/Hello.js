import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Hello(props) {
  const [hello, setHello] = useState('');

	useEffect(() => {
		axios.get('/api/hello').then((response) => setHello(response.data));
  }, []);
  
  return (
    <p>{hello.response_text}</p>
  )
}

export default Hello;