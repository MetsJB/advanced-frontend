import { Reducer } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import {
  ReduxStoreWithManager,
  StateSchemaKey,
  StateScheme,
} from '@/app/providers/StoreProvider/config/stateSchema';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
  // [name in StateSchemaKey]?: Reducer<NonNullable<StateScheme[name]>>;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
  children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const store = useStore() as ReduxStoreWithManager;
  const { children, reducers, removeAfterUnmount = true } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      // добавляем новый редьюсер если его нет
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
  }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);

  return <>{children}</>;
};
