import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Comment } from "entites/Comment";
import { getUserAuthData } from "entites/User";
import { getArticleDetailsData } from "entites/Article/model/selectors/articleDetails";
import { fetchCommentsByArticleById } from "../fetchCommentsByArticleById/fetchCommentsByArticleById";

export const addCommentForArticle = createAsyncThunk<Comment,  string, ThunkConfig<string>>(
  "articelDetails/addCommentForArticle",
  async (text, thunkAPI) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkAPI;

    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
      return rejectWithValue("no data");
    }

    try {
      const response = await extra.api.post<Comment>("/comments", {
        articleId: article?.id,
        userId: userData.id,
        text,
      });

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchCommentsByArticleById(article.id))

      return response.data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
