import React from 'react';
import './manageTasks.css';
import Sidenav from "../../sidenav/sidenav";
import ManageTasksTable from "./manageTasksTable";
import CreateTaskDialog from './createTaskDialog';
import { Todo } from "../../interfaces/todo";

import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { listTodos } from '../../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../../graphql/mutations';

interface ManageTasksProps { }
interface ManageTasksState {
  todos: Todo[];
  clientId: string | null;
  showCreateTaskDialog: boolean;
}
class ManageTasks extends React.Component<ManageTasksProps, ManageTasksState> {
  constructor(props: ManageTasksProps) {
    super(props);
    this.state = {
      todos: [],
      clientId: null,
      showCreateTaskDialog: false
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

  async createTodo(todo: Todo) {
    if (!this.state.clientId) return;
    todo.clientId = this.state.clientId;
    const newData: any = await API.graphql({ query: createTodoMutation, variables: { input: todo } });
    const newTodo = newData.data.createTodo;
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  async deleteTodo(todo: any) {
    const id = todo.id;
    const newTodosArray = this.state.todos.filter((todo: any) => todo.id !== id);
    this.setState({ todos: newTodosArray });
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
  }

  openCreateTaskDialog() {
    this.setState({ showCreateTaskDialog: true });
  }

  closeCreateTaskDialog() {
    this.setState({ showCreateTaskDialog: false });
  }

  render() {
    return (
      <div>
        <Sidenav />
        <div className='manage-tasks-table-container'>
          <ManageTasksTable
            todos={this.state.todos}
            openCreateTaskDialog={this.openCreateTaskDialog.bind(this)}
          ></ManageTasksTable>
          <CreateTaskDialog
            open={this.state.showCreateTaskDialog}
            closeCreateTaskDialog={this.closeCreateTaskDialog.bind(this)}
            createTodo={this.createTodo.bind(this)}
          ></CreateTaskDialog>
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
  catch (err) {
    console.log(err);
    return '';
  };
}

export default ManageTasks;
