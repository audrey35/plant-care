import Validator from "validator";
import isEmpty from "is-empty";

export function validateProfileInput(data) {
  let errors = {};

  // Convert empty fields to an empty string to use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";

  // check Email
  if (!Validator.isEmpty(data.email)) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
