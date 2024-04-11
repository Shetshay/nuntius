const express = require("express");

const mongoose = require("mongoose");
const app = express();
const port = 3000;

const uri =
  "mongodb+srv://jarl:Good54321@dev-nuntius.9qic6cb.mongodb.net/?retryWrites=true&w=majority&appName=dev-nuntius";

async function connect_and_create() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  const message = new mongoose.Schema({
    username: String,
    message: String
  }, {
    timestamps: true
  });

  const session = new mongoose.Schema({
    sessionID: String,
    messages: [message]
  })

  const messageCollection = mongoose.model("Message", message);
  const sessionCollection = mongoose.model("Session", session);

  messageCollection.createCollection().then(
    console.log("Collection successfully created: Message")
  )
  sessionCollection.createCollection().then(
    console.log("Collection successfully created: Session")
  )

}

connect_and_create();

app.listen(port, () => {
  console.log("Server started on port " + port);
});
