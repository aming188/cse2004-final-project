import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>NextWatch</h1>
          <p className={styles.description}>
            No more endless searching. Just great movies, found instantly.
          </p>
        </div>
      </header>
    </div>
  );
}
