const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique:true
  },
 messages: [{
    messageText: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      default: 'Anonymous',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '1d' }  // Automatically delete the chat room after 1 day
  }  
});

// Prevent model overwriting and ensure the model is compiled only once
const ChatRoom =
  mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
