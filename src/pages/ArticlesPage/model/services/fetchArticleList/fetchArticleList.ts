import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entites/Article";
import { Comment } from "entites/Comment";
import { getArticlePageLimit } from "../../selectors/articlePageSelectors";

interface FetchArticleListProps {
  page?: number;
}

export const fetchArticleList = createAsyncThunk<
  Article[],
  FetchArticleListProps,
  ThunkConfig<string>
>("articlesPage/fetchArticleList", async (props, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI;
  const { page = 1 } = props;
  const limit = getArticlePageLimit(getState());

  try {
    const response = await extra.api.get<Article[]>("/articles", {
      params: {
        _expand: "user",
        _limit: limit,
        _page: page,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
