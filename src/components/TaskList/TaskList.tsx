"use client";

import {
  removeTask,
  selectMode,
  selectTasks,
  setMode,
  addTask,
} from "@/lib/features/todoSlice";
import styles from "./TaskList.module.scss";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Task } from "@/lib/types/taskTypes";
import { formateToInputValue } from "@/lib/common/formatDate";

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
    dispatch(addTask({ ...task, completed: date.toUTCString() }));
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.queue}>
        {mode[0].toUpperCase() + mode.slice(1)} tasks
      </h2>
      {!!taskArr.length && (
        <button className={styles.clear} onClick={clearList}>
          Clear list
        </button>
      )}
      {taskArr.map((task) => {
        const taskDate = new Date(task.deadline);

        return (
          <div className={styles.taskBlock} key={task.init}>
            <div className={styles.taskInfo}>
              <h3 className={styles.taskName}>{task.taskName}</h3>
              <p
                className={
                  task.completed
                    ? `${styles.deadline} ${styles.deadline_completed}`
                    : date > new Date(task.deadline)
                      ? `${styles.deadline} ${styles.deadline_missed}`
                      : styles.deadline
                }
              >
                {`${formateToInputValue(taskDate.getHours(), 2)}:${formateToInputValue(taskDate.getMinutes(), 2)} ${formateToInputValue(taskDate.getDate(), 2)}.${formateToInputValue(taskDate.getMonth() + 1, 2)}.${formateToInputValue(taskDate.getFullYear(), 4)}`}
              </p>
            </div>
            <div className={styles.taskButtons}>
              <button
                className={`${styles.button} ${styles.button_delete}`}
                onClick={() => dispatch(removeTask(task))}
              >
                Delete
              </button>
              <button
                className={`${styles.button} ${styles.button_complete}`}
                onClick={() => completeTask(task)}
              >
                Complete
              </button>
            </div>
          </div>
        );
      })}
      <div className={styles.listButtons}>
        <button
          className={
            mode === "all"
              ? `${styles.button} ${styles.button_disabled}`
              : styles.button
          }
          onClick={() => dispatch(setMode("all"))}
        >
          All
        </button>
        <button
          className={
            mode === "active"
              ? `${styles.button} ${styles.button_disabled}`
              : styles.button
          }
          onClick={() => dispatch(setMode("active"))}
        >
          Active
        </button>
        <button
          className={
            mode === "completed"
              ? `${styles.button} ${styles.button_disabled}`
              : styles.button
          }
          onClick={() => dispatch(setMode("completed"))}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
