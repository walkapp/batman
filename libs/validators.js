var
  ALPHANUMERIC_REGEXP = /^[a-zA-Z0-9]*$/,

  validator = function (errorCode, validator) {
    return {
      message: errorCode,
      validator: validator
    };
  };

export default {
  maxLength: (max) => {
    return validator('longer_than_allowed', (val) => {
      return val.length < max;
    });
  },

  minLength: (min) => {
    return validator('shorter_than_allowed', (val) => {
      return val.length > min;
    });
  },

  alphanumeric: () => {
    return validator('alphanumeric', (val) => {
      return ALPHANUMERIC_REGEXP.test(val);
    });
  },

  // Built-in validators
  required: () => {
    return [true, 'required'];
  }
};
