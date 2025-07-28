import {
  combineReducers,
  configureStore,
  DeepPartial,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { StateScheme } from "./stateSchema";
import { counterReducer } from "entites/Counter";
import { userReducer } from "entites/User";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(
  initialState?: StateScheme,
  asyncReducers?: ReducersMapObject<StateScheme>
) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateScheme>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });

  //@ts-ignore
  store.reducerManager = reducerManager;

  return store;
}
