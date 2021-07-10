const Validator = require("validator");
const isEmpty = require("is-empty");



module.exports = function requestInput(data) {

    let errors = {};

    data.cansrequired = !isEmpty(data.cansrequired) ? data.cansrequired : "";
    data.deliverydate = !isEmpty(data.deliverydate) ? new Date(data.deliverydate) : "";


    // if (Validator.isEmpty(data.cansrequired)) {
    //     errors.cansrequired = " cans amount are required ";
    // }
    data.cansrequired = parseInt(data.cansrequired)
    if (data.cansrequired < 0) {
        errors.cansrequired = "Required cans cannot be less than 0"
    }

    var date = new Date()

    if (data.deliverydate < date) {
        errors.deliverydate = "Time travel to the past is not possible"
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
      };
}