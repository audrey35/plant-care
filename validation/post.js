import Validator from "validator";
import isEmpty from "is-empty";

export function validatePostInput(data) {
  let errors = {};

  // Convert empty fields to an empty string to use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  // check Title
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  // check Text
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
