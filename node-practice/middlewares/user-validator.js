const { check, validationResult } = require("express-validator");
const userValidator = [
    check('username').notEmpty().withMessage("Enter Username Correctly!!")
        .isAlphanumeric().withMessage("It should contain numbers also")
        .isLength({min:3}).withMessage("Username must have 3 characters"),
    check('email').isEmail().withMessage("Enter Proper email")
        .notEmpty().withMessage("Email is required"),
    check("password").isStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 }).withMessage("Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {userValidator,validate};