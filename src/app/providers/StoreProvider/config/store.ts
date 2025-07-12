import { configureStore } from "@reduxjs/toolkit";
import { StateScheme } from "./stateSchema";
import { counterReducer } from "entites/Counter";

export function createReduxStore(initialState?: StateScheme) {
  return configureStore<StateScheme>({
    reducer: {
      counter: counterReducer,
    },
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
