import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StateScheme } from "app/providers/StoreProvider";
import { Comment } from "entities/Comment";
import { fetchCommentsByArticleById } from "../../services/fetchCommentsByArticleById/fetchCommentsByArticleById";
import { ArticleDetailsRecommendationsSchema } from "../../types/articleDetailsPageRecommendationsSchema";
import { Article } from "entities/Article";
import { fetchArticleRecommendations } from "../../services/fetchArticleRecommendations/fetchArticleRecommendations";

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateScheme>(
    (state) =>
      state.articleDetailsPage?.recommmendations ||
      recommendationsAdapter.getInitialState()
  );

const articleDetailsPageRecommendationsSlice = createSlice({
  name: "articleDetailsPageRecommendationsSlice",
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        entities: {},
        ids: [],
        error: undefined,
        isLoading: false,
      }
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        recommendationsAdapter.setAll(state, action.payload);
        state.isLoading = false;
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice;
export const { actions: articleDetailsPageRecommendationsActions } =
  articleDetailsPageRecommendationsSlice;
