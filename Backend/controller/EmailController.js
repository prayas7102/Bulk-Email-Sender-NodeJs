const emailModel = require('../models/emailModel');
const nodemailer = require('nodemailer');
const nodeSchedule = require('node-schedule');

const StringFilter = (str) => {
    const date = new Date(str).toLocaleDateString();
    const time = new Date(str).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    let strArr = date.split("/");
    strArr = strArr.concat(time.split(":"));
    strArr[strArr.length - 1] = strArr[strArr.length - 1].replace(/\D/g, '');
    return strArr;
}

const SendEmail = async (req, res) => {

    const msg = req.body.msg;
    const timeArr = StringFilter(Object(req.body.time));

    console.log(timeArr);

    const job = nodeSchedule.scheduleJob(`${timeArr[2]} ${timeArr[1]} ${timeArr[0]} ${timeArr[3]} ${timeArr[4]}`,
        function () {

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
                        });
                })
                .catch(error => {
                    console.log(error)
                    return res.status(500).json({ error })
                });
                
        })
}

const GetEmail = async (req, res) => {
    const emailList = await emailModel.find({});
    if (emailList.length) {
        return res.status(200).json({
            success: false,
            "emailList": emailList
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