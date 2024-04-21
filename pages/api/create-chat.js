// pages/api/create-chat.js
import MongooseClient from "../../lib/mongo"; // Correct import path assumed

export default async function handler(req, res) {
  const client = new MongooseClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const room = await client.createRoom();
    console.log("Room created successfully", room);
    res.status(200).json({ roomId: room.roomId });
  } catch (error) {
    console.error("Failed to create room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
