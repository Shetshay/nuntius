const express = require("express");

const mongoose = require("mongoose");
const app = express();
const port = 3000;

const uri =
  "mongodb+srv://jarl:Good54321@dev-nuntius.9qic6cb.mongodb.net/?retryWrites=true&w=majority&appName=dev-nuntius";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  const mySchema = new mongoose.Schema({
    artistName: String,
    genre: String,
    bestSong: String
  })

  const myCollection = mongoose.model("Artists", mySchema);

  /*
  myCollection.createCollection().then(
    console.log("Collection successfully created.")
  )
  

  const bgDoc = {
    artistName: "Bee Gees",
    genre: "Disco",
    bestSong: "Night Fever"
  }

  const rsDoc = {
    artistName: "The Rolling Stones",
    genre: "Rock",
    bestSong: "Paint It Black"
  }

  const mDoc = {
    artistName: "Mariya Takeuchi",
    genre: "J-Pop",
    bestSong: "Plastic Love"
  }

  const bDoc = {
    artistName: "The Beatles",
    genre: "Rock",
    bestSong: "She Loves You"
  }

  myCollection.create(bgDoc);
  myCollection.create(rsDoc);
  myCollection.create(mDoc);
  myCollection.create(bDoc);
  */
}

connect();

app.listen(port, () => {
  console.log("Server started on port " + port);
});
