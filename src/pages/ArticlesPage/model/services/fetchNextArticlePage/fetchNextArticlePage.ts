import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import {
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageNum,
} from "../../selectors/articlePageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";

export const fetchNextArticlePage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("articlesPage/fetchNextArticlePage", async (_, thunkAPI) => {
  const { getState, dispatch } = thunkAPI;
  const hasMore = getArticlePageHasMore(getState());
  const page = getArticlePageNum(getState());
  const isLoading = getArticlePageIsLoading(getState());

  if (hasMore && !isLoading) {
    dispatch(articlesPageActions.setPage(page + 1));
    dispatch(fetchArticleList({}));
  }
});
