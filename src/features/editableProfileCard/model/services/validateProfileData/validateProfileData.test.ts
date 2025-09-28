import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { validateProfileData } from "./validateProfileData";
import { ValidateProfileError } from "../../consts/consts";

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

describe("validateProfileData.test", () => {
  test("success", () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test("without first and last name", () => {
    const result = validateProfileData({ ...data, first: "", lastname: "" });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test("incorrect age", () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test("incorrect country", () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });

  test("incorrect all", () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
