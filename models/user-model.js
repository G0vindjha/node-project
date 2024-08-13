const mongoose = require('mongoose');
// const validator = require('validator');
const conn = require('../config/mongoose_connection');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});


module.exports = mongoose.model("user", userSchema);