import { StateScheme } from "app/providers/StoreProvider";
import { ArticleView } from "entites/Article";

export const getArticlePageIsLoading = (state: StateScheme) =>
  state.articlePage?.isLoading || false;

export const getArticlePageError = (state: StateScheme) =>
  state.articlePage?.error;

export const getArticlePageView = (state: StateScheme) =>
  state.articlePage?.view || ArticleView.SMALL;
