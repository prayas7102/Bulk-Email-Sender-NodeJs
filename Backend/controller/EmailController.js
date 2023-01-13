const email = require('../models/emailModel');

const SendEmail = async (req, res) => {
    res.status(201).json({
        status:"working"
    })
}

module.exports = { SendEmail };

