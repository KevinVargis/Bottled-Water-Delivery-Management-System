const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function companyRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.GSTNo = !isEmpty(data.GSTNo) ? data.GSTNo : "";
  data.line1 = !isEmpty(data.line1) ? data.line1 : "";
  data.line2 = !isEmpty(data.line2) ? data.line2 : "";
  data.line3 = !isEmpty(data.line3) ? data.line3 : "";
  data.pincode = !isEmpty(data.pincode) ? data.pincode : "";
  // console.log(data)
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } 
  else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (Validator.isEmpty(data.line1)) {
      errors.line1 = "Please complete the address"
  }
  if (Validator.isEmpty(data.line2)) {
    errors.line2 = "Please complete the address"
  }
  if (Validator.isEmpty(data.line3)) {
    errors.line3 = "Please complete the address"
  }

  if (Validator.isEmpty(data.pincode)) {
    errors.pincode = "Please complete the address"
    // console.log("ho rha hai ye")
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };

};