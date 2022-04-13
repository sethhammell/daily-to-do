import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CardActionArea, TextField } from '@mui/material';
import "./home.css";

interface DateInterfaceProps {
  toodsDate: Date;
  updateTodosDate(newDate: Date): void;
}
interface DateInterfaceState {
  open: boolean;
}
class DateInterface extends React.Component<DateInterfaceProps, DateInterfaceState> {
  constructor(props: DateInterfaceProps) {
    super(props);
    this.state = {
      open: false
    };
  }

  incrementTodosDate() {
    const incrementedDate = new Date(this.props.toodsDate);
    incrementedDate.setDate(incrementedDate.getDate() + 1);
    this.props.updateTodosDate(incrementedDate);
  }

  decrementTodosDate() {
    const incrementedDate = new Date(this.props.toodsDate);
    incrementedDate.setDate(incrementedDate.getDate() - 1);
    this.props.updateTodosDate(incrementedDate);
  }

  toggleDatePicker() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const formatedDate = this.props.toodsDate.toLocaleDateString("en-US", options);

    return (
      <div className='date-interface-container'>
        <Card className='date date-button'>
          <CardActionArea className='date-button-area' onClick={this.decrementTodosDate.bind(this)}>
            <div className='icon-container'>
              <ChevronLeftIcon fontSize="large" />
            </div>
          </CardActionArea>
        </Card>
        <div className='date-display-container'>
          <Card className='date date-display'>
            <CardActionArea onClick={this.toggleDatePicker.bind(this)}>
              <CardContent>
                <Typography align="center" gutterBottom variant="h5">
                  {formatedDate}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          {(() => {
            if (this.state.open) {
              return (
                <div className='date-picker'>
                  <div className='date-picker-display-container'>
                    <Card className='date-picker-display'>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                          displayStaticWrapperAs="desktop"
                          value={this.props.toodsDate}
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
          })()}
        </div>
        <Card className='date date-button'>
          <CardActionArea className='date-button-area' onClick={this.incrementTodosDate.bind(this)}>
            <div className='icon-container'>
              <ChevronRightIcon fontSize="large" />
            </div>
          </CardActionArea>
        </Card>
      </div>
    )
  }
}

export default DateInterface;
