import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleByID } from '../services/fetchArticleByID';
import { Article } from '../types/article';

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const ArticleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleByID.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleByID.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.data = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(
        fetchArticleByID.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { actions: ArticleDetailsActions } =
  ArticleDetailsSlice;
export const { reducer: ArticleDetailsReducer } =
  ArticleDetailsSlice;
