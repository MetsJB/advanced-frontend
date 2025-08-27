import {
  CombinedState,
  combineReducers,
  configureStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { StateScheme, ThunkExtraArg } from "./stateSchema";
import { counterReducer } from "entites/Counter";
import { userReducer } from "entites/User";
import { createReducerManager } from "./reducerManager";
import { $api } from "shared/api/api";
import { NavigateOptions, To } from "react-router-dom";

export function createReduxStore(
  initialState?: StateScheme,
  asyncReducers?: ReducersMapObject<StateScheme>,
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  const rootReducers: ReducersMapObject = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
    navigate
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  });

  //@ts-ignore
  store.reducerManager = reducerManager;

  return store;
}


export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
