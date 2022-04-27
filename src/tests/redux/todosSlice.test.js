import todosSlice, { setClientId, setTodos } from "../../redux/reducers/todosSlice";

describe('todosSlice', () => {
  test('Should return the initial state', () => {
    expect(todosSlice(undefined, {})).toEqual(
      {
        todos: [],
        clientId: ""
      }
    );
  });

  test('setTodos sets todos to value', () => {
    const todo = [{
      id: "1",
      todoCompletionData: [],
      clientId: "2",
      taskName: "3",
      estimatedTime: 4,
      daysOfWeek: {}
    }];

    expect(todosSlice(undefined, setTodos(todo))).toEqual(
      {
        todos: todo,
        clientId: ""
      }
    );
  });

  test('setClientId sets clientId to value', () => {
    const clientId = "123";

    expect(todosSlice(undefined, setClientId(clientId))).toEqual(
      {
        todos: [],
        clientId: clientId
      }
    );
  });
});
