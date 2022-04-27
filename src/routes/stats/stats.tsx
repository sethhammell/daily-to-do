import React from "react";
import { connect } from "react-redux";
import RouteHeaderBar from "../../components/routeHeaderBar/routeHeaderBar";
import { Todo, TodoCompletionData, TodoStats } from "../../interfaces/todo";
import { RootState } from "../../redux/store";
import StatsTasksTable from "./statsTasksTable";
import "./stats.css";
import StatDisplay from "./statDisplay";

interface StatsProps { todos?: Todo[] }
interface StatsState {
  todoStats: TodoStats[],
  totalTimeSpent: number,
  totalNumberOfTasksCompleted: number,
  daysSinceFirstTask: number
}
class Stats extends React.Component<StatsProps, StatsState> {
  constructor(props: StatsProps) {
    super(props);
    this.state = {
      todoStats: [],
      totalTimeSpent: 0,
      totalNumberOfTasksCompleted: 0,
      daysSinceFirstTask: 0
    }
  }

  componentDidMount() {
    this.updateStats();
  }

  componentDidUpdate(prevProps: StatsProps) {
    if (prevProps.todos?.length !== this.props.todos?.length) {
      this.updateStats();
    }
  }

  resetStats() {
    this.setState({
      totalTimeSpent: 0,
      totalNumberOfTasksCompleted: 0,
      daysSinceFirstTask: 0
    });
  }

  updateStats() {
    this.resetStats();
    let newTotalTimeSpent = 0;
    let newTotalNumberOfTasksCompleted = 0;
    let oldestDate = new Date();

    const newTodoStats: TodoStats[] = this.props.todos!.map((todo: Todo) => {
      let totalTimeSpent = 0;
      let numberOfCompletedTasks = 0;
      todo.todoCompletionData.forEach((cd: TodoCompletionData) => {
        totalTimeSpent += cd.timeSpent;
        numberOfCompletedTasks += cd.completed ? 1 : 0;
      });
      const averageTimePerTask = !numberOfCompletedTasks ? 0 : +(totalTimeSpent / numberOfCompletedTasks).toFixed(2);

      newTotalTimeSpent += totalTimeSpent;
      newTotalNumberOfTasksCompleted += numberOfCompletedTasks;
      const createdDate = new Date(todo.createdAt!.substring(0, 10));
      if (createdDate < oldestDate) {
        oldestDate = createdDate;
      }

      return {
        id: todo.id,
        taskName: todo.taskName,
        totalTimeSpent: totalTimeSpent,
        numberOfCompletedTasks: numberOfCompletedTasks,
        averageTimePerTask: averageTimePerTask,
        createdAt: todo.createdAt?.substring(0, 10)
      } as TodoStats;
    });
    this.setState({
      todoStats: newTodoStats,
      totalTimeSpent: newTotalTimeSpent,
      totalNumberOfTasksCompleted: newTotalNumberOfTasksCompleted, daysSinceFirstTask: Math.floor((new Date().getTime() - oldestDate.getTime()) / (24 * 60 * 60 * 1000))
    });
  }

  render() {
    return (
      <div>
        <RouteHeaderBar routeName="Stats" />
        <div className="stats-container">
          <div className="display-container">
            <div className="display-stats-container">
              <StatDisplay header="Total Time Spent" stat={this.state.totalTimeSpent} />
              <StatDisplay header="Total Tasks Completed" stat={this.state.totalNumberOfTasksCompleted} />
              <StatDisplay header="Days Since First Task" stat={this.state.daysSinceFirstTask} />
            </div>
            <div className="stats-table-container">
              <StatsTasksTable todoStats={this.state.todoStats} />
            </div>
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
