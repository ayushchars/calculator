import React, { useState } from 'react';
import Result from "./result";

function Calculator() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function add(numbers) {
    if (numbers === '') return 0;

    let delimiter = /[,\n]+/;
    let numberString = numbers;

    if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      delimiter = new RegExp(`[${numbers[2]}]`);
      numberString = numbers.slice(delimiterEndIndex + 1);
    }

    const numArray = numberString.split(delimiter);
    const parsedNumbers = numArray
      .map((num) => num.trim())
      .filter((num) => !isNaN(num) && num !== '')
      .map(Number); 

    const negativeNumbers = parsedNumbers.filter((num) => num < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }

    const total = parsedNumbers.reduce((acc, num) => acc + num, 0);
    return total;
  }

  const handleCalculate = () => {
    try {
      const processedValue = value.replace(/\\n/g, '\n');
      const sum = add(processedValue);
      setResult(sum);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress} 
          placeholder="Enter numbers"
        />
        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {result !== null && <Result result={result} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Calculator;
