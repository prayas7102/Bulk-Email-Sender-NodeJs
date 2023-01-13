const mongoose = require('mongoose');
const chatModel = mongoose.Schema(
    {
        senderName: { type: String },
        recieverName: { type: String },
        body: { type: String },
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;