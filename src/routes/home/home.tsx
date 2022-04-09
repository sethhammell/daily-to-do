import React from 'react';
import HomeTasksTable from "./homeTasksTable";
import Sidenav from "../../sidenav/sidenav";
import { Todo } from "../../interfaces/todo";
import "./home.css";

import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { listTodos } from '../../graphql/queries';

interface HomeProps { }
interface HomeState {
  todos: Todo[];
  clientId: string;
}
class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      todos: [],
      clientId: ""
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
      const newTodos = apiData.data.listTodos.items as Todo[];
      this.setState({
        todos: newTodos
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="home">
        <Sidenav />
        {(() => {
          if (this.state.todos.length) {
            return (
              <div className="tasks">
                <HomeTasksTable todos={this.state.todos} />
              </div>
            )
          }
        })()}
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

export default Home;
