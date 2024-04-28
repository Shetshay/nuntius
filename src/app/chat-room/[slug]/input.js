"use client";
import React, { useState } from "react";
import styles from "@/css/page.module.css";

export default function ChatInput({ slug }) {
  const [messageText, setMessageText] = useState("");

  const handleInputChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return; // Prevent sending empty messages

    const requestOptions = {
      method: "POST", // Specify the request type
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify({
        message: messageText,
        roomId: slug,
      }),
    };

    try {
      const response = await fetch(`/api/post/createMessage`, requestOptions);
      const result = await response.json(); // Assuming your API responds with JSON
      if (response.ok) {
        console.log("Message sent successfully:", result);
        setMessageText(""); // Clear the text field after message is sent
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Failed to send message:", error.message);
    }
  };

  return (
    <div className={styles.messageForm}>
      <input
        type="text"
        value={messageText}
        onChange={handleInputChange}
        className={styles.messageInput}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage} className={styles.sendButton}>
        Send
      </button>
    </div>
  );
}
