import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

interface LoginByusernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByusernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
  const { dispatch, extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post<User>(
      '/login',
      authData,
    );

    if (!response.data) {
      throw new Error();
    }

    dispatch(userActions.setAuthData(response.data));
    localStorage.setItem(
      USER_LOCALSTORAGE_KEY,
      JSON.stringify(response.data),
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
