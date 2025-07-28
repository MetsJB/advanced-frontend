import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import {  CounterSchema } from "entites/Counter";
import {  UserSchema } from "entites/User";
import { LoginSchema } from "features/AuthByUsername";

export interface StateScheme {
  counter: CounterSchema;
  user: UserSchema

  //async reducer
  loginForm?: LoginSchema
}

export type StateSchemaKey = keyof StateScheme

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (
    state: StateScheme,
    action: AnyAction
  ) => CombinedState<StateScheme>;
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme>{
  reducerManager: ReducerManager
}