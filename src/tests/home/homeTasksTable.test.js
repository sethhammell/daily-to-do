import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeTasksTable from '../../routes/home/homeTasksTable';

const mockEmptyHomeTasksTable = () => {
  return (
    <Router>
      <HomeTasksTable todos={[]} todoCompletionData={{}} />
    </Router>
  );
}

const todoHeaders = ["Completed", "Task Name", "Estimated Time", "Time Spent"];

describe('HomeTasksTable', () => {
  test('Find all header texts', () => {
    render(mockEmptyHomeTasksTable());
    todoHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
  test('Empty table shows when todos are empty', () => {
    render(mockEmptyHomeTasksTable());
    const emptyTableText = "You have no tasks scheduled for today, click here to create some.";
    expect(screen.getByText(emptyTableText)).toBeInTheDocument();
  });
});
