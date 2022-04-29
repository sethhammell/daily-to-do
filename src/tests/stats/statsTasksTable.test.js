import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import StatsTasksTable from '../../routes/stats/statsTasksTable';

const mockEmptyStatsTasksTable = () => {
  return (
    <Router>
      <StatsTasksTable todoStats={[]} />
    </Router>
  );
}

const todoHeaders = ["Task Name", "Total Time Spent", "Completed Tasks", "Average Time per Task", "Created At"];

describe('StatsTasksTable', () => {
  test('Find all header texts', () => {
    render(mockEmptyStatsTasksTable());
    todoHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
  test('Empty table shows when todoStats is empty', () => {
    render(mockEmptyStatsTasksTable());
    const emptyTableText = "You have no tasks scheduled for today, click here to create some.";
    expect(screen.getByText(emptyTableText)).toBeInTheDocument();
  });
});
