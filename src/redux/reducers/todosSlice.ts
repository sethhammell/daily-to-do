import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth } from 'aws-amplify';
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { listTodos } from '../../graphql/queries';
import { Todo, TodoCompletionData, TodoData, TodoDataId } from '../../interfaces/todo';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation, updateTodo as updateTodoMutation } from '../../graphql/mutations';
import type { AppDispatch, RootState, GetState } from '../store';

interface TodosState {
  todos: Todo[];
  clientId: string;
}

const initialState: TodosState = {
  todos: [],
  clientId: ""
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      console.log('hi');
      state.todos = action.payload;
    },
    setClientId: (state, action: PayloadAction<string>) => {
      state.clientId = action.payload;
      console.log(state.clientId);
    }
  },
})

export async function getClientId(dispatch: AppDispatch, getState: GetState) {
  try {
    const data = await Auth.currentAuthenticatedUser();
    if (data) {
      dispatch(setClientId(data.pool.clientId));
    }
  }
  catch (error) {
    console.log(error);
  };
}

export async function fetchTodos(dispatch: AppDispatch, getState: GetState) {
  const state = getState().todos;
  if (!state.clientId) return;
  try {
    const apiData = await API.graphql({
      query: listTodos, variables: {
        filter: {
          clientId: { eq: state.clientId }
        }
      }
    }) as { [key: string]: any };
    if (apiData.data?.listTodos?.items === undefined) return;
    dispatch(setTodos(apiData.data.listTodos.items));
    // this.updateTodos();
  } catch (error) {
    console.log(error);
  }
}

export async function createTodo(dispatch: AppDispatch, getState: GetState, todo: TodoData) {
  const state = getState().todos;
  if (!state.clientId) return;
  todo.clientId = state.clientId;
  const newData: GraphQLResult<any> = await API.graphql({ query: createTodoMutation, variables: { input: todo } });
  const newTodo = newData.data.createTodo;
  setTodos([...state.todos, newTodo]);
}

export async function deleteTodo(dispatch: AppDispatch, getState: GetState, id: string) {
  const state = getState().todos;
  const newTodosArray = state.todos.filter((todo: any) => todo.id !== id);
  setTodos(newTodosArray);
  await API.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
}

export async function editTodo(dispatch: AppDispatch, getState: GetState, todo: TodoDataId) {
  const state = getState().todos;
  if (!state.clientId) return;
  todo.clientId = state.clientId;
  const newData: any = await API.graphql({ query: updateTodoMutation, variables: { input: todo } });

  const newTodo = newData.data.updateTodo;
  const newTodosArray = state.todos.map((td: any) => {
    if (td.id === todo.id) {
      return newTodo;
    }
    else {
      return td;
    }
  });
  setTodos([...newTodosArray]);
}

export async function editTodoCompletionData(dispatch: AppDispatch, getState: GetState, id: string, todoCompletionData: { [key: string]: TodoCompletionData }) {
  const state = getState().todos;
  if (!state.clientId) return;
  const date = todoCompletionData[id].date;
  const todoArray = state.todos.filter((todo: any) => todo.id === id);
  const todo = todoArray[0];

  let found = false;
  for (const i in todo.todoCompletionData) {
    if (todo.todoCompletionData[i].date === date) {
      todo.todoCompletionData[i] = todoCompletionData[id];
      found = true;
    }
  }
  if (!found) {
    todo.todoCompletionData.push(todoCompletionData[id]);
  }

  delete todo.createdAt;
  delete todo.updatedAt;

  API.graphql({ query: updateTodoMutation, variables: { input: todo } });
}

export const { setTodos, setClientId } = todosSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;
export default todosSlice.reducer;
