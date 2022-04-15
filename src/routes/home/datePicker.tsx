import React from 'react';
import Card from '@mui/material/Card';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField } from '@mui/material';
import "./home.css";

interface DatePickerProps {
  open: boolean;
  todosDate: Date;
  updateTodosDate(newDate: Date): void;
}
interface DatePickerState { }
class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  render() {
    if (this.props.open) {
      return (
        <div className='date-picker'>
          <div className='date-picker-display-container'>
            <Card className='date-picker-display'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={this.props.todosDate}
                  onChange={(newValue) => {
                    if (newValue) {
                      this.props.updateTodosDate(newValue);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Card>
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default DatePicker;
