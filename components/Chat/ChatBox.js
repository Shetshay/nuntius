"use client";
import React, { useState } from "react";
import io from "socket.io-client";

const socket = io(); // Connect to the socket server

const ChatBox = ({ roomId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("message", { roomId, message });
    setMessage("");
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
