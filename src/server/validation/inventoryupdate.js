const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function supervisorRegisterInput(data,changes) {

    let errors = {};
    changes.filledadded = parseInt(!isEmpty(changes.filledadded) ? changes.filledadded : 0);
    changes.filledremoved = parseInt(!isEmpty(changes.filledremoved) ? changes.filledremoved : 0);
    changes.emptyadded = parseInt(!isEmpty(changes.emptyadded) ? changes.emptyadded : 0);
    changes.emptyremoved = parseInt(!isEmpty(changes.emptyremoved) ? changes.emptyremoved : 0);
    changes.damagedadded = parseInt(!isEmpty(changes.damagedadded) ? changes.damagedadded : 0);
    changes.damagedremoved = parseInt(!isEmpty(changes.damagedremoved) ? changes.damagedremoved : 0);

    filledchanges = changes.filledadded - changes.filledremoved
    damagedchanges = changes.damagedadded - changes.damagedremoved
    emptychanges = changes.emptyadded - changes.emptyremoved
    if (changes.filledadded<0) {
        errors.filledadded = "cannot be less than 0"
    }
    if (changes.filledremoved<0) {
        errors.filledremoved = "cannot be less than 0"
    }
    if (changes.emptyadded<0) {
        errors.emptyadded = "cannot be less than 0"
    }
    if (changes.emptyremoved<0) {
        errors.emptyremoved = "cannot be less than 0"
    }
    if (changes.damagedadded<0) {
        errors.damagedadded = "cannot be less than 0"
    }
    if (changes.damagedremoved<0) {
        errors.damagedremoved = "cannot be less than 0"
    }
    
    if ((data.filled + filledchanges)<0) {
        errors.filled = "Negatve number of cans not allowed"
    }

    if ((data.damaged + damagedchanges)<0) {
        errors.damaged = "Negatve number of cans not allowed"
    }

    if ((data.empty + emptychanges)<0) {
        errors.empty = "Negatve number of cans not allowed"
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };

};