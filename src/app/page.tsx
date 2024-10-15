import styles from "./page.module.scss";
import StoreProvider from "./StoreProvider";

export default function Home() {
  console.log();

  return (
    <StoreProvider>
      <div className={styles.page}>
        <main className={styles.main}></main>
      </div>
    </StoreProvider>
  );
}
