// src/app/chat-room/[slug]/page.js
import styles from "@/css/page.module.css";
import MongooseClient from "../../../../lib/mongo";

// Component definition
export default function ChatRoom({ data }) {
  const { messages = [], slug = "default" } = data || {};

  return (
    <main className={styles.main}>
      <h1>Chat Room: {slug}</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </main>
  );
}

// Loader function to fetch data
export async function loader({ params }) {
  const client = new MongooseClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const messages = await client.fetchMessages(params.slug);
    return {
      data: { messages, slug: params.slug },
    };
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return {
      data: {
        messages: [],
        slug: params.slug,
        error: "Failed to load messages.",
      },
    };
  }
}
