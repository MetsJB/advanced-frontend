import {  ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { StateScheme, StoreProvider } from "app/providers/StoreProvider";
import { Theme, ThemeProvider } from "app/providers/ThemeProvider";
import { profileReducer } from "entites/Profile";
import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice";
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
};

export const StoreDecorator =
  (
    state: DeepPartial<StateScheme>,
    asyncReducers?: ReducersList
  ) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider
        initialSate={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    );
