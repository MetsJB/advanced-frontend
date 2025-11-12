import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateScheme } from '../config/stateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  children?: ReactNode;
  initialSate?: DeepPartial<StateScheme>;
  asyncReducers?: DeepPartial<
    ReducersMapObject<StateScheme>
  >;
}

export const StoreProvider = (
  props: StoreProviderProps,
) => {
  const { children, initialSate, asyncReducers } = props;
  // const navigate = useNavigate();

  const store = createReduxStore(
    initialSate as StateScheme,
    asyncReducers as ReducersMapObject<StateScheme>,
    // navigate
  );

  console.log('render');

  return <Provider store={store}>{children}</Provider>;
};
