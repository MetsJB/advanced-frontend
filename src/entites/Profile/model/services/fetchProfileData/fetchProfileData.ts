import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { User, userActions } from "entites/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage";
import { Profile } from "../../types/profile";
import { ThunkExtraArg } from "app/providers/StoreProvider/config/stateSchema";

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  "profile/fetchProfileData",
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.api.get<Profile>("/profile");

      if(!response.data) {
        throw new Error()
      }

      return response.data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
