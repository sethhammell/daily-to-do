import React, { useState, useEffect } from 'react';
import './manageTasks.css';
import Sidenav from "../../sidenav/sidenav";
import ManageTasksTable from "./manageTasksTable";
import CreateTaskDialog from './createTaskDialog';
import { Todo } from "../../interfaces/todo";

import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { listTodos } from '../../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../../graphql/mutations';

// const initialFormState = { name: '', description: '' }

interface ManageTasksProps { }
interface ManageTasksState {
  todos: any;
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

    // const[todos, setTodos] = useState([]) as any;
    // const [formData, setFormData] = useState(initialFormState);
    // const [clientId, setClientId] = useState<string | null>(null);


    // only for functional components
    // useEffect(() => {
    //   this.fetchTodos();
    // }, []);
  }

  componentDidMount() {
    getClientId().then(clientId => {
      if (clientId !== '') {
        this.setState({ clientId: clientId });
      }
    })
  }

  async fetchTodos() {
    const apiData = await API.graphql({ query: listTodos }) as any;
    console.log(apiData);
    // setTodos(apiData.data.listTodos.items);
  }

  async createTodo() {
    // if (!clientId) return;
    const todo: Todo = {
      clientId: this.state.clientId!,
      taskName: "Test",
      estimatedTime: 121,
      daysOfWeek: {
        sunday: false,
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      }
    }
    // if (!formData.name || !formData.description) return;
    const newData: any = await API.graphql({ query: createTodoMutation, variables: { input: todo } });
    const newTodo = newData.data.createTodo;
    console.log(newTodo);
    this.setState({ todos: [...this.state.todos, newTodo] });
    // setFormData(initialFormState);
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
            openCreateTaskDialog={this.openCreateTaskDialog.bind(this)}
          ></ManageTasksTable>
          <CreateTaskDialog
            open={this.state.showCreateTaskDialog}
            closeCreateTaskDialog={this.closeCreateTaskDialog.bind(this)}
          ></CreateTaskDialog>
        </div>
        {/* <h1>My Todos App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value })}
        placeholder="Todo name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value })}
        placeholder="Todo description"
        value={formData.description}
      />
      <button onClick={createTodo}>Create Todo</button>
      <div style={{ marginBottom: 30 }}>
        {
          todos.map((todo: any) => (
            <div key={todo.id}>
              <h2>{todo.clientId}</h2>
              <p>{todo.taskName}</p>
              <p>{todo.estimatedTime}</p>
              <p>{todo.daysOfWeek.monday}</p>
              <p>{todo.daysOfWeek.sunday}</p>
              <button onClick={() => deleteTodo(todo)}>Delete todo</button>
            </div>
          ))
        }
      </div> */}
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

// import React, { useState, useEffect } from 'react';
// import './createTasks.css';
// import { API, Storage } from 'aws-amplify';
// import { listTodos } from '../../graphql/queries';
// import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../../graphql/mutations';

// const initialFormState = { name: '', description: '', image: null }

// function CreateTasks() {
//   const [todos, setTodos] = useState([]) as any;
//   const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   async function fetchTodos() {
//     const apiData = await API.graphql({ query: listTodos }) as any;
//     const todosFromAPI = apiData.data.listTodos.items;
//     await Promise.all(todosFromAPI.map(async (todo: any) => {
//       if (todo.image) {
//         const image = await Storage.get(todo.image);
//         todo.image = image;
//       }
//       return todo;
//     }));
//     setTodos(apiData.data.listTodos.items);
//   }

//   async function createTodo() {
//     if (!formData.name || !formData.description) return;
//     const newData: any = await API.graphql({ query: createTodoMutation, variables: { input: formData } });
//     const newTodo = newData.data.createTodo;
//     if (newTodo.image) {
//       const image = await Storage.get(newTodo.image);
//       newTodo.image = image;
//     }
//     setTodos([...todos, newTodo]);
//     setFormData(initialFormState);
//   }

//   async function deleteTodo(todo: any) {
//     const id = todo.id;
//     const newTodosArray = todos.filter((todo: any) => todo.id !== id);
//     setTodos(newTodosArray);
//     await API.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
//   }

//   async function onChange(e: any) {
//     if (!e.target.files[0]) return
//     const file = e.target.files[0];
//     setFormData({ ...formData, image: file.name });
//     await Storage.put(file.name, file);
//     fetchTodos();
//   }

//   return (
//     <div className="App">
//       <h1>My Todos App</h1>
//       <input
//         onChange={e => setFormData({ ...formData, 'name': e.target.value })}
//         placeholder="Todo name"
//         value={formData.name}
//       />
//       <input
//         onChange={e => setFormData({ ...formData, 'description': e.target.value })}
//         placeholder="Todo description"
//         value={formData.description}
//       />
//       <input
//         type="file"
//         onChange={onChange}
//       />
//       <button onClick={createTodo}>Create Todo</button>
//       <div style={{ marginBottom: 30 }}>
//         {
//           todos.map((todo: any) => (
//             <div key={todo.id}>
//               <h2>{todo.name}</h2>
//               <p>{todo.description}</p>
//               <button onClick={() => deleteTodo(todo)}>Delete todo</button>
//               {
//                 todo.image && <img src={todo.image} style={{ width: 400 }} alt="failed to load" />
//               }
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   );
// }

// export default CreateTasks;