import React from "react";
import { connect } from "react-redux";
import RouteHeaderBar from "../../components/routeHeaderBar/routeHeaderBar";
import { Todo, TodoCompletionData, TodoStats } from "../../interfaces/todo";
import { RootState } from "../../redux/store";
import StatsTasksTable from "./statsTasksTable";
import "./stats.css";

interface StatsProps { todos?: Todo[] }
interface StatsState { todoStats: TodoStats[] }
class Stats extends React.Component<StatsProps, StatsState> {
  constructor(props: StatsProps) {
    super(props);
    this.state = {
      todoStats: []
    }
    // total time spent on all tasks, total number of tasks completed, first task created date
  }

  componentDidMount() {
    this.updateTodoStats();
  }

  componentDidUpdate(prevProps: StatsProps) {
    if (prevProps.todos?.length !== this.props.todos?.length) {
      this.updateTodoStats();
    }
  }

  updateTodoStats() {
    const newTodoStats: TodoStats[] = this.props.todos!.map((todo: Todo) => {
      let totalTimeSpent = 0;
      let numberOfCompletedTasks = 0;
      todo.todoCompletionData.forEach((cd: TodoCompletionData) => {
        totalTimeSpent += cd.timeSpent;
        numberOfCompletedTasks += cd.completed ? 1 : 0;
      });
      const averageTimePerTask = !numberOfCompletedTasks ? 0 : +(totalTimeSpent / numberOfCompletedTasks).toFixed(2);
      return {
        id: todo.id,
        taskName: todo.taskName,
        totalTimeSpent: totalTimeSpent,
        numberOfCompletedTasks: numberOfCompletedTasks,
        averageTimePerTask: averageTimePerTask,
        createdAt: todo.createdAt?.substring(0, 10)
      } as TodoStats;
    });
    this.setState({ todoStats: newTodoStats });
  }

  render() {
    return (
      <div>
        <RouteHeaderBar routeName="Stats" />
        <div className="stats-container">
          <div className="stats-table-container">
            <StatsTasksTable todoStats={this.state.todoStats} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return { todos: state.todos.todos };
}
export default connect(mapStateToProps)(Stats);
