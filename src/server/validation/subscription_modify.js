const Validator = require("validator");
const isEmpty = require("is-empty");
const { validate } = require("../models/Company");
const { default: validator } = require("validator");


module.exports = function subscriptionChangeInput(data) {

    let errors = {};

    data.subscansrequired = !isEmpty(data.subscansrequired) ? data.subscansrequired : "";

    // if (Validator.isEmpty(data.subscansrequired)) {
        // errors.subscansrequired = " subscription cans amount are required ";
    // }
    data.subscansrequired = parseInt(data.subscansrequired)
    if (data.subscansrequired < 0) {
        errors.subscansrequired = "Required cans cannot be less than 0"
    }

    data.day = parseInt(data.day)
    if (data.day < 0 || data.day > 6) {
        errors.day = "Invalid day"
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
      };
}