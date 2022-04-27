import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import EmptyTableMessage from '../../components/emptyTableMessage/emptyTableMessage';
import { TodoStats } from '../../interfaces/todo';
import './stats.css';

interface StatsTasksTableProps {
  todoStats: TodoStats[];
}
interface StatsTasksTableState {
}
class StatsTasksTable extends React.Component<StatsTasksTableProps, StatsTasksTableState> {
  constructor(props: StatsTasksTableProps) {
    super(props);
    this.state = {};
  }
  render() {
    const todoHeaders: string[] = ["Task Name", "Total Time Spent", "Completed Tasks", "Average Time per Task", "Created At"];

    const emptyTable = !this.props.todoStats?.length;
    const emptyTableMessage = "You have no tasks scheduled for today, click here to create some.";
    const emptyTableButtonText = "Manage Tasks";
    const emptyTableNavigate = "/manage-tasks";

    return (
      <div className='stats-tasks-table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {todoHeaders.map((header: string, i: number) => {
                  return (
                    <TableCell key={header}>{header}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.todoStats?.map((todoStats: TodoStats) => {
                return (
                  <TableRow key={todoStats.id}>
                    <TableCell>{todoStats.taskName}</TableCell>
                    <TableCell>{todoStats.totalTimeSpent}</TableCell>
                    <TableCell>{todoStats.numberOfCompletedTasks}</TableCell>
                    <TableCell>{todoStats.averageTimePerTask}</TableCell>
                    <TableCell>{todoStats.createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <EmptyTableMessage empty={emptyTable} message={emptyTableMessage} buttonText={emptyTableButtonText} nav={emptyTableNavigate} />
      </div>
    );
  }
}

export default StatsTasksTable;
