import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1 data-testid='value-title'>
        value =
        {counterValue}
      </h1>
      <button type='button' data-testid='increment-button' onClick={increment}>
        increment
      </button>
      <button type='button' data-testid='decrement-button' onClick={decrement}>
        decrement
      </button>
    </div>
  );
};
