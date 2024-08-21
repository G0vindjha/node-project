const { check, validationResult } = require("express-validator");
const userValidator = (req, res, next) => {[
    check('username').notEmpty().withMessage("Enter Username Correctly!!")
        .isAlphanumeric().withMessage("It should contain numbers also"),
    check('email').isEmail().withMessage("Enter Proper email")
        .notEmpty().withMessage("Email is required"),
    check("password").isStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 }).withMessage("Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    check("image").isMimeType("image/jpeg", "image/jpg", "image/png", "image/gif").withMessage("Enter valid image")
]
const result = validationResult(req);
if(!result.isEmpty()){
    return result.array();
}
next();
};

module.exports = {userValidator};