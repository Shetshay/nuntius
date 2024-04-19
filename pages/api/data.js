// pages/api/data.js
const clientPromise = require("../../lib/mongodb");

async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(); // add your database name if necessary
    // Example: const collection = db.collection('yourCollection');
    // Perform actions on the collection object

    res.status(200).json({ message: "Connected to MongoDB successfully!" });
  } catch (e) {
    console.error("Failed to retrieve data:", e);
    res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
}

export default handler;
