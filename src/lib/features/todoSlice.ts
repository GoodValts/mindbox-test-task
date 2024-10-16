import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Mode, Task } from "../types/taskTypes";

const localTasks =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("todoData")
    : undefined;
const localMode =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("todoMode")
    : undefined;

export const initialState: {
  tasks: Task[];
  mode: Mode;
} = {
  tasks: localTasks ? (JSON.parse(localTasks) as Task[]) : [],
  mode: (localMode as Mode) ?? "all",
};

export const todoSlice = createSlice({
  name: "todoParams",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
      localStorage.setItem("todoMode", state.mode);
    },
    setTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem("todoData", JSON.stringify(state.tasks));
    },
    removeTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter(
        (task) => task.init !== action.payload.init,
      );
      localStorage.setItem("todoData", JSON.stringify(state.tasks));
    },
  },
});

export const { setMode, setTask, removeTask } = todoSlice.actions;

export const selectTasks = (state: RootState) => state.todoSlice.tasks;
export const selectMode = (state: RootState) => state.todoSlice.mode;

const todoReducer = todoSlice.reducer;
export default todoReducer;
