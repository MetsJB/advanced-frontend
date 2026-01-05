import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleContorlPanelSchema } from '../types/articleContorlPanelSchema';
import { fetchArticleByIDControlPanel } from '../services/fetchArticleByIDControlPanel';
import { Article } from '@/entities/Article';
import { updateArticleControlPanelData } from '../services/updateArticleControlPanelData';

const initialState: ArticleContorlPanelSchema = {
  isLoading: false,
  error: undefined,
  readonly: true,
  data: undefined,
};

export const articleContorlPanelSlice = createSlice({
  name: 'articleContorlPanel',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    updateArticle: (
      state,
      action: PayloadAction<Partial<Article>>,
    ) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    cancelEdit: (state) => {
      state.form = state.data;
      state.readonly = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleByIDControlPanel.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticleByIDControlPanel.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.data = action.payload;
          state.form = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(
        fetchArticleByIDControlPanel.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateArticleControlPanelData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateArticleControlPanelData.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.data = action.payload;
          state.form = action.payload;
          state.isLoading = false;
          state.readonly = true;
        },
      )
      .addCase(
        updateArticleControlPanelData.rejected,
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export const { actions: articleContorlPanelActions } =
  articleContorlPanelSlice;
export const { reducer: articleContorlPanelReducer } =
  articleContorlPanelSlice;
