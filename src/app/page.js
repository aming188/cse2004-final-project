"use client";

import Image from "next/image";
import popcorn from "@/images/popcorn.jpg";
import Filters from "./components/Filters";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.titleRow}>
            <Image
              src={popcorn}
              alt="NextWatch logo"
              className={styles.logo}
              width={44}
              height={44}
              priority
            />
            <h1 className={styles.title}>NextWatch</h1>
          </div>
          <p className={styles.description}>
            No more endless searching. Just great movies, found instantly.
          </p>
        </div>
      </header>

      <main className={styles.layout}>
        <Filters />
      </main>
    </div>
  );
}
