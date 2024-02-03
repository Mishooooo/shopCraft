import styles from "./ErrorPage.module.css"; 
import Image from "next/image";

export default function ErrorPage({
  error,
  reset
}) {

  return (
    <div className={styles.errorContainer}>
      <Image
        className={styles.logo}
        width={160}
        height={160}
        src={"/images/logo.png"}
        alt="Logo"
      />
      <h1 className={styles.errorText}>Something went wrong</h1>

      <h3>Error Status: {error.message}</h3>

      <h4 className={styles.errorText}>{error.status}</h4>

      <button
        className={styles.retryButton}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
