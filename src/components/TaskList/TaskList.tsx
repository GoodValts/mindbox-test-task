"use client";

import {
  removeTask,
  selectMode,
  selectTasks,
  setMode,
  setTask,
} from "@/lib/features/todoSlice";
import styles from "./TaskList.module.scss";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Task } from "@/lib/types/taskTypes";

export default function TaskList() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const taskArr = useAppSelector(selectTasks).filter((task) =>
    mode === "all"
      ? true
      : mode === "active"
        ? !task.completed
        : task.completed,
  );

  const date = new Date();

  const clearList = () => {
    taskArr
      .filter((task) =>
        mode === "all"
          ? true
          : mode === "active"
            ? !task.completed
            : task.completed,
      )
      .forEach((task) => dispatch(removeTask(task)));
  };

  const completeTask = (task: Task) => {
    const date = new Date();
    dispatch(removeTask(task));
    dispatch(setTask({ ...task, completed: date.toUTCString() }));
  };

  return (
    <div className={styles.block}>
      <button className={styles.clear} onClick={clearList}>
        Clear list
      </button>
      {taskArr.map((task) => (
        <div className={styles.taskBlock} key={task.init}>
          <h3>{task.taskName}</h3>
          <p
            className={
              task.completed
                ? `${styles.deadline} ${styles.deadline_completed}`
                : date > new Date(task.deadline)
                  ? `${styles.deadline} ${styles.deadline_missed}`
                  : styles.deadline
            }
          >
            {task.deadline}
          </p>
          <button
            className={styles.delete}
            onClick={() => dispatch(removeTask(task))}
          >
            Delete
          </button>
          <button className={styles.delete} onClick={() => completeTask(task)}>
            Complete
          </button>
        </div>
      ))}
      <button
        className={styles.delete}
        onClick={() => dispatch(setMode("all"))}
      >
        All
      </button>
      <button
        className={styles.delete}
        onClick={() => dispatch(setMode("active"))}
      >
        Active
      </button>
      <button
        className={styles.delete}
        onClick={() => dispatch(setMode("completed"))}
      >
        Completed
      </button>
    </div>
  );
}
