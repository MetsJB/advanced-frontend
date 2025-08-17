import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/testAsyncThunk";
import { Currency } from "entites/Currency";
import { Country } from "entites/Country";
import { updateProfileData } from "./updateProfileData";
import { ValidateProfileError } from "../../types/profile";

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

describe("updateProfileData.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ data: data }));
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test("validate error", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: {...data, lastname: ''},
      },
    });
    const result = await thunk.callThunk();
  
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
