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
import { TodoData, TodoDataId } from '../../interfaces/todo';

const manageTaskDialogDefaultState: ManageTaskDialogState = {
  id: "",
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
}

interface ManageTaskDialogProps {
  open: boolean;
  editTask?: boolean;
  closeManageTaskDialog(): void;
  createTodo(todo: TodoData): Promise<void>;
  editTodo(todo: TodoDataId): Promise<void>;
}
interface ManageTaskDialogState {
  id: string;
  taskName: string;
  estimatedTime: string;
  days: string[];
  daysOfWeek: DaysOfWeek;
}
class ManageTaskDialog extends React.Component<ManageTaskDialogProps, ManageTaskDialogState> {
  public static defaultProps: Partial<ManageTaskDialogProps> = {
    editTask: false
  }

  constructor(props: ManageTaskDialogProps) {
    super(props);
    this.state = manageTaskDialogDefaultState;
  }

  setDefaultState() {
    this.setState(manageTaskDialogDefaultState);
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
    this.props.closeManageTaskDialog();
    const todo: TodoData = {
      clientId: "",
      taskName: this.state.taskName,
      estimatedTime: +this.state.estimatedTime!,
      daysOfWeek: this.state.daysOfWeek,
      todoCompletionData: []
    }
    await this.props.createTodo(todo);
    this.setState(manageTaskDialogDefaultState);
  }

  async editTodo() {
    this.props.closeManageTaskDialog();
    const todo: TodoDataId = {
      id: this.state.id,
      clientId: "",
      taskName: this.state.taskName,
      estimatedTime: +this.state.estimatedTime!,
      daysOfWeek: this.state.daysOfWeek
    }
    await this.props.editTodo(todo);
    this.setState(manageTaskDialogDefaultState);
  }

  titleText(): string {
    return this.props.editTask ? "Edit" : "Create New";
  }

  operationText(): string {
    return this.props.editTask ? "Edit" : "Create";
  }

  confirmTaskAction() {
    if (this.props.editTask) {
      this.editTodo();
    }
    else {
      this.create();
    }
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.closeManageTaskDialog}>
          <DialogTitle>{this.titleText()} Task</DialogTitle>
          <DialogContent className='delete-task-fields'>
            <TextField
              value={this.state.taskName}
              onChange={this.taskNameChange.bind(this)}
              autoFocus
              margin="dense"
              label="Task Name"
            />
            <TextField
              className='delete-task-text-field'
              value={this.state.estimatedTime}
              onChange={this.estimatedTimeChange.bind(this)}
              margin="dense"
              label="Estimated Time"
            />
            <DialogContentText className='delete-task-days-heading'>Days of the Week</DialogContentText>
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
            <Button onClick={this.props.closeManageTaskDialog}>Cancel</Button>
            <Button onClick={this.confirmTaskAction.bind(this)}>{this.operationText()}</Button>
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
    friday: days.includes("friday"),
    saturday: days.includes("saturday")
  };
}

export default ManageTaskDialog;
