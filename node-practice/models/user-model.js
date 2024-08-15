// const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcrypt');
// require('../config/mongoose-connection');

// const userSchema = mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//         unique:true,
//         trim:true,
//         minlength:[3,"Username should contain more than 3 characters"],
//         maxlength:[10,"Username should contain less then 10 characters"],
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         trim:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw Error("Enter Correct Email");
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         unique:true,
//         trim:true,
//         minlength:[8,"Password should contain more than 8 characters"],
//         validator(value){
//             if(!validator.isStrongPassword(value,{
//                 minLength:1,
//                 maxlength:8,
//                 minLowercase:1,
//                 minUppercase:1,
//                 minNumbers:1,
//                 minSymbols:1
//             })){
//                 throw Error("Password should contain at least one uppercase letter, one lowercase letter, one number and one special character");
//             }
//         }
//     },
//     image:{
//         type:String,
//         required:true,
//         validate:{
//             validator(value){
//                 if(!/\.jpg|jpeg|png|gif$/i.test(value)){
//                     throw new Error("Enter valid Image");
//                 }
//             }
//         }
//     },
//     age:{
//         type:Number,
//         required:true,
//         min:[18,"Minimum age should be 18"],
//         trim:true,
//     }
// });

// // Step 3: Encrypt the password before saving
// userSchema.pre('save', async function(error,next) {
//     try {     
//         const user = this;
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//         next();
//     } catch (error) {
//         throw new Error(error);
//     }
// });


// module.exports = mongoose.model("user",userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
require('../config/mongoose-connection');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, "Username should contain more than 3 characters"],
        maxlength: [10, "Username should contain less than 10 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter a valid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [8, "Password should contain more than 8 characters"],
        validate: {
            validator(value) {
                if (!validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                })) {
                    throw new Error("Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character");
                }
            },
            message: "Password validation failed"
        }
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                if (!/\.jpg|jpeg|png|gif$/i.test(value)) {
                    throw new Error("Enter a valid Image");
                }
            },
            message: "Image validation failed"
        }
    },
    age: {
        type: Number,
        required: true,
        min: [18, "Minimum age should be 18"],
        trim: true,
    }
});

// Encrypt the password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            next();
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    } else {
        next();  // If the password hasn't been modified, continue without hashing
    }
});

module.exports = mongoose.model("User", userSchema);
