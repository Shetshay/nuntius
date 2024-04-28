// pages/api/chat/[roomId]/sendMessage.js
import MongooseClient from "../../../lib/mongo"

export default async function handler(req, res) {
  
  const { message, roomId } = req.body; // Ensure these are sent from the client

  const client = new MongooseClient(process.env.MONGODB_URI);
  await client.connect();

  try {
    await client.createMessage(roomId, message); // This function needs to be defined in your MongooseClient
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
}
