import { DaysOfWeek } from "./daysOfWeek";

export interface Todo extends TodoDataId {
  createdAt: string;
  updatedAt: string;
  todoCompletionData: TodoCompletionData[];
}

export interface TodoDataId extends TodoData {
  id: string;
}

export interface TodoData {
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
