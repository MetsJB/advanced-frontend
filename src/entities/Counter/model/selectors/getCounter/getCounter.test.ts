import { getCounter } from "./getCounter";
import { StateScheme } from "@/app/providers/StoreProvider";

describe("getcounter", () => {
  test("should return counter value", () => {
    const state: DeepPartial<StateScheme> = {
      counter: {
        value: 10,
      },
    };

    expect(getCounter(state as StateScheme)).toEqual({ value: 10 });
  });
});
