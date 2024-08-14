const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'images/uploads/' })

const {getUser,userCreate} = require("../controllers/user-controller")

router.route("/").get(getUser);

router.route("/create").get(upload.none(),userCreate);

module.exports = router;