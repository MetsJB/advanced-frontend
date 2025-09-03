import { StateScheme } from "app/providers/StoreProvider";
import { ArticleView } from "entites/Article";

export const getArticlePageIsLoading = (state: StateScheme) =>
  state.articlePage?.isLoading || false;

export const getArticlePageError = (state: StateScheme) =>
  state.articlePage?.error;

export const getArticlePageView = (state: StateScheme) =>
  state.articlePage?.view || ArticleView.SMALL;

export const getArticlePageNum = (state: StateScheme) => 
  state.articlePage?.page || 1 ;

export const getArticlePageLimit = (state: StateScheme) =>
  state.articlePage?.limit || 9;

export const getArticlePageHasMore = (state: StateScheme) =>
  state.articlePage?.hasMore;

export const getArticlePageInited = (state: StateScheme) =>
  state.articlePage?._inited;