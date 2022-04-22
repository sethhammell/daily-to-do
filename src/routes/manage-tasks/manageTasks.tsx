import React from 'react';
import ManageTasksTable from "./manageTasksTable";
import ManageTaskDialog from './manageTaskDialog';
import { Todo } from "../../interfaces/todo";
import { DaysOfWeek } from '../../interfaces/daysOfWeek';
import RouteHeaderBar from '../../components/routeHeaderBar/routeHeaderBar';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import './manageTasks.css';

interface ManageTasksProps { todos?: Todo[] }
interface ManageTasksState {
  child: React.RefObject<ManageTaskDialog>;
  clientId: string | null;
  showManageTaskDialog: boolean;
  editTask: boolean;
}
class ManageTasks extends React.Component<ManageTasksProps, ManageTasksState> {
  constructor(props: ManageTasksProps) {
    super(props);
    this.state = {
      child: React.createRef(),
      clientId: null,
      showManageTaskDialog: false,
      editTask: false
    };
  }

  openManageTaskDialog(editTask: boolean = false, id: string = "") {
    if (editTask) {
      this.setEditedTodo(id);
    }
    else {
      this.state.child.current?.setDefaultState();
    }
    this.setState({
      editTask: editTask,
      showManageTaskDialog: true
    });
  }

  closeManageTaskDialog() {
    this.setState({ showManageTaskDialog: false });
  }

  setEditedTodo(id: string) {
    if (!this.props.todos) return;
    const editedTodoArray = this.props.todos.filter((todo: any) => todo.id === id);
    if (editedTodoArray.length) {
      const editedTodo = editedTodoArray[0];
      this.state.child.current?.setState({
        id: id,
        taskName: editedTodo.taskName,
        estimatedTime: editedTodo.estimatedTime.toString(),
        days: daysOfWeekToDays(editedTodo.daysOfWeek),
        daysOfWeek: editedTodo.daysOfWeek
      });
    }
  }

  render() {
    return (
      <div>
        <RouteHeaderBar routeName='Manage Tasks' />
        <div className='manage-tasks-table-container'>
          <ManageTasksTable
            openManageTaskDialog={this.openManageTaskDialog.bind(this)}
          ></ManageTasksTable>
          <ManageTaskDialog
            ref={this.state.child}
            open={this.state.showManageTaskDialog}
            editTask={this.state.editTask}
            closeManageTaskDialog={this.closeManageTaskDialog.bind(this)}
          ></ManageTaskDialog>
        </div>
      </div>
    );
  }
}

function daysOfWeekToDays(daysOfWeek: DaysOfWeek): string[] {
  const days: string[] = [];
  if (daysOfWeek.sunday) days.push("sunday");
  if (daysOfWeek.monday) days.push("monday");
  if (daysOfWeek.tuesday) days.push("tuesday");
  if (daysOfWeek.wednesday) days.push("wednesday");
  if (daysOfWeek.thursday) days.push("thursday");
  if (daysOfWeek.friday) days.push("friday");
  if (daysOfWeek.saturday) days.push("saturday");
  return days;
}

function mapStateToProps(state: RootState) {
  return { todos: state.todos.todos };
}
export default connect(mapStateToProps)(ManageTasks);
