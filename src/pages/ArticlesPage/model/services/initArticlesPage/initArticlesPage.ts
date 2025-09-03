import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import {
  getArticlePageInited,
} from "../../selectors/articlePageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("articlesPage/iniArticlesPage", async (_, thunkAPI) => {
  const { getState, dispatch } = thunkAPI;
  const inited = getArticlePageInited(getState());

  if (!inited) {
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticleList({ page: 1 }));
  }
});
