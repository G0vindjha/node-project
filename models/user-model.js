const mongoose = require('mongoose');
const conn = require('../config/mongoose_connection');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: ['/^\s+@\s+$/','Please Enter valid Email']
    }
});


module.exports = mongoose.model("user", userSchema);