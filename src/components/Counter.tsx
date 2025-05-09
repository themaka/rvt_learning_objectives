import { useState } from 'react';
import Button from './Button';
import './Counter.css';

type CounterProps = {
  initialValue?: number;
  step?: number;
};

/**
 * A counter component with increment and decrement buttons
 */
const Counter = ({ initialValue = 0, step = 1 }: CounterProps) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prevCount => prevCount + step);
  const decrement = () => setCount(prevCount => prevCount - step);
  const reset = () => setCount(initialValue);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <div className="counter-controls">
        <Button onClick={decrement} variant="secondary" aria-label="Decrement">-</Button>
        <Button onClick={reset} variant="outline" aria-label="Reset">Reset</Button>
        <Button onClick={increment} variant="primary" aria-label="Increment">+</Button>
      </div>
    </div>
  );
};

export default Counter;
