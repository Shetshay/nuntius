const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'video', 'audio'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const sessionMessages = mongoose.model("Messages", messageSchema);
sessionMessages.createCollection().then(console.log("Collection successfully created."))


const sessionSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        default: null
    },
    avatar: {
        type: Number,
        required: true,
        min: 0,
        max: 9
    },
    messages: [messageSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActiveAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Session', sessionSchema);
