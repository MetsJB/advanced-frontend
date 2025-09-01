import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StateScheme } from "app/providers/StoreProvider";
import { Article, ArticleView } from "entites/Article";
import { Comment } from "entites/Comment";
import { ArticlePageSchema } from "../types/articlePageSchema";
import { fetchArticleList } from "../services/fetchArticleList/fetchArticleList";
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from "shared/const/localStorage";

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateScheme>(
  (state) => state.articlePage || articlesAdapter.getInitialState()
);

const articlesPageSlice = createSlice({
  name: "articlesPageSlice",
  initialState: articlesAdapter.getInitialState<ArticlePageSchema>({
    entities: {},
    ids: [],
    error: undefined,
    isLoading: false,
    view: ArticleView.SMALL,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          articlesAdapter.setAll(state, action.payload);
          state.isLoading = false;
        }
      )
      .addCase(fetchArticleList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articlesPageReducer } = articlesPageSlice;
export const { actions: articlesPageActions } = articlesPageSlice;
