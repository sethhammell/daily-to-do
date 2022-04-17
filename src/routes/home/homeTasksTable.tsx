import React from 'react';
import { Todo, TodoCompletionData } from '../../interfaces/todo';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, TextField } from '@mui/material';
import './home.css';
import EmptyTableMessage from '../../components/emptyTableMessage/emptyTableMessage';

interface HomeTasksTableProps {
  todos: Todo[];
  todoCompletionData: { [key: string]: TodoCompletionData };
  setTodoCompletionData(id: string, newTodoCompletionData: { [key: string]: TodoCompletionData }): void;
}
interface HomeTasksTableState {
}
class HomeTasksTable extends React.Component<HomeTasksTableProps, HomeTasksTableState> {
  constructor(props: HomeTasksTableProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const newTodoCompletionData: { [key: string]: TodoCompletionData } = {}
    // this.props.todos.forEach((todo) => {
    //   newTodoCompletionData[todo.id] = { completed: false, timeSpent: 0 };
    // })
    // this.setState({ todoCompletionData: newTodoCompletionData });
  }

  timeSpentChange(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    const newTodoCompletionData = { ...this.props.todoCompletionData };
    newTodoCompletionData[id].timeSpent = +e.target.value;
    this.props.setTodoCompletionData(id, newTodoCompletionData);
  }

  completedChange(id: string) {
    const newTodoCompletionData = { ...this.props.todoCompletionData };
    newTodoCompletionData[id].completed = !newTodoCompletionData[id].completed;
    this.props.setTodoCompletionData(id, newTodoCompletionData);
  }

  render() {
    const todoHeaders: string[] = ["Completed", "Task Name", "Estimated Time", "Time Spent"];
    const todoHeaderClasses: string[] = ["completed-column", "", "", "time-spent-column"];

    const emptyTable = !this.props.todos.length;
    const emptyTableMessage = "You have no tasks scheduled for today, click here to create some.";
    const emptyTableButtonText = "Manage Tasks";
    const emptyTableNavigate = "/manage-tasks";

    if (!Object.keys(this.props.todoCompletionData).length && this.props.todos.length) return null;

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
                        checked={this.props.todoCompletionData[todo.id]?.completed || false}
                        onChange={() => this.completedChange.bind(this)(todo.id)} />
                    </TableCell>
                    <TableCell>{todo.taskName}</TableCell>
                    <TableCell>{todo.estimatedTime}</TableCell>
                    <TableCell>
                      <TextField
                        value={this.props.todoCompletionData[todo.id]?.timeSpent || 0}
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
        <EmptyTableMessage empty={emptyTable} message={emptyTableMessage} buttonText={emptyTableButtonText} nav={emptyTableNavigate} />
      </div>
    );
  }
}

export default HomeTasksTable;
