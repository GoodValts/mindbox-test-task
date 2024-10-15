"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import {
  setActive,
  setBacklog,
  setCompleted,
  TasksQueue,
} from "@/lib/features/todoSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  if (typeof localStorage !== "undefined") {
    const localData = localStorage.getItem("todoData");
    const store = storeRef.current;

    if (localData && store) {
      const data = JSON.parse(localData) as TasksQueue;

      data.active.forEach((el) => store.dispatch(setActive(el)));
      data.completed.forEach((el) => store.dispatch(setCompleted(el)));
      data.backlog.forEach((el) => store.dispatch(setBacklog(el)));
    }
  }

  console.log(storeRef.current.getState());

  return <Provider store={storeRef.current}>{children}</Provider>;
}
