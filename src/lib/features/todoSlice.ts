import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Mode, Task } from "../types/taskTypes";

export const initialState: {
  tasks: Task[];
  mode: Mode;
} = {
  tasks: [],
  mode: "all",
};

export const todoSlice = createSlice({
  name: "todoParams",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      console.log("addTaskServerRequest");
    },
    removeTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter(
        (task) => task.init !== action.payload.init,
      );
      console.log("removeTaskServerRequest");
    },
  },
});

export const { setMode, addTask, removeTask } = todoSlice.actions;

export const selectTasks = (state: RootState) => state.todoSlice.tasks;
export const selectMode = (state: RootState) => state.todoSlice.mode;

const todoReducer = todoSlice.reducer;
export default todoReducer;
