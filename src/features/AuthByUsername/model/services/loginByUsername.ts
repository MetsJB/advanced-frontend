import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, userActions } from "entites/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage";

interface LoginByusernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByusernameProps,
  { rejectValue: string }
>("login/loginByUsername", async (authData, thunkAPI) => {
  try {
    const response = await axios.post<User>(
      "http://localhost:8000/login",
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    thunkAPI.dispatch(userActions.setAuthData(response.data))
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
    
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('error');
  }
});
