import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { getArticleContorlPanelForm } from '../selectors/articleContorlPaneSelectors';

export const updateArticleControlPanelData = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>(
  'articleContorlPanel/updateArticleControlPanelData',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, extra } = thunkAPI;

    const formData = getArticleContorlPanelForm(getState());

    try {
      const response = await extra.api.put<Article>(
        `articles/${formData?.id}`,
        { ...formData, updatedAt: new Date().toLocaleDateString() },
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('updateArticleControlPanelData error');
    }
  },
);
