const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  // other fields...
});

// Prevent model overwriting and ensure the model is compiled only once
const ChatRoom =
  mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
