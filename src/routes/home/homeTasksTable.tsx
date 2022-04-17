import React from 'react';
import { Todo, TodoCompletionData } from '../../interfaces/todo';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './home.css';
import { Checkbox, TextField } from '@mui/material';

interface HomeTasksTableProps {
  todos: Todo[];
}
interface HomeTasksTableState {
  todoCompletionData: { [key: string]: TodoCompletionData }
}
class HomeTasksTable extends React.Component<HomeTasksTableProps, HomeTasksTableState> {
  constructor(props: HomeTasksTableProps) {
    super(props);
    this.state = {
      todoCompletionData: {}
    };
  }

  componentDidMount() {
    const newTodoCompletionData: { [key: string]: TodoCompletionData } = {}
    this.props.todos.forEach((todo) => {
      newTodoCompletionData[todo.id] = { completed: false, timeSpent: 0 };
    })
    this.setState({ todoCompletionData: newTodoCompletionData });
  }

  timeSpentChange(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    const newTodoCompletionData = { ...this.state.todoCompletionData };
    newTodoCompletionData[id].timeSpent = +e.target.value;
    this.setState({ todoCompletionData: newTodoCompletionData });
  }

  completedChange(id: string) {
    const newTodoCompletionData = { ...this.state.todoCompletionData };
    newTodoCompletionData[id].completed = !newTodoCompletionData[id].completed;
    this.setState({ todoCompletionData: newTodoCompletionData });
  }

  render() {
    const emptyTable = !this.props.todos.length;
    const todoHeaders: string[] = ["Completed", "Task Name", "Estimated Time", "Time Spent"];
    const todoHeaderClasses: string[] = ["completed-column", "", "", "time-spent-column"];

    return (
      <div className='home-tasks-table'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {todoHeaders.map((header: string, i: number) => {
                  return (
                    <TableCell className={todoHeaderClasses[i]}>{header}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.todos.map((todo: Todo) => {
                return (
                  <TableRow key={todo.id}>
                    <TableCell>
                      <Checkbox
                        // checked={this.state.todoCompletionData[todo.id].completed}
                        checked={false}
                        onChange={() => this.completedChange.bind(this)(todo.id)} />
                    </TableCell>
                    <TableCell>{todo.taskName}</TableCell>
                    <TableCell>{todo.estimatedTime}</TableCell>
                    <TableCell>
                      <TextField
                        // value={this.state.todoCompletionData[todo.id].timeSpent}
                        value={0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.timeSpentChange.bind(this)(e, todo.id)}
                        margin="dense"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {emptyTable ?
          <div className='empty-table'>
            
          </div> : null}
      </div>
    );
  }
}

export default HomeTasksTable;
