"use client";

import { useAppDispatch } from "@/lib/hooks";
import styles from "./Form.module.scss";
import { useState } from "react";
import { setTask } from "@/lib/features/todoSlice";
import { formateToInputValue } from "@/lib/common/formatDate";

export default function Form() {
  const dispatch = useAppDispatch();

  const currentDate = new Date();

  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(
    `${formateToInputValue(currentDate.getFullYear(), 4)}-${formateToInputValue(currentDate.getMonth() + 1, 2)}-${formateToInputValue(currentDate.getDate() + 1, 2)}`,
  );
  const [time, setTime] = useState(
    `${formateToInputValue(currentDate.getHours(), 2)}:${formateToInputValue(currentDate.getMinutes(), 2)}`,
  );

  const createTask = () => {
    console.log("submit");

    // console.log(currentDate.getDate());

    const initDate = new Date();
    const deadline = new Date(
      parseInt(date.split("-")[0]),
      parseInt(date.split("-")[1]) - 1,
      parseInt(date.split("-")[2]),
      parseInt(time.split(":")[0]),
      parseInt(time.split(":")[1]),
    );

    // console.log("deadline=", date);

    const taskParams = {
      taskName: taskName,
      deadline: deadline.toISOString(),
      init: initDate.toISOString(),
      completed: null,
    };

    // console.log("deadline=", deadline);
    // console.log("initDate=", initDate);
    // console.log(deadline > initDate);
    // console.log({
    //   ...taskParams,
    //   status: deadline > initDate ? "active" : "backlog",
    // });

    console.log(taskParams);

    dispatch(setTask(taskParams));
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        createTask();
      }}
    >
      <input
        placeholder="task name"
        onChange={(e) => setTaskName(e.target.value)}
        type="text"
        required={true}
        value={taskName}
      />
      <input
        onChange={(e) => setDate(e.target.value)}
        type="date"
        required={true}
        value={date}
      />
      <input
        onChange={(e) => setTime(e.target.value)}
        type="time"
        required={true}
        value={time}
      />
      <button
        className={
          taskName ? `${styles.button} ${styles.button_active}` : styles.button
        }
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
