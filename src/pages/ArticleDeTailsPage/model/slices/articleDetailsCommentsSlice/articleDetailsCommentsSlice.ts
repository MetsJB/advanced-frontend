import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StateScheme } from "@/app/providers/StoreProvider";
import { Comment } from "@/entities/Comment";
import { ArticelDetailsCommentsSchema } from "../../types/ArticelDetailsCommentsSchema";
import { fetchCommentsByArticleById } from "../../services/fetchCommentsByArticleById/fetchCommentsByArticleById";

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateScheme>(
  (state) =>
    state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
);

const articleDetailsCommentsSlice = createSlice({
  name: "articleDetailsCommentsSlice",
  initialState: commentsAdapter.getInitialState<ArticelDetailsCommentsSchema>({
    entities: {},
    ids: [],
    error: undefined,
    isLoading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsByArticleById.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          commentsAdapter.setAll(state, action.payload);
          state.isLoading = false;
        }
      )
      .addCase(fetchCommentsByArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
export const { actions: articleDetailsCommentsActions } =
  articleDetailsCommentsSlice;
