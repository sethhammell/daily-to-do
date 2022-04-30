import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import Stats from '../../routes/stats/stats';
import store from './../../redux/store';

const mockStats = () => {
  return (
    <Provider store={store}>
      <Router>
        <Stats />
      </Router>
    </Provider>
  );
}

describe('Stats', () => {
  test('Find stats and logout text', () => {
    render(mockStats());
    expect(screen.getByText("Stats")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
