export interface Task {
  taskName: string;
  deadline: string;
  init: string;
  completed: string | null;
}

export type Mode = "all" | "active" | "completed";
