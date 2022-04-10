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
    }),

    check('age').trim().not().isEmpty().withMessage('- Fill in you date of birth'),
  
   
    check('mail').trim().not().isEmpty().withMessage('- Email is empty'),

    check('ConfirmEmail').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.mail){
            throw new Error('- email is not the same!')
        }
        return true;
    }), 

    check('password').trim().not().isEmpty().withMessage('- Password is empty'). isLength({min: 3, max: 20}),  
    

    check('ConfirmPassword').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('- name is not the same!')
        }
        return true;
    }),
 
    check('name_a').trim().not().isEmpty().withMessage('- You must fill in the name of your animale'). isLength({min: 3, max: 20}), 
    

    check('confirmName_a').trim().not().isEmpty().custom((value, {req}) => {
        if(value !== req.body.name){
            throw new Error('- The name of you animal is not the same!')
         }
         return true;
     }),

     check('age_a').trim().not().isEmpty().withMessage('- Fill in you date of birth'),
  
]

