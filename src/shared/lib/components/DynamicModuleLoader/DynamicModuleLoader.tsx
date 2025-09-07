import { Reducer } from "@reduxjs/toolkit";
import {
  ReduxStoreWithManager,
  StateSchemaKey,
  StateScheme,
} from "app/providers/StoreProvider/config/stateSchema";
import { FC, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateScheme[name]>>;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const store = useStore() as ReduxStoreWithManager;
  const { children, reducers, removeAfterUnmount = true } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      //добавляем новый редьюсер если его нет
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
  }, []);

  return <>{children}</>;
};
