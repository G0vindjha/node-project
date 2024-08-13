const mongoose = require('mongoose');
const validator = require('validator');
const conn = require('../config/mongoose_connection');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate:{
            validator(value){
                if(validator.isEmpty(value) <= 3){
                    throw Error("Enter Username");
                }
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate:{
        //     validator: (value)=>{
        //         return value  !== "hii"
        //     },
        //     message:"error h bhai"
        // }
        validate:{
            validator(value){
                if(!validator.isEmail(value)){
                    throw Error("Invalid Email!!");
                }
            }
        }

    }
});


module.exports = mongoose.model("user", userSchema);