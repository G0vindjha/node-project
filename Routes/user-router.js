const express = require('express');
const router = express.Router();

const {getUser,userCreate} = require("../controllers/user-controller")

router.route("/").get(getUser);

router.route("/create").get(userCreate);

module.exports = router;