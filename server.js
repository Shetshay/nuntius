// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Session = require('./models/session'); // Adjust the path according to your project structure

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection (Adjust the URI)
const uri = "mongodb+srv://shetshay:Good54321@dev-nuntius.ksxbiwd.mongodb.net/nuntius?retryWrites=true&w=majority&appName=dev-nuntius";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB...", err));

// Routes
// POST /create-session route
app.post('/create-session', async (req, res) => {
    try {
        const { userID, nickname, avatar } = req.body;
        const newSession = new Session({
            userID,
            nickname, // This might be null if not provided
            avatar,
        });
        await newSession.save();
        res.status(201).json({ sessionId: newSession._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Additional routes can be added here

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
