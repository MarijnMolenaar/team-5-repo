
// // Data die ingevoerd wordt via de registreert wordt gevalideert.
// exports.validateUserSignUp = [
//     check('name').trim().not().isEmpty().withMessage('Voornaam is leeg').isLength({
//         min: 3,
//         max: 20
//     }).withMessage('Voornaam moet tussen 3 en 20 karakters zijn'),
   
//     check('mail').normalizeEmail().isEmail().withMessage('Email is niet geldig').isLength({
//         min:5, 
//         max: 20
//     }).withMessage('De Email moet tussen de 5 en 20 karaoters zijn '),
  
// ]

// exports.userValidation = (req, res, next) => {
//     const result = validationResult(req).array();


//     if (result.length > 0) {
//         res.render('registreren', {
//             err: result,
		    
//         });
//     } else {
//         return
//     }
// }