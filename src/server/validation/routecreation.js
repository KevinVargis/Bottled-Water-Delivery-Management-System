const Validator = require("validator");
const isEmpty = require("is-empty");

const Inventory = require("../models/Inventory");


module.exports = function routecreation(data) {

    let errors = {};

    data.totalcansrequired = !isEmpty(data.totalcansrequired) ? data.totalcansrequired : "";

    // if (Validator.isEmpty(data.totalcansrequired)) {
    //     errors.totalcansrequired = "Cans amount are required ";
    // }
    data.totalcansrequired = parseInt(data.totalcansrequired)
    if (data.totalcansrequired < 0) {
        errors.totalcansrequired = "Required cans cannot be less than 0"
    }

    if (data.customers.length == 0) {
        errors.customers = "We need a customer to create a route    "
    }
    // console.log(errors)
    return {
        errors,
        isValid: isEmpty(errors)
    };
}