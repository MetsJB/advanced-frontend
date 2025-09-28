import { profileReducer, profileActions } from "./profileSlice";
import { ValidateProfileError } from "../consts/consts";
import { ProfileSchema } from "../types/editableProfileCardSchema";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";

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

describe("profileSlice.test", () => {
  test("test  set raedonly", () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
    ).toEqual({
      readonly: true,
    });
  });

  test("test cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: { username: "" },
      readonly: false,
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({
      data,
      form: data,
      validateErrors: undefined,
      readonly: true,
    });
  });

  test("test update profile", () => {
    const state: DeepPartial<ProfileSchema> = {
      form: data,
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: "Oleg" })
      )
    ).toEqual({
      form: {
        ...data,
        username: "Oleg",
      },
    });
  });

  test("test update profile service pending", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending)
    ).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });

  test("test update profile service fulfilled", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, "")
      )
    ).toEqual({
      data,
      form: data,
      isLoading: false,
      readonly: true,
      validateErrors: undefined,
    });
  });
});
