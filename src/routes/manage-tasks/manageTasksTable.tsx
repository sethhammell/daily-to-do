import React from 'react';
import { Todo } from '../../interfaces/todo';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './manageTasks.css';
import { DaysOfWeek } from '../../interfaces/daysOfWeek';
import { IconButton } from '@mui/material';

interface ManageTasksTableProps {
  todos: Todo[];
  openManageTaskDialog(editTask?: boolean, id?: string): void;
  deleteTodo(id: string): Promise<void>;
}
interface ManageTasksTableState {
  todoHeaders: string[];
  open: boolean;
  deleteId: string;
}
class ManageTasksTable extends React.Component<ManageTasksTableProps, ManageTasksTableState> {
  constructor(props: ManageTasksTableProps) {
    super(props);
    this.state = {
      todoHeaders: ["Task Name", "Estimated Time", "Days of the Week", "Add"],
      open: false,
      deleteId: ""
    };
  }

  editTodo(i: string) {
    console.log(i);
  }

  lastHeading(): string {
    return this.state.todoHeaders[this.state.todoHeaders.length - 1];
  }

  openDeleteTaskDialog() {
    this.setState({ open: true });
  }

  closeDeleteTaskDialog() {
    this.setState({ open: false });
  }

  deleteConfirmation(id: string) {
    this.setState({ deleteId: id });
    this.openDeleteTaskDialog();
  }

  deleteConfirmed(id: string) {
    this.closeDeleteTaskDialog();
    this.props.deleteTodo(id);
  }

  render() {
    return (
      <div className='manage-tasks-table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {this.state.todoHeaders.map((header: string) => {
                  if (header === this.lastHeading()) {
                    return (
                      <TableCell>
                        {header}
                        <IconButton
                          onClick={() => this.props.openManageTaskDialog()}
                        >
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                    );
                  }
                  else {
                    return (
                      <TableCell>{header}</TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.todos.map((todo: Todo) => {
                return (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.taskName}</TableCell>
                    <TableCell>{todo.estimatedTime}</TableCell>
                    <TableCell>{getDaysOfWeekText(todo.daysOfWeek)}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => this.props.openManageTaskDialog(true, todo.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => this.deleteConfirmation(todo.id)}
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
        <Dialog open={this.state.open} onClose={this.closeDeleteTaskDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDeleteTaskDialog.bind(this)}>Cancel</Button>
            <Button onClick={() => this.deleteConfirmed(this.state.deleteId)}>Delete</Button>
          </DialogActions>
        </Dialog>
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

export default ManageTasksTable;
