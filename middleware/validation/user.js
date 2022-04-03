const req = require("express/lib/request");

const {check, validationResult} = require('express-validator');

exports.validateUserSignUp = [
    check('name').trim().not().isEmpty().isLenght({min: 3, max: 20}).
    withMessage('Name must be within 3 to 20 character!'), 

    check('confirmName').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.confirmName){
            throw new error('name is not the same!')
        }
        return true;
    })

]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
	

    if (result.length > 0) {
        res.render('registreren', {
            err: result,
		    
        });
    } else {
        return
    }
}