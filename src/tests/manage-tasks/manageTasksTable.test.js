import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/store';
import ManageTasksTable from '../../routes/manage-tasks/manageTasksTable';

const mockEmptyManageTasksTable = () => {
  return (
    <Provider store={store}>
      <Router>
        <ManageTasksTable todos={[]} openManageTaskDialog={() => { }} />
      </Router>
    </Provider>
  );
}

const todoHeaders = ["Task Name", "Estimated Time", "Days of the Week", "Add"];

describe('ManageTasksTable', () => {
  test('Find all header texts', () => {
    render(mockEmptyManageTasksTable());
    todoHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
  test('Empty table shows when todos are empty', () => {
    render(mockEmptyManageTasksTable());
    const emptyTableText = "No tasks created yet, press the 'Add' button to create a task.";
    expect(screen.getByText(emptyTableText)).toBeInTheDocument();
  });
});
