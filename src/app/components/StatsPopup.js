import styles from "./StatsPopup.module.css";

const formatAverage = (totalStars, count) => {
  if (count === 0) return "—";
  return (totalStars / count).toFixed(1);
};

export default function StatsPopup({ stats, onClose, onReset }) {
  if (!stats) return null;

  const { liked, disliked } = stats;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className={styles.header}>
          <h2 className={styles.title}>Your Stats</h2>
        </header>

        <div className={styles.body}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Liked</h3>
            <p className={styles.count}>{liked.count}</p>
            <p className={styles.label}>movies</p>
            <p className={styles.average}>
              ★ {formatAverage(liked.totalStars, liked.count)}
            </p>
            <p className={styles.label}>average rating</p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Disliked</h3>
            <p className={styles.count}>{disliked.count}</p>
            <p className={styles.label}>movies</p>
            <p className={styles.average}>
              ★ {formatAverage(disliked.totalStars, disliked.count)}
            </p>
            <p className={styles.label}>average rating</p>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
          >
            Reset
          </button>
          <button type="button" className={styles.backButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
