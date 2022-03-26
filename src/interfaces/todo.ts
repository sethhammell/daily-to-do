import { DaysOfWeek } from "./daysOfWeek";

export interface Todo {
  clientId: String
  taskName: String
  estimatedTime: Number
  daysOfWeek: DaysOfWeek
}
