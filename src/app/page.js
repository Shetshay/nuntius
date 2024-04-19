'use client'
import Image from "next/image";
import styles from "@/css/page.module.css";
import { useRouter } from 'next/navigation';  

export default function Home() {
  const router = useRouter();

  async function createRoom() {
    try {
      const response = await fetch("/api/create-chat", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      router.push(`/chat-room/${data.roomId}`);
    } catch (error) {
      console.error("Failed to create chat room:", error);
      // Handle errors e.g., show an error message to the user
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          src="/nuntius-logo.png"
          alt="Nuntius Logo"
          width={479}
          height={140}
          priority
        />
      </div>

      <div className={styles.center}>
        <a
          href="#"
          className={styles.card}
          target="_blank"
          onClick={createRoom}
          rel="noopener noreferrer"
        >
          <h2>
            Create Session<span>-&gt;</span>
          </h2>
          <p>Host a session and create a join key.</p>
        </a>

        <a
          href=""
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Join Session<span>-&gt;</span>
          </h2>
          <p>Enter a session key to join.</p>
        </a>
      </div>
    </main>
  );
}
