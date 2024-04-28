// src/app/chat-room/[slug]/page.js
import styles from "@/css/page.module.css";
import MongooseClient from "../../../../lib/mongo";
import ChatInput from "./input";

export default async function ChatRoom(context) {
  const { params } = context;
  const { messages } = await loader(context);
  return (
    <main className={styles.main}>
      <h1>Chat Room: {params.slug}</h1>
      {messages.map((msg, index) => (
        <p key={index}>
          {msg.messageText} - {msg.sender}
        </p>
      ))}
      <ChatInput slug={params.slug} />
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
      messages,
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
