import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DaysOfWeek } from '../../interfaces/daysOfWeek';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Todo } from '../../interfaces/todo';

interface CreateTaskDialogProps {
  open: boolean;
  closeCreateTaskDialog(): void;
  createTodo(todo: Todo): Promise<void>;
}
interface CreateTaskDialogState {
  taskName: string;
  estimatedTime: string;
  days: string[];
  daysOfWeek: DaysOfWeek;
}
class CreateTaskDialog extends React.Component<CreateTaskDialogProps, CreateTaskDialogState> {
  constructor(props: CreateTaskDialogProps) {
    super(props);
    this.state = {
      taskName: "",
      estimatedTime: "",
      days: [],
      daysOfWeek: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
      }
    };
  }

  taskNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      taskName: e.target.value
    });
  }

  estimatedTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      estimatedTime: e.target.value
    });
  }

  daysOfWeekChange(e: React.MouseEvent<HTMLElement>, newDays: string[]) {
    this.setState({
      days: newDays,
      daysOfWeek: daysToDaysOfWeek(newDays)
    });
  }

  async create() {
    this.props.closeCreateTaskDialog();
    const todo: Todo = {
      clientId: "",
      taskName: this.state.taskName,
      estimatedTime: +this.state.estimatedTime!,
      daysOfWeek: this.state.daysOfWeek
    }
    await this.props.createTodo(todo);
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.closeCreateTaskDialog}>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent className='create-task-fields'>
            <TextField
              value={this.state.taskName}
              onChange={this.taskNameChange.bind(this)}
              autoFocus
              margin="dense"
              label="Task Name"
            />
            <TextField
              className='create-task-text-field'
              value={this.state.estimatedTime}
              onChange={this.estimatedTimeChange.bind(this)}
              margin="dense"
              label="Estimated Time"
            />
            <DialogContentText className='create-task-days-heading'>Days of the Week</DialogContentText>
            <ToggleButtonGroup
              color="primary"
              size="small"
              value={this.state.days}
              onChange={this.daysOfWeekChange.bind(this)}
            >
              <ToggleButton value="sunday">Sunday</ToggleButton>
              <ToggleButton value="monday">Monday</ToggleButton>
              <ToggleButton value="tuesday">Tuesday</ToggleButton>
              <ToggleButton value="wednesday">Wednesday</ToggleButton>
              <ToggleButton value="thursday">Thursday</ToggleButton>
              <ToggleButton value="friday">Friday</ToggleButton>
              <ToggleButton value="saturday">Saturday</ToggleButton>
            </ToggleButtonGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeCreateTaskDialog}>Cancel</Button>
            <Button onClick={this.create.bind(this)}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function daysToDaysOfWeek(days: string[]): DaysOfWeek {
  return {
    sunday: days.includes("sunday"),
    monday: days.includes("monday"),
    tuesday: days.includes("tuesday"),
    wednesday: days.includes("wednesday"),
    thursday: days.includes("thursday"),
    friday: days.includes("fridayday"),
    saturday: days.includes("saturday")
  };
}

export default CreateTaskDialog;
