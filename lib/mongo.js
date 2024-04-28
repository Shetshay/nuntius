// lib/mongo.js or wherever your MongooseClient class is defined
const mongoose = require("mongoose");
const Room = require("./models/ChatRoom"); // Ensure this path is correct

class MongooseClient {
  constructor(uri) {
    this.uri = uri;
    this.db = null; // We will use this to check if we're already connected
  }

  async connect() {
    if (this.db) {
      console.log("Using existing database connection.");
      return this.db; // Use existing connection if already connected
    }
    try {
      this.db = await mongoose.connect(this.uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error; // Rethrow to handle it in API endpoints
    }
  }

  async createRoom() {
    const newRoom = new Room({
      roomId: new mongoose.Types.ObjectId().toString(),
      messages: [], // Assuming messages can be empty initially
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 86400000), // Expires one day from now
    });
    try {
      await newRoom.save();
      console.log("Room created successfully", newRoom);
      return newRoom;
    } catch (error) {
      console.error("Failed to save the new room:", error);
      throw error; // Properly handle the error
    }
  }

  async fetchMessages(roomId) {
    try {
      // Example: Fetch messages based on roomId
      const room = await this.db.models.ChatRoom.findOne({
        roomId: roomId,
      });
      console.log("the roooom:", room);
      return room ? room.messages : [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }

  async createMessage(roomId, messageText, sender = "Anonymous") {
    try {
      const result = await this.db.models.ChatRoom.findOneAndUpdate(
        { roomId: roomId },
        {
          $push: {
            messages: {
              messageText: messageText,
              sender: sender,
              timestamp: new Date(),
            },
          },
        },
        { new: true }
      );
      console.log("Message added:", result);
      return result;
    } catch (error) {
      console.error("Failed to add message to room:", error);
      throw error;
    }
  }
}

module.exports = MongooseClient;
