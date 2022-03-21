import * as React from "react";
import "./tasks.css"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "task", headerName: "Task", type: "string", flex: 1 },
  { field: "description", headerName: "Description", type: "string", flex: 1 },
  { field: "estimatedTime", headerName: "Estimated Time", description: "Estimated Time in minutes",  type: "number", flex: 1, align: "left", headerAlign: "left" },
  {
    field: "timeSpent", headerName: "Time Spent", description: "Time Spent in minutes", type: "number", flex: 1, align: "left", headerAlign: "left", editable: true
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, task: "Learning React", description: "Work on react side project", estimatedTime: 120, timeSpent: 0 },
  { id: 2, task: "Snow", description: "Jon", estimatedTime: 35, timeSpent: 0 },
  { id: 3, task: "Snow", description: "Jon", estimatedTime: 35, timeSpent: 0 },
  { id: 4, task: "Snow", description: "Jon", estimatedTime: 35, timeSpent: 0 },
];

export default function TasksTable() {
  return (
    <div className="tasks-table">
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}