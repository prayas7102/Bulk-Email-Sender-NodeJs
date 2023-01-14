const emailModel = require('../models/emailModel');
const nodemailer = require('nodemailer');
const nodeSchedule = require('node-schedule');

const SendEmail = async (req, res) => {

    const msg = req.body.msg;
    const time = String(req.body.time);

    const job = nodeSchedule.scheduleJob('* * * * *', function () {
    })

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

    transporter.sendMail(message)
        .then((info) => {
            return res.status(200)
                .json({
                    msg: msg,
                    info: info.messageId,
                    preview: nodemailer.getTestMessageUrl(info)
                })
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({ error })
        })
}

const GetEmail = async (req, res) => {
    const emailList = await emailModel.find({});
    if (emailList.length) {
        return res.status(200).json({
            success: false,
            message: emailList
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: []
        });
    }
}

module.exports = { SendEmail, GetEmail };