import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import DateInterface from '../../routes/home/dateInterface';

const today = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long' };
const todaysDate = today.toLocaleDateString('en-US', options);
describe('DateInterace', () => {
  test('Find todays date', () => {
    render(<DateInterface todosDate={today} updateTodosDate={() => { }} />);
    expect(screen.getByText(todaysDate)).toBeInTheDocument();
  });
});
