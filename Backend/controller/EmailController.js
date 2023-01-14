const emailModel = require('../models/emailModel');
const nodemailer = require('nodemailer');

const SendEmail = async (req, res) => {

    console.log(req.body)
    const msg=req.body.msg;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: true, 
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD, 
        },
        service: process.env.SMPT_SERVICE
    });

    let message = {
        from: process.env.EMAIL, // sender address
        to: ["prayas.prithvirajpratap7@gmail.com", "prayas7102@gmail.com"], // list of receivers
        subject: "From bulk email sender", // Subject line
        text: msg, // plain text body
        html: msg
    }

    transporter.sendMail(message).then((info) => {
        return res.status(200)
            .json({
                msg: "you should receive an email",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({ error })
    })
}

module.exports = { SendEmail };