/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable i18next/no-literal-string */
import { useDispatch } from 'react-redux';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
  const dispatch = useDispatch();
  const counterValue = useCounterValue();
  const { add, decrement, increment } = useCounterActions();

  const handleInc = () => {
    increment();
  };
  const handleDec = () => {
    decrement();
  };
  const handleAddFive = () => {
    add(5);
  };

  return (
    <div>
      <h1 data-testid='value-title'>value ={counterValue}</h1>
      <button type='button' data-testid='increment-button' onClick={handleInc}>
        increment
      </button>
      <button type='button' data-testid='decrement-button' onClick={handleDec}>
        decrement
      </button>
      <button
        type='button'
        data-testid='decrement-button-five'
        onClick={handleAddFive}
      >
        add five
      </button>
    </div>
  );
};
