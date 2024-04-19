import { randomBytes } from "crypto";
import MongooseClient from "../../lib/mongo";

export default async function handler(req, res) {
  try {
    const client = new MongooseClient(process.env.MONGODB_URI); // Use an environment variable for the URI
    await client.connect();

    // Assuming createRoom is properly implemented and returns an object with roomId
    let { roomId } = await client.createRoom();

    res.status(200).json({ roomId: roomId });
  } catch (error) {
    console.error("Failed to handle request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
