import { StateScheme } from "app/providers/StoreProvider";
import { getProfileValidateErrors } from "./getProfileValidateErrors";
import { Currency } from "entites/Currency";
import { Country } from "entites/Country";
import { ValidateProfileError } from "../../types/profile";

describe("getProfileValidateErrors.test", () => {
  test("should return true", () => {
    const state: DeepPartial<StateScheme> = {
      profile: {
        validateErrors: [ValidateProfileError.NO_DATA],
      },
    };

    expect(getProfileValidateErrors(state as StateScheme)).toEqual([
      ValidateProfileError.NO_DATA,
    ]);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getProfileValidateErrors(state as StateScheme)).toBe(undefined);
  });
});
