const multer = require("multer")
const bcrypt = require('bcrypt');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.IMG_PATH)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    }
});

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUND));
        const hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        throw Error("Something Went Wrong");
    }
};
// const encryptPassword = async (password) => {
//     try {
//         const saltRounds = parseInt(process.env.SALTROUND, 10);
//         const salt = await bcrypt.genSalt(saltRounds);
//         const hash = await bcrypt.hash(password, salt);
//         return hash;
//     } catch (err) {
//         console.error(err);
//         throw new Error('Password encryption failed');
//     }
// };
module.exports = {storage,encryptPassword}