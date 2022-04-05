import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface CreateTaskDialogProps {
  open: boolean;
  closeCreateTaskDialog(): void;
}
interface CreateTaskDialogState { }
class CreateTaskDialog extends React.Component<CreateTaskDialogProps, CreateTaskDialogState> {
  constructor(props: CreateTaskDialogProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.closeCreateTaskDialog}>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeCreateTaskDialog}>Cancel</Button>
            <Button onClick={this.props.closeCreateTaskDialog}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateTaskDialog;
