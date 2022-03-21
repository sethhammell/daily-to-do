import React, { useState, useEffect } from 'react';
import './createTasks.css';
import { API } from 'aws-amplify';
import { listTodos } from '../../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../../graphql/mutations';

const initialFormState = { name: '', description: '' }

function CreateTasks() {
  const [todos, setTodos] = useState([]) as any;
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const apiData = await API.graphql({ query: listTodos }) as any;
    setTodos(apiData.data.listTodos.items);
  }

  async function createTodo() {
    if (!formData.name || !formData.description) return;
    const newData: any = await API.graphql({ query: createTodoMutation, variables: { input: formData } });
    const newTodo = newData.data.createTodo;
    setTodos([...todos, newTodo]);
    setFormData(initialFormState);
  }

  async function deleteTodo(todo: any) {
    const id = todo.id;
    const newTodosArray = todos.filter((todo: any) => todo.id !== id);
    setTodos(newTodosArray);
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My Todos App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Todo name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Todo description"
        value={formData.description}
      />
      <button onClick={createTodo}>Create Todo</button>
      <div style={{marginBottom: 30}}>
        {
          todos.map((todo: any) => (
            <div key={todo.id}>
              <h2>{todo.name}</h2>
              <p>{todo.description}</p>
              <button onClick={() => deleteTodo(todo)}>Delete todo</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CreateTasks;

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