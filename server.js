// server.js

const express = require("express");
const mongoose = require("mongoose");
const sessionRoutes = require("./routes/sessionRoutes"); // Import sessionRoutes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const uri = "mongodb+srv://shetshay:Good54321@dev-nuntius.ksxbiwd.mongodb.net/nuntius?retryWrites=true&w=majority&appName=dev-nuntius";

async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}
connect();

// Use sessionRoutes
app.use(sessionRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});   
