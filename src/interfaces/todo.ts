import { DaysOfWeek } from "./daysOfWeek";

export interface Todo extends TodoData {
  clientId: string;
}

export interface TodoData {
  taskName: string;
  estimatedTime: number;
  daysOfWeek: DaysOfWeek;
}
