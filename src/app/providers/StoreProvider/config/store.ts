import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateScheme } from "./stateSchema";
import { counterReducer } from "entites/Counter";
import { userReducer } from "entites/User";

export function createReduxStore(initialState?: StateScheme) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    counter: counterReducer,
    user: userReducer
  }

  return configureStore<StateScheme>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
 