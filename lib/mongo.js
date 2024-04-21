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
    if (!this.db) {
      console.error("Attempt to create a room without database connection.");
      throw new Error("Database not connected");
    }
    const roomId = new mongoose.Types.ObjectId().toString(); // Generate a unique roomId
    const newRoom = new Room({ roomId });

    // Log before saving to database
    console.log("Creating a new room with ID:", roomId);

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
    if (!this.db) {
      throw new Error("Database not connected");
    }
    try {
      // Example: Fetch messages based on roomId
      const room = await this.db.models.ChatRoom.findOne({ roomId: roomId });
      return room ? room.messages : [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
}

module.exports = MongooseClient;
