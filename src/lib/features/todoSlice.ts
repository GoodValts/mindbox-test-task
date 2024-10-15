import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface Task {
  init: string;
  edited?: string;
  startDate: string;
  deadline: string;
  taskName: string;
  description: string;
  status: "active" | "backlog" | "completed";
}

export interface TasksQueue {
  completed: Task[];
  active: Task[];
  backlog: Task[];
}

const initialState: TasksQueue = {
  completed: [],
  active: [],
  backlog: [],
};

export const todoSlice = createSlice({
  name: "todoParams",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<Task>) => {
      state.active.push(action.payload);
    },
    setCompleted: (state, action: PayloadAction<Task>) => {
      state.completed.push(action.payload);
    },
    setBacklog: (state, action: PayloadAction<Task>) => {
      state.backlog.push(action.payload);
    },
  },
});

export const { setActive, setCompleted, setBacklog } = todoSlice.actions;

export const selectActive = (state: RootState) => state.todoSlice.active;
export const selectCompleted = (state: RootState) => state.todoSlice.completed;
export const selectBacklog = (state: RootState) => state.todoSlice.backlog;

const todoReducer = todoSlice.reducer;
export default todoReducer;
