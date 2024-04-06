const express = require("express");
const router = express.Router();
const Session = require("../models/session.js");

// Create session route
router.post("/create-session", async (req, res) => {
    try {
        const { userID, avatar } = req.body;
        const newSession = new Session({ userID, avatar });
        await newSession.save();
        res.status(201).json(newSession);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Join session route
router.post("/join-session", async (req, res) => {
    try {
        const { sessionID, userID, nickname } = req.body;
        const session = await Session.findById(sessionID);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        session.userID = userID;
        session.nickname = nickname;
        await session.save();
        res.status(200).json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
