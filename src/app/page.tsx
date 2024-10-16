"use client";

import Form from "@/components/Form/Form";
import styles from "./page.module.scss";
import StoreProvider from "./StoreProvider";
import TaskList from "@/components/TaskList/TaskList";

export default function Home() {
  return (
    <StoreProvider>
      <div className={styles.page}>
        <main className={styles.main}>
          <Form />
          <TaskList />
        </main>
      </div>
    </StoreProvider>
  );
}
