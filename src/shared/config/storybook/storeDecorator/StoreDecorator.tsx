import { ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { StateScheme, StoreProvider } from "app/providers/StoreProvider";
import { Theme, ThemeProvider } from "app/providers/ThemeProvider";
import { ArticleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";
import { profileReducer } from "entities/Profile";
import { addCommentFormReducer } from "features/addCommentForm/model/slices/addCommentFormSlice";
import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice";
import { articleDetailsPageReducer } from "pages/ArticleDeTailsPage/model/slices";
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: ArticleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateScheme>, asyncReducers?: ReducersList) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider
        initialSate={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    );
