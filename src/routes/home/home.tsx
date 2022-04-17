import React from 'react';
import HomeTasksTableWithNav from "./homeTasksTable";
import RouteHeaderBar from "../../components/routeHeaderBar/routeHeaderBar";
import { Todo } from "../../interfaces/todo";
import "./home.css";

import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { listTodos } from '../../graphql/queries';
import DateInterface from './dateInterface';

interface HomeProps { }
interface HomeState {
  todos: Todo[];
  allTodos: Todo[];
  clientId: string;
  todosDate: Date;
}
class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      todos: [],
      allTodos: [],
      clientId: "",
      todosDate: new Date()
    }
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

      this.setState({ allTodos: apiData.data.listTodos.items });
      this.updateTodos();
    } catch (error) {
      console.log(error);
    }
  }

  updateTodos() {
    const filterDayOfWeek = dayOfWeekFilter(this.state.allTodos, this.state.todosDate);

    const newTodos = filterDayOfWeek as Todo[];
    this.setState({
      todos: newTodos
    });
  }

  updateTodosDate(newDate: Date) {
    this.setState({ todosDate: newDate }, () => {
      this.updateTodos();
    });
  }

  render() {
    return (
      <div className="home">
        <RouteHeaderBar routeName="Home" />
        <div className='home-container'>
          <div className='date-container'>
            <DateInterface todosDate={this.state.todosDate} updateTodosDate={this.updateTodosDate.bind(this)} />
          </div>
          <div className="tasks">
            <HomeTasksTableWithNav todos={this.state.todos} />
          </div>
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

function dayOfWeekFilter(todos: Todo[], date: Date): Todo[] {
  const dayOfWeek = date.toLocaleString(
    'default', { weekday: 'long' }
  );

  const newTodos = todos.filter((todo: Todo) => {
    if (dayOfWeek === "Sunday")
      return todo.daysOfWeek.sunday;
    if (dayOfWeek === "Monday")
      return todo.daysOfWeek.monday;
    if (dayOfWeek === "Tuesday")
      return todo.daysOfWeek.tuesday;
    if (dayOfWeek === "Wednesday")
      return todo.daysOfWeek.wednesday;
    if (dayOfWeek === "Thursday")
      return todo.daysOfWeek.thursday;
    if (dayOfWeek === "Friday")
      return todo.daysOfWeek.friday;
    if (dayOfWeek === "Saturday")
      return todo.daysOfWeek.saturday;
    return false;
  });

  return newTodos;
}

export default Home;
