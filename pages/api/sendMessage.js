// pages/api/chat/sendMessage.js
const MongooseClient = require("../../lib/mongodb");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { roomId, userId, message } = req.body;
    const client = new MongooseClient(process.env.MONGODB_URI);
    await client.connect();
    const newMessage = await client.addMessage(roomId, userId, message);
    res.status(201).json(newMessage);
  } else {
    res.status(405).end();
  }
}
