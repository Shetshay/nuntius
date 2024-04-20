<<<<<<< HEAD
'use client'
import Image from "next/image";
import styles from "@/css/page.module.css";
import { useRouter } from 'next/navigation';  

export default function Home() {
  const router = useRouter();
=======
"use client";
import Image from "next/image";
import styles from "@/css/page.module.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showDescription, setShowDescription] = useState(false); // State to control the visibility of the description
  const router = useRouter(); // Use useRouter for navigation

  const toggleDescription = () => {
    setShowDescription(!showDescription); // Toggle the visibility of the description
  };
>>>>>>> 40f8cd2 (update buttons)

  async function createRoom() {
    try {
      const response = await fetch("/api/create-chat", {
        method: "POST",
      });
<<<<<<< HEAD

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      router.push(`/chat-room/${data.roomId}`);
=======
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      router.push(`/chat-room/${data.roomId}`); // Navigate to the chat room
>>>>>>> 40f8cd2 (update buttons)
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
<<<<<<< HEAD
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
=======
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
>>>>>>> 40f8cd2 (update buttons)
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
<<<<<<< HEAD
          target="_blank"
          onClick={createRoom}
=======
          onClick={createRoom} // Removed target="_blank" as it's unnecessary for this interaction
>>>>>>> 40f8cd2 (update buttons)
          rel="noopener noreferrer"
        >
          <h2>
            Create Session<span>-&gt;</span>
          </h2>
          <p>Host a session and create a join key.</p>
        </a>

<<<<<<< HEAD
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
=======
        <button onClick={toggleDescription} className={styles.card}>
          <h2>
            Join Session<span> &rarr;</span>
          </h2>
          {showDescription && (
            <div className={styles.description}>
              <p>
                Enter a session key to join.&nbsp;
                <code className={styles.code}>src/app/page.js</code>
              </p>
            </div>
          )}
        </button>
>>>>>>> 40f8cd2 (update buttons)
      </div>
    </main>
  );
}
