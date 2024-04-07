const mongoose = require("mongoose");

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
    messages: [{
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
    }],
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
