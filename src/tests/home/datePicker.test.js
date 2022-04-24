import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import DatePicker from '../../routes/home/datePicker';

const today = new Date();
const optionsDay = { day: 'numeric' };
const optionsMonth = { month: 'long' };
const optionsYear = { year: 'numeric' };
const todaysDay = today.toLocaleDateString('en-US', optionsDay);
const todaysMonth = today.toLocaleDateString('en-US', optionsMonth);
const todaysYear = today.toLocaleDateString('en-US', optionsYear);

describe('DatePicker', () => {
  test('Find todays date when datePicker is open', () => {
    render(<DatePicker open={true}/>);
    expect(screen.getByText(todaysDay)).toBeInTheDocument();
    expect(screen.getByText(todaysMonth)).toBeInTheDocument();
    expect(screen.getByText(todaysYear)).toBeInTheDocument();
  });
  test('Can not find todays date when datePicker is closed', () => {
    render(<DatePicker open={false}/>);
    expect(screen.queryByText(todaysDay)).toBeNull();
    expect(screen.queryByText(todaysMonth)).toBeNull();
    expect(screen.queryByText(todaysYear)).toBeNull();
  });
});
