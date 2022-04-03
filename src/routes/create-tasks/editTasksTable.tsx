import React from 'react';
import { TodoData } from '../../interfaces/todo';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './createTasks.css';
import { DaysOfWeek } from '../../interfaces/daysOfWeek';
import { IconButton } from '@mui/material';

interface EditTasksTableProps { }
interface EditTasksTableState {
  todoHeaders: string[];
  todos: TodoData[];
}
class EditTasksTable extends React.Component<EditTasksTableProps, EditTasksTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoHeaders: ["Task Name", "Estimated Time", "Days of the Week", "Edit"],
      todos: [
        {
          taskName: "Test",
          estimatedTime: 20,
          daysOfWeek: {
            sunday: false,
            monday: false,
            tuesday: true,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
          }
        }
      ]
    }
  }

  editTodo(i: number) {
    console.log(i);
  }

  deleteTodo(i: number) {
    console.log(i);
  }

  render() {
    return (
      <div className='edit-tasks-table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {this.state.todoHeaders.map((header: string) => {
                  return (
                    <TableCell>{header}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.todos.map((todo: TodoData, i: number) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{todo.taskName}</TableCell>
                    <TableCell>{todo.estimatedTime}</TableCell>
                    <TableCell>{getDaysOfWeekText(todo.daysOfWeek)}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => this.editTodo(i)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => this.deleteTodo(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

function getDaysOfWeekText(daysOfWeek: DaysOfWeek): string {
  let daysOfWeekText: string = "";
  daysOfWeekText += daysOfWeek.sunday ? "Sunday, " : "";
  daysOfWeekText += daysOfWeek.monday ? "Monday, " : "";
  daysOfWeekText += daysOfWeek.tuesday ? "Tuesday, " : "";
  daysOfWeekText += daysOfWeek.wednesday ? "Wednesday, " : "";
  daysOfWeekText += daysOfWeek.thursday ? "Thursday, " : "";
  daysOfWeekText += daysOfWeek.friday ? "Friday, " : "";
  daysOfWeekText += daysOfWeek.saturday ? "Saturday, " : "";
  if (daysOfWeekText.length > 2) daysOfWeekText = daysOfWeekText.slice(0, -2);
  return daysOfWeekText;
}

export default EditTasksTable;
