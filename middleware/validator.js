// const {check,validationResult} = require('express-validator');


// const validateUser = [
//     check('username').isLength({min:3,max:5}).withMessage("Enter Username properly"),
//     check('email').isEmail().withMessage("Enter Proper Email"),
//     (req,res,next) => {
//         const error = validationResult(req);
//         if(!error.isEmpty()){
//             return res.status(400).json({errors:error.array()})
//         }
//         next();
//     }
// ];
// module.exports = {validateUser}

const {check,validationResult} = require('express-validator');
const {showExpressError} = require("../middleware/errorThow");


validateUser = [
    check('username').isLength({min:3,max:5}).withMessage("Enter username properly"),
    check('email').isEmail().withMessage("Enter Email Properly"),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            showExpressError(errors,res)
        }
        next();
    }

];

module.exports = {validateUser}