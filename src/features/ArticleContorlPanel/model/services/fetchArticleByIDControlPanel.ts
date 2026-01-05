import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

export const fetchArticleByIDControlPanel = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>(
  'articleContorlPanel/fetchArticleByIDControlPanel',
  async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      if (!articleId) {
        throw new Error();
      }

      const response = await extra.api.get<Article>(
        `/articles/${articleId}`,
        {
          params: {
            _expand: 'user',
          },
        },
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
