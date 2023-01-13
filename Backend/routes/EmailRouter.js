const express = require('express');
const router = express.Router();
const {SendEmail}=require("../controller/EmailController")

router.route('/send-email').post(SendEmail);

module.exports = router;