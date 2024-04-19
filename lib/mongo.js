const mongoose = require("mongoose");
const crypto = require("crypto");

class MongooseClient {
  constructor(uri) {
    this.uri = uri;
    this.db = null;
  }

  async connect() {
    if (!this.db) {
      try {
        const conn = await mongoose.connect(this.uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        this.db = conn;
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
      }
    }
  }

  async createRoom() {
    // write the code that creates the mongoDB record
    const id = crypto.randomUUID();

    return {
      roomId: id,
    };
  }

  // this gets called by anythign that needs a message history
  async fetchMessages(roomId) {
    ///  write the monggose fetch query

    return {
      messages: [
        {
          roomId: "12345",
          message: "Hello! Welcome to the chat room.",
          createdAt: "2024-04-18T12:00:00.000Z",
        },
        {
          roomId: "12345",
          message: "How can I assist you today?",
          createdAt: "2024-04-18T12:05:00.000Z",
        },
        {
          roomId: "12345",
          message: "Thank you for using our platform.",
          createdAt: "2024-04-18T12:10:00.000Z",
        },
      ],
    };
  }

  // this adds a message and returns that new message
  async addMessage(roomId, message) {
    const newMessage = new Message({ roomId, message });
    await newMessage.save();
    return newMessage;
  }
}

module.exports = MongooseClient;
