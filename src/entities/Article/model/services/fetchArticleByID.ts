import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Article } from "../types/article";

export const fetchArticleByID = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>("articleDetails/fetchArticleByID", async (articleId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  
  try {
    if (!articleId) {
      throw new Error()
    }
    
    const response = await extra.api.get<Article>("/articles/" + articleId, {
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
