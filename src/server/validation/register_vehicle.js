const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function vehicleRegisterInput(data) {
  let errors = {};

  data.licenseplatenumber = !isEmpty(data.licenseplatenumber) ? data.licenseplatenumber : "";
  data.rcenddate = !isEmpty(data.rcenddate) ?new Date( data.rcenddate ): "";
  data.pucenddate = !isEmpty(data.pucenddate) ?new Date( data.pucenddate ): "";
  data.fitnessenddate = !isEmpty(data.fitnessenddate) ?new Date( data.fitnessenddate ): "";
  data.quarterlytaxenddate = !isEmpty(data.quarterlytaxenddate) ?new Date( data.quarterlytaxenddate ): "";
  data.greentaxenddate = !isEmpty(data.greentaxenddate) ?new Date( data.greentaxenddate ): "";
  data.insuranceenddate = !isEmpty(data.insuranceenddate) ?new Date( data.insuranceenddate ): "";
  
  // console.log(data)

  //numberplate
  if (Validator.isEmpty(data.licenseplatenumber)) {
    errors.licenseplatenumber = "License plate number is required field is required";
  }
  if (!Validator.isLength(data.licenseplatenumber, {max: 10 })) {
    errors.licenseplatenumber = "Invalid license plate";
  }
  
  //date check
  if (data.rcenddate === "") {
    errors.rcenddate = "Empty field not allowed";
  }
  if (data.pucenddate ==="") {
    errors.pucenddate = "Empty field not allowed";
  }
  if (data.fitnessenddate ==="") {
    errors.fitnessenddate = "Empty field not allowed";
  }
  if (data.quarterlytaxenddate ==="") {
    errors.quarterlytaxenddate = "Empty field not allowed";
  }
  if (data.greentaxenddate ==="") {
    errors.greentaxenddate = "Empty field not allowed";
  }
  if (data.insuranceenddate ==="") {
    errors.insuranceenddate = "Empty field not allowed";
  }

  // console.log(typeof(new Date(data.rcenddate)))
  // console.log(typeof(new Date()))
  // console.log(data.rcenddate < new Date())
  // console.log(new Date(data.rcenddate))

  var date = new Date()

  if (data.rcenddate < date) {
    errors.rcenddate = "Invalid expiry date : cannot be before tommorrow";
  }
  if (data.pucenddate < date) {
    errors.pucenddate = "Invalid expiry date : cannot be before tommorrow";
  }
  if (data.fitnessenddate < date) {
    errors.fitnessenddate = "Invalid expiry date : cannot be before tommorrow";
  }
  if (data.quarterlytaxenddate < date) {
    errors.quarterlytaxenddate = "Invalid expiry date : cannot be before tommorrow";
  }
  if (data.greentaxenddate < date) {
    errors.greentaxenddate = "Invalid expiry date : cannot be before tommorrow";
  }
  if (data.insuranceenddate < date) {
    errors.insuranceenddate = "Invalid expiry date : cannot be before tommorrow";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

};