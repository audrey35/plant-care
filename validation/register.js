import Validator from "validator";
import isEmpty from "is-empty";

export function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string to use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // check Username
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  // check Password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
