 const req = require("express/lib/request");

const {
    check,
    validationResult
} = require('express-validator');

exports.validateUserSignUp = [
    check('name').trim().not().isEmpty().withMessage('- Name is empty'). isLength({min: 3, max: 20}).
    withMessage('- Name must be within 3 to 20 character!'), 
    

    check('confirmName').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.name){
            throw new Error('- name is not the same!')
        }
        return true;
    })

]




