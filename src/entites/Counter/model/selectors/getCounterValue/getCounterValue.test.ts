import { DeepPartial } from "@reduxjs/toolkit";
import { getCounterValue } from "./getCounterValue";
import { StateScheme } from "app/providers/StoreProvider";

describe("getCounterValue.test", () => {
  const state: DeepPartial<StateScheme> = {
    counter: {
      value: 10,
    },
  };

  test("", () => {
    expect(getCounterValue(state as StateScheme)).toEqual(10);
  });
});
