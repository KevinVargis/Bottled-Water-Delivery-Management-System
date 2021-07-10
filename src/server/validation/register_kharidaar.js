const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function kharidaarRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.aadharnum = !isEmpty(data.aadharnum) ? data.aadharnum : "";
  data.phonenum = !isEmpty(data.phonenum) ? data.phonenum : "";
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.line1 = !isEmpty(data.line1) ? data.line1 : "";
  data.line2 = !isEmpty(data.line2) ? data.line2 : "";
  data.line3 = !isEmpty(data.line3) ? data.line3 : "";
  data.pincode = !isEmpty(data.pincode) ? data.pincode : "";
  data.type = !isEmpty(data.type) ? data.type : "";

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

  // Phonenum check
  if (Validator.isEmpty(data.phonenum)) {
    errors.phonenum = "Phone number is required";
  }
  else if (!Validator.isLength(data.phonenum, { min: 10, max: 10 })) {
    errors.phonenum = "Phone number must be 10 a digit number";
  }

  // Aadharnum check 
  if (Validator.isEmpty(data.aadharnum)) {
    errors.aadharnum = "Aadhar number is required";
  }
  else if (!Validator.isLength(data.aadharnum, { min: 12, max: 12 })) {
    errors.aadharnum = "Aadhar number must be 12 a digit number";
  }
  
  // Password checks
  if (Validator.isEmpty(data.password1)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
    errors.password1 = "Password must be between 6 and 30 characters";
  }
  if (!Validator.equals(data.password1, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  //address checks
  if (Validator.isEmpty(data.line1)) {
      errors.line1 = "Please complete the address";
  }
  if (Validator.isEmpty(data.line2)) {
    errors.line2 = "Please complete the address";
  }
  if (Validator.isEmpty(data.line3)) {
    errors.line3 = "Please complete the address";
  }

  if (Validator.isEmpty(data.pincode)) {
    errors.pincode = "Please complete the address";
  }

  if (!Validator.isLength(data.pincode, {min:6, max:6})) {
    errors.pincode = "Invalid pincode";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };

};