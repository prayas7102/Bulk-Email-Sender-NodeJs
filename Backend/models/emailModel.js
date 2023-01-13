const mongoose = require('mongoose');
const emailModel = mongoose.Schema(
    {
        senderName: { type: String },
        recieverName: { type: String },
        body: { type: String },
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model("Chat", emailModel);
module.exports = Chat;