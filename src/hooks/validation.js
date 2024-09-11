export const ValidationRuleNames = {
  isRequired: "isRequired",
  maxLength: "maxLength",
  minLength: "minLength",
  isEmail: "isEmail",
  isInteger: "isInteger",
  isFloat: "isFloat",
  customValidation: "customValidation",
  compare: "compare",
  customValidationAsync: "customValidationAsync"
};

const Validation = async (fieldValue, key, value) => {
  let result;

  switch (key) {
    case ValidationRuleNames.isRequired:
      if (value && !fieldValue) {
        return "Required";
      }
      break;

    case ValidationRuleNames.maxLength:
      if (fieldValue.length > value) {
        return "Maximum length should be " + value;
      }
      break;

    case ValidationRuleNames.minLength:
      if (fieldValue.length < value) {
        return "Minimum length should be " + value;
      }
      break;

    case ValidationRuleNames.isEmail:
      if (value && !(/\S+@\S+\.\S+/.test(fieldValue))) {
        return "Not a valid email";
      }
      break;

    case ValidationRuleNames.isInteger:
      if (value && !Number.isInteger(Number(fieldValue))) {
        return "Only Numeric value";
      }
      break;

    case ValidationRuleNames.isFloat:
      const regex = new RegExp(`^\\d+(\\.\\d{1,${value > 1 ? value - 1 : value}})?$`);
      if (regex.test(fieldValue)) {
        return `more than ${value} decimal points`;
      }
      break;

    case ValidationRuleNames.customValidation:
      return value(fieldValue);

    case ValidationRuleNames.customValidationAsync:
      return await value(fieldValue);

    default:
      return result;
  }
};

export default Validation;
