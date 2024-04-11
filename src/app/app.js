const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(cookieParser());
const uri =
"mongodb+srv://jarl:Good54321@dev-nuntius.ksxbiwd.mongodb.net/nuntius?retryWrites=true&w=majority&appName=dev-nuntius";


async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  const messageCollection = mongoose.model("messages", message);
  const sessionCollection = mongoose.model("sessions", session);
}

app.post('/api/create-new-post', async (req, res) => {
  try {
    const {username, message} = req.body;
    const sessionID = req.session.sessionID;
  
    const msgDoc = {
      username: username,
      message: message,
      timestamp: Date.now()
    }
  
    const theSessionRoom = await session.findById(sessionID);
    theSessionRoom.messages.push(msgDoc);
    await theSessionRoom.save();
  
    if (theSessionRoom) {
      const success = "Message successfully added";
      res.json(success);
      console.log(success);
    } else {
      const failure = "The message was not sent";
      res.json(failure);
      console.error(failure);
    }
  } catch (error) {
    console.error("There has been an error creating a new post: " + error);
    res.status(500).send("Internal server error");
  }
})

// this will take in the session ID and pull all the messages
// associated with the session ID

// Main goals: Look into socket.io an get that going
//             Rough draft of React.js code

app.get('/api/fetch-posts', async (req, res) => {
  try {
    const sessionID = req.session.sessionID;
    const response = await session.find({_id: sessionID});

    if (response.length !== 0) {
      const fetchedPosts = response.data.messages;
      console.log("Session messages successfully retrieved.");
      res.json({messageData: fetchedPosts});
    } else {
      const failure = "Unable to retrieve messages";
      console.error(failure);
      res.json(failure);
    }

  } catch (error) {
    console.error("There has been an error retrieving posts: " + error);
    res.status(500).send("Internal server error");
  }  
})

connect();

app.listen(port, () => {
  console.log("Server started on port " + port);
});
