import Validator from "validator";
import isEmpty from "is-empty";

export function validateCommentInput(data) {
  let errors = {};

  // Convert empty fields to an empty string to use validator functions
  data.text = !isEmpty(data.text) ? data.text : "";

  // check Text
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
