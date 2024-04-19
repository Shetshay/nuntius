import styles from "@/css/page.module.css";
import MongooseClient from "../../../../lib/mongo";

export default async function ChatRoom({ params }) {
  let client = new MongooseClient(process.env.MONGODB_URI);
  await client.connect();

  const {messages} = await client.fetchMessages(params.slug);

  return (
    <main className={styles.main}>
      <h1>Chat Room: {params.slug}</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li> // Assuming 'message' is a property of the fetched messages
        ))}
      </ul>
    </main>
  );
}
