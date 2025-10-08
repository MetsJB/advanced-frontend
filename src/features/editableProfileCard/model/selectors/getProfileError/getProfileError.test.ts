import { StateScheme } from "@/app/providers/StoreProvider";
import { getProfileError } from "./getProfileError";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";

describe("getProfileError.test", () => {
  test("should return true", () => {
    const state: DeepPartial<StateScheme> = {
      profile: {
        error: "error",
      },
    };

    expect(getProfileError(state as StateScheme)).toBe("error");
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getProfileError(state as StateScheme)).toBe(undefined);
  });
});
