import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, Auth } from 'aws-amplify';
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { listTodos } from '../../graphql/queries';
import { Todo, TodoCompletionData, TodoData, TodoDataId } from '../../interfaces/todo';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation, updateTodo as updateTodoMutation } from '../../graphql/mutations';
import type { RootState } from '../store';

interface TodosState {
  todos: Todo[];
  clientId: string;
}

interface editTodoCompletionDataPayload {
  id: string;
  todoCompletionData: { [key: string]: TodoCompletionData };
}

const initialState: TodosState = {
  todos: [],
  clientId: ""
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodos: (state) => {
      if (state.clientId) return;
      try {
        (API.graphql({
          query: listTodos, variables: {
            filter: {
              clientId: { eq: state.clientId }
            }
          }
        }) as Promise<GraphQLResult<any>>).then((apiData: { [key: string]: any }) => {
          if (apiData.data?.listTodos?.items === undefined) return;
          state.todos = apiData.data.listTodos.items;
        });
        // this.updateTodos();
      } catch (error) {
        console.log(error);
      }
    },
    createTodo: (state, action: PayloadAction<TodoData>) => {
      if (state.clientId) return;
      const todo = action.payload;
      todo.clientId = state.clientId;
      (API.graphql({ query: createTodoMutation, variables: { input: todo } }) as Promise<GraphQLResult<any>>).then((newData: GraphQLResult<any>) => {
        state.todos = [...state.todos, newData.data.createTodo];
      });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo: any) => todo.id !== id);
      API.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
    },
    editTodo: (state, action: PayloadAction<TodoDataId>) => {
      if (state.clientId) return;
      const todo = action.payload;
      todo.clientId = state.clientId;
      (API.graphql({ query: updateTodoMutation, variables: { input: todo } }) as Promise<GraphQLResult<any>>).then((newData: GraphQLResult<any>) => {
        const newTodo = newData.data.updateTodo;
        const newTodosArray = state.todos.map((td: any) => {
          if (td.id === todo.id) {
            return newTodo;
          }
          else {
            return td;
          }
        });
        state.todos = [...newTodosArray];
      });
    },
    editTodoCompletionData: (state, action: PayloadAction<editTodoCompletionDataPayload>) => {
      if (state.clientId) return;
      const { id, todoCompletionData } = action.payload;
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
    },
    getClientId: (state) => {
      try {
        Auth.currentAuthenticatedUser().then((id: string) => {
          state.clientId = id;
        })
      }
      catch (error) {
        console.log(error);
      };
    }
  },
})

export const { fetchTodos, createTodo, editTodo, deleteTodo, editTodoCompletionData, getClientId } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todosSlice.reducer;
