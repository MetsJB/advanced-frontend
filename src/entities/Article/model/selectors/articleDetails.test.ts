import { StateScheme } from "@/app/providers/StoreProvider";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "./articleDetails";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";

describe("articleDetails.test", () => {
  test("getArticleDetailsData", () => {
    const data = {
      id: "1",
      title: "title",
    };

    const state: DeepPartial<StateScheme> = {
      articleDetails: {
        data,
      },
    };

    expect(getArticleDetailsData(state as StateScheme)).toEqual(data);
  });
  test("getArticleDetailsData with empty state data", () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getArticleDetailsData(state as StateScheme)).toEqual(undefined);
  });

  test("getArticleDetailsIsLoading", () => {
    const state: DeepPartial<StateScheme> = {
      articleDetails: {
        isLoading: true,
      },
    };

    expect(getArticleDetailsIsLoading(state as StateScheme)).toEqual(true);
  });
  test("getArticleDetailsIsLoading with empty state", () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getArticleDetailsIsLoading(state as StateScheme)).toEqual(false);
  });

  test("getArticleDetailsError", () => {
    const state: DeepPartial<StateScheme> = {
      articleDetails: {
        error: "error",
      },
    };

    expect(getArticleDetailsError(state as StateScheme)).toEqual("error");
  });
});
