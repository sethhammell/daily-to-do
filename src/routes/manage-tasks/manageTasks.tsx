import React from 'react';
import ManageTasksTable from "./manageTasksTable";
import ManageTaskDialog from './manageTaskDialog';
import { Todo, TodoData, TodoDataId } from "../../interfaces/todo";
import './manageTasks.css';

import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { listTodos } from '../../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation, updateTodo as updateTodoMutation } from '../../graphql/mutations';
import { DaysOfWeek } from '../../interfaces/daysOfWeek';
import RouteHeaderBar from '../../components/routeHeaderBar/routeHeaderBar';

interface ManageTasksProps { }
interface ManageTasksState {
  child: React.RefObject<ManageTaskDialog>;
  todos: Todo[];
  clientId: string | null;
  showManageTaskDialog: boolean;
  editTask: boolean;
}
class ManageTasks extends React.Component<ManageTasksProps, ManageTasksState> {
  constructor(props: ManageTasksProps) {
    super(props);
    this.state = {
      child: React.createRef(),
      todos: [],
      clientId: null,
      showManageTaskDialog: false,
      editTask: false
    };
  }

  async componentDidMount() {
    const clientId = await getClientId();
    if (clientId !== '') {
      this.setState({ clientId: clientId });
    }
    this.fetchTodos();
  }

  async fetchTodos() {
    if (!this.state.clientId) return;
    try {
      const apiData = await API.graphql({
        query: listTodos, variables: {
          filter: {
            clientId: { eq: this.state.clientId }
          }
        }
      }) as { [key: string]: any };

      if (apiData.data?.listTodos?.items === undefined) return;
      const newTodos = apiData.data.listTodos.items as Todo[];
      this.setState({
        todos: newTodos
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createTodo(todo: TodoData) {
    if (!this.state.clientId) return;
    todo.clientId = this.state.clientId;
    const newData: any = await API.graphql({ query: createTodoMutation, variables: { input: todo } });
    const newTodo = newData.data.createTodo;
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  async deleteTodo(id: string) {
    const newTodosArray = this.state.todos.filter((todo: any) => todo.id !== id);
    this.setState({ todos: newTodosArray });
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
  }

  async editTodo(todo: TodoDataId) {
    if (!this.state.clientId) return;
    todo.clientId = this.state.clientId;
    const newData: any = await API.graphql({ query: updateTodoMutation, variables: { input: todo } });
    
    const newTodo = newData.data.updateTodo;
    const newTodosArray = this.state.todos.map((td: any) => {
      if (td.id === todo.id) {
        return newTodo;
      }
      else {
        return td;
      }
    });
    this.setState({ todos: [...newTodosArray] });
  }

  openManageTaskDialog(editTask: boolean = false, id: string = "") {
    if (editTask) {
      this.setEditedTodo(id);
    }
    else {
      this.state.child.current?.setDefaultState();
    }
    this.setState({
      editTask: editTask,
      showManageTaskDialog: true
    });
  }

  closeManageTaskDialog() {
    this.setState({ showManageTaskDialog: false });
  }

  setEditedTodo(id: string) {
    const editedTodoArray = this.state.todos.filter((todo: any) => todo.id === id);
    if (editedTodoArray.length) {
      const editedTodo = editedTodoArray[0];
      this.state.child.current?.setState({
        id: id,
        taskName: editedTodo.taskName,
        estimatedTime: editedTodo.estimatedTime.toString(),
        days: daysOfWeekToDays(editedTodo.daysOfWeek),
        daysOfWeek: editedTodo.daysOfWeek
      });
    }
  }

  render() {
    return (
      <div>
        <RouteHeaderBar routeName='Manage Tasks' />
        <div className='manage-tasks-table-container'>
          <ManageTasksTable
            todos={this.state.todos}
            openManageTaskDialog={this.openManageTaskDialog.bind(this)}
            deleteTodo={this.deleteTodo.bind(this)}
          ></ManageTasksTable>
          <ManageTaskDialog
            ref={this.state.child}
            open={this.state.showManageTaskDialog}
            editTask={this.state.editTask}
            closeManageTaskDialog={this.closeManageTaskDialog.bind(this)}
            createTodo={this.createTodo.bind(this)}
            editTodo={this.editTodo.bind(this)}
          ></ManageTaskDialog>
        </div>
      </div>
    );
  }
}

async function getClientId(): Promise<string> {
  try {
    const data = await Auth.currentAuthenticatedUser();
    return data ? data.pool.clientId : '';
  }
  catch (error) {
    console.log(error);
    return '';
  };
}

function daysOfWeekToDays(daysOfWeek: DaysOfWeek): string[] {
  const days: string[] = [];
  if (daysOfWeek.sunday) days.push("sunday");
  if (daysOfWeek.monday) days.push("monday");
  if (daysOfWeek.tuesday) days.push("tuesday");
  if (daysOfWeek.wednesday) days.push("wednesday");
  if (daysOfWeek.thursday) days.push("thursday");
  if (daysOfWeek.friday) days.push("friday");
  if (daysOfWeek.saturday) days.push("saturday");
  return days;
}

export default ManageTasks;
