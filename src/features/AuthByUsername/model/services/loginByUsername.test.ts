import axios from "axios";
import { loginByUsername } from "./loginByUsername";
import { Dispatch } from "@reduxjs/toolkit";
import { StateScheme } from "app/providers/StoreProvider";
import { userActions } from "entites/User";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/testAsyncThunk";

jest.mock("axios");

const mockedAxios = jest.mocked(axios, true);

describe("loginByUsername.test", () => {
  //   let dispatch: Dispatch;
  //   let getState: () => StateScheme;

  //   beforeEach(() => {
  //     dispatch = jest.fn();
  //     getState = jest.fn();
  //   });

  //   test("success login", async () => {
  //     const userValue = {
  //       username: "123",
  //       id: "1",
  //     };

  //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
  //     const action = loginByUsername({ password: "123", username: "123" });
  //     const result = await action(dispatch, getState, undefined);
  // console.log(result)

  //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
  //     expect(dispatch).toHaveBeenCalledTimes(3);
  //     expect(mockedAxios.post).toHaveBeenCalled();
  //     expect(result.meta.requestStatus).toBe("fulfilled");
  //     expect(result.payload).toEqual(userValue);
  //   });

  //   test("error login", async () => {

  //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
  //     const action = loginByUsername({ password: "123", username: "123" });
  //     const result = await action(dispatch, getState, undefined);

  //     expect(mockedAxios.post).toHaveBeenCalled();
  //     expect(dispatch).toHaveBeenCalledTimes(2);
  //     expect(result.meta.requestStatus).toBe("rejected");
  //     expect(result.payload).toBe("error");
  //   });

  test("success login", async () => {
    const userValue = {
      username: "123",
      id: "1",
    };

    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ password: "123", username: "123" });

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(userValue);
  });

  test("error login", async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    
    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ password: "123", username: "123" });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
