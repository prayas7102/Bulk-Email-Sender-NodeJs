const email = require('../models/emailModel');

const SendEmail = async (req, res) => {
    console.log('in server')
    res.status(201).json({
        status:"working"
    })
}

module.exports = { SendEmail };

