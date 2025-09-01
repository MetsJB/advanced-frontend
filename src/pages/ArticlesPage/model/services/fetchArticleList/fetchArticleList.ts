import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entites/Article";
import { Comment } from "entites/Comment";

export const fetchArticleList = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>("articlesPage/fetchArticleList", async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get<Article[]>("/articles", {
      params: {
        _expand: "user",
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
