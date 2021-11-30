import Validator from "validator";
import isEmpty from "is-empty";

export function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string to use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // check Username
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  // check Password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
