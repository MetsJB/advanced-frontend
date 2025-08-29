import axios from "axios";
import { fetchProfileData } from "./fetchProfileData";
import { Dispatch } from "@reduxjs/toolkit";
import { StateScheme } from "app/providers/StoreProvider";
import { userActions } from "entites/User";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/testAsyncThunk";
import { Currency } from "entites/Currency";
import { Country } from "entites/Country";

const data = {
  age: 22,
  avatar: "avatar",
  city: "Moscow",
  currency: Currency.RUB,
  first: "Zahar",
  lastname: "Ivanov",
  username: "Kerry_13",
  country: Country.Russia,
};

describe("fetchProfileData.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: data }));
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error login", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toBe("rejected");
  });
});
