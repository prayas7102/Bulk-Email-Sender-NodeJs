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
    const EMAIL=process.env.EMAIL;
    const [day, month, year, hour, minute] = StringFilter(Object(req.body.time));
    const recieverArr = ["prayas.prithvirajpratap7@gmail.com", "prayas7102@gmail.com"];
    // console.log(timeArr)
    //     *    *    *    *    *    *
    //     ┬    ┬    ┬    ┬    ┬    ┬
    //     │    │    │    │    │    │
    //     │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    //     │    │    │    │    └───── month (1 - 12)
    //     │    │    │    └────────── day of month (1 - 31)
    //     │    │    └─────────────── hour (0 - 23)
    //     │    └──────────────────── minute (0 - 59)
    //     └───────────────────────── second (0 - 59, OPTIONAL)

    const date = new Date(year, month, day, hour, minute, 0);

    const job = nodeSchedule.scheduleJob(date, function () {
        console.log(timeArr);
        let transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            secure: true,
            auth: {
                user: EMAIL,
                pass: process.env.PASSWORD,
            },
            service: process.env.SMPT_SERVICE
        });

        let message = {
            from: EMAIL, // sender address
            to: recieverArr, // list of receivers
            subject: "From bulk email sender", // Subject line
            text: msg, // plain text body
            html: msg
        }

        transporter.sendMail(message)
            .then(async(info) => {

                for(let recv of recieverArr){
                    const email = await emailModel.create({ EMAIL, recv, msg, date});
                    await email.save();
                }
                
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
    job.schedule();
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