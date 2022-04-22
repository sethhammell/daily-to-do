import React from 'react';
import HomeTasksTableWithNav from "./homeTasksTable";
import RouteHeaderBar from "../../components/routeHeaderBar/routeHeaderBar";
import { Todo, TodoCompletionData } from "../../interfaces/todo";
import DateInterface from './dateInterface';
import { connect } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { editTodoCompletionData } from '../../redux/reducers/todosSlice';
import "./home.css";

interface HomeProps { todos?: Todo[] }
interface HomeState {
  dayOfTodos: Todo[];
  todosDate: Date;
  todoCompletionData: { [key: string]: TodoCompletionData };
}
class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      dayOfTodos: [],
      todosDate: new Date(),
      todoCompletionData: {}
    }
  }

  componentDidMount() {
    this.updateTodos();
  }

  componentDidUpdate(prevProps: HomeProps) {
    if (prevProps.todos?.length !== this.props.todos?.length) {
      this.updateTodos();
    }
  }

  updateTodos() {
    const filterDayOfWeek = dayOfWeekFilter(this.props.todos!, this.state.todosDate);

    const newTodos = filterDayOfWeek as Todo[];
    this.setState({
      dayOfTodos: newTodos
    }, () => { this.updateTodoCompletionData() });
  }

  updateTodoCompletionData() {
    const newTodoCompletionData: { [key: string]: TodoCompletionData } = {};
    const date = this.state.todosDate.toLocaleDateString();
    this.state.dayOfTodos.forEach((todo) => {
      const data = todo.todoCompletionData.filter((cd) => {
        return cd.date === date;
      })
      if (data.length) {
        newTodoCompletionData[todo.id] = data[0];
      }
      else {
        newTodoCompletionData[todo.id] = { date: date, completed: false, timeSpent: 0 };
      }
    });
    this.setState({ todoCompletionData: newTodoCompletionData });
  }

  setTodoCompletionData(id: string, newTodoCompletionData: { [key: string]: TodoCompletionData }) {
    this.setState({ todoCompletionData: newTodoCompletionData }, async () => { await store.dispatch(editTodoCompletionData(id, this.state.todoCompletionData) as any) });
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
            <HomeTasksTableWithNav todos={this.state.dayOfTodos} todoCompletionData={this.state.todoCompletionData} setTodoCompletionData={this.setTodoCompletionData.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
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

function mapStateToProps(state: RootState) {
  return { todos: state.todos.todos };
}
export default connect(mapStateToProps)(Home);
