import { DaysOfWeek } from "./daysOfWeek";

export interface Todo extends TodoData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoData {
  clientId: string;
  taskName: string;
  estimatedTime: number;
  daysOfWeek: DaysOfWeek;
}
