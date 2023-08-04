import validator from "validator";

export const validateInputs = ({
  data,
  type,
  minLength,
  maxLength,
  length,
  required,
}) => {
  if (required && (data === "" || data === null)) {
    return "This is a required field";
  }

  if (data === null) return null;

  if (type && data.toString().length !== 0) {
    switch (type) {
      case "alpha":
        if (!validator.isAlpha(data, "en-GB", { ignore: " -" })) {
          return "Please enter Alphabetical characters only";
        }
        break;
      case "alphaNumeric":
        if (!validator.isAlphanumeric(data, "en-GB", { ignore: " -" })) {
          return "Please enter Alphanumeric characters only";
        }
        break;
      case "int":
        if (!validator.isInt(data, "en-GB")) {
          return "Please enter Numeric characters only";
        }
        break;
      case "postcode":
        if (!validator.isPostalCode(data, "GB")) {
          return "Please enter a valid UK postcode";
        }
        break;
      case "mobile":
        if (!validator.isMobilePhone(data, "en-GB")) {
          return "Please enter a valid UK phone number";
        }
        break;
      case "email":
        if (!validator.isEmail(data)) {
          return "Please enter a valid email address";
        }
        break;
      default:
        console.log("No validation exists for this type");
    }
  }

  if (length && data.toString().length !== length) {
    return `Please enter ${length} characters`;
  }
  if (maxLength && minLength) {
    if (
      data.toString().length < minLength ||
      data.toString().length > maxLength
    ) {
      return `Please enter between ${minLength} and ${maxLength} characters`;
    }
  }
  if (minLength && data.toString().length < minLength) {
    return `The minimum length for this field is ${minLength} characters`;
  }
  if (maxLength && data.toString().length > maxLength) {
    return `The maximum length for this field is ${maxLength} characters`;
  }

  return null;
};
