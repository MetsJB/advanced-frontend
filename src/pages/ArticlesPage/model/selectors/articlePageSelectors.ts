import { StateScheme } from "app/providers/StoreProvider";
import { ArticleSortField, ArticleType, ArticleView } from "entities/Article";

export const getArticlePageIsLoading = (state: StateScheme) =>
  state.articlePage?.isLoading || false;

export const getArticlePageError = (state: StateScheme) =>
  state.articlePage?.error;

export const getArticlePageView = (state: StateScheme) =>
  state.articlePage?.view || ArticleView.SMALL;

export const getArticlePageNum = (state: StateScheme) =>
  state.articlePage?.page || 1;

export const getArticlePageLimit = (state: StateScheme) =>
  state.articlePage?.limit || 9;

export const getArticlePageHasMore = (state: StateScheme) =>
  state.articlePage?.hasMore;

export const getArticlePageInited = (state: StateScheme) =>
  state.articlePage?._inited;

export const getArticlePageOrder = (state: StateScheme) =>
  state.articlePage?.order ?? "asc";

export const getArticlePageSort = (state: StateScheme) =>
  state.articlePage?.sort ?? ArticleSortField.CREATED;

export const getArticlePageSearch = (state: StateScheme) =>
  state.articlePage?.search ?? "";

export const getArticlePageType = (state: StateScheme) =>
  state.articlePage?.type || ArticleType.ALL;
