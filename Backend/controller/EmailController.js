const emailModel = require('../models/emailModel');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const SendEmail = async (req, res) => {

    const { EMAIL, PASSWORD } = process.env;

    /** testing account */
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
    }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
            .json({
                msg: "you should receive an email",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
    }).catch(error => {
        return res.status(500).json({ error })
    })
}

module.exports = { SendEmail };

