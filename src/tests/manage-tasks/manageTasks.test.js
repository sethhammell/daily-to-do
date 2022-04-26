import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './../../redux/store';
import ManageTasks from '../../routes/manage-tasks/manageTasks';

const mockHome = () => {
  return (
    <Provider store={store}>
      <Router>
        <ManageTasks />
      </Router>
    </Provider>
  );
}

describe('ManageTasks', () => {
  test('Find manage tasks and logout text', () => {
    render(mockHome());
    expect(screen.getByText("Manage Tasks")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
