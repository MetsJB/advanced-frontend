import { Profile } from "../../../../../entities/Profile/model/types/profile";
import { ValidateProfileError } from "../../consts/consts";

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }

  const { first, lastname, age, country } = profile;

  const errors: ValidateProfileError[] = [];

  const phoneNumberRegExp = /^(90|[1-9][0-9]?)$/;

  if (!first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }

  if (
    !age ||
    !Number.isInteger(age) ||
    !phoneNumberRegExp.test(age.toString())
  ) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }

  return errors;
};
