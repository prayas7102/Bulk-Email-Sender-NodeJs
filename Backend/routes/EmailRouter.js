const express = require('express');
const router = express.Router();
const { SendEmail, GetEmail } = require("../controller/EmailController")

router.route('/send-email').post(SendEmail);
router.route('/get-emails').get(GetEmail);

module.exports = router;