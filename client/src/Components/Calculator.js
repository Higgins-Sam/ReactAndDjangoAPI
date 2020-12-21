import React, { useState } from 'react';
import axios from 'axios';

function Calculator (props) {
  const [inputs, setInputs] = useState({
    first: 0,
    second: 0
  })
	const [answer, setAnswer] = useState(0);
	
	function add() {
    event.preventDefault();  
    
    if ((isNaN(inputs.first)) || (isNaN(inputs.second))) {
      alert("One or both of your values are NaN");
    } else {
      axios.post('api/calculator/add', {first: inputs.first, second: inputs.second}).then((response) => {setAnswer(response.data.answer)});
    };
  };
  
  function subtract() {
    event.preventDefault();

    if (isNaN(inputs.first) || (isNaN(second != ""))) {
      alert("One or both of your values are NaN");
    } else {
      axios.post('api/calculator/subtract', {first: inputs.first, second: inputs.second}).then((response) => {setAnswer(response.data.answer)});
    };
  };

  function multiply() {
    event.preventDefault();
    
    if (isNaN(inputs.first) || (isNaN(second != ""))) {
      alert("One or both of your values are NaN");
    } else {
      axios.post('api/calculator/multiply', {first: inputs.first, second: inputs.second}).then((response) => {setAnswer(response.data.answer)});
    };
  };

  function divide() {
    event.preventDefault();

    if (isNaN(inputs.first) || inputs.first == 0 || (isNaN(second != "") || inputs.second == 0)) {
			alert("One or both of your values are NaN or 0");
    } else {
			axios.post('api/calculator/divide', {first: inputs.first, second: inputs.second}).then((response) => {setAnswer(response.data.answer)});
    };
  };

  function onChange() {
    setInputs({first: document.getElementById('first').valueAsNumber, second: document.getElementById('second').valueAsNumber})
  }

	return (
		<form onChange={onChange}>
        <label>Input 1: </label><input type='number' id='first' defaultValue={inputs.first}/><br/>
        <label>Input 2: </label><input type='number' id='second' defaultValue={inputs.second}/><br/><br/>
        <input type='submit' value='Add' onClick={add}/>
        <input type='submit' value='Sub' onClick={subtract}/>
        <input type='submit' value='Mult' onClick={multiply}/>
        <input type='submit' value='Div' onClick={divide}/>
        <p>The answer is: {answer}</p>
      </form>
	)
};

export default Calculator