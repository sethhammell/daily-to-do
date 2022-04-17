import { DaysOfWeek } from "./daysOfWeek";

export interface Todo extends TodoData {
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface TodoData extends BaseTodoData {
  todoCompletionData: TodoCompletionData[];
}

export interface TodoDataId extends BaseTodoData {
  id: string;
}

export interface BaseTodoData {
  clientId: string;
  taskName: string;
  estimatedTime: number;
  daysOfWeek: DaysOfWeek;
}

export interface TodoCompletionData {
  date: String;
  completed: boolean;
  timeSpent: number;
}
