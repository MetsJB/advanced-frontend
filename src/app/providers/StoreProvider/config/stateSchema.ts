import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ArticleDetailsSchema } from "entites/Article";
import { CounterSchema } from "entites/Counter";
import { ProfileSchema } from "entites/Profile";
import { UserSchema } from "entites/User";
import { addCommentFormSchema } from "features/addCommentForm";
import { LoginSchema } from "features/AuthByUsername";
import { ArticelDetailsCommentsSchema } from "pages/ArticleDeTailsPage";
import { ArticlePageSchema } from "pages/ArticlesPage";
import { NavigateOptions, To } from "react-router-dom";

export interface StateScheme {
  counter: CounterSchema;
  user: UserSchema;

  //async reducer
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticelDetailsCommentsSchema;
  addCommentForm?: addCommentFormSchema;
  articlePage?: ArticlePageSchema;
}

export type StateSchemaKey = keyof StateScheme;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  //true - вмонтирован, иначе нет
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}
export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateScheme;
}
