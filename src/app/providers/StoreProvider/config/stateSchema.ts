import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { CounterSchema } from "entites/Counter";
import { ProfileSchema } from "entites/Profile";
import { UserSchema } from "entites/User";
import { LoginSchema } from "features/AuthByUsername";
import { NavigateOptions, To } from "react-router-dom";

export interface StateScheme {
  counter: CounterSchema;
  user: UserSchema;

  //async reducer
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateScheme;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}
export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateScheme
}
