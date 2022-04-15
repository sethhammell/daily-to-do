import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CardActionArea } from '@mui/material';
import DatePicker from './datePicker';
import "./home.css";

interface DateInterfaceProps {
  todosDate: Date;
  updateTodosDate(newDate: Date): void;
}
interface DateInterfaceState {
  open: boolean;
  datePickerRef: React.RefObject<HTMLDivElement>;
  dateDisplayRef: React.RefObject<HTMLDivElement>;
}
class DateInterface extends React.Component<DateInterfaceProps, DateInterfaceState> {
  constructor(props: DateInterfaceProps) {
    super(props);
    this.state = {
      open: false,
      datePickerRef: React.createRef(),
      dateDisplayRef: React.createRef()
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.closeDatePicker.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.closeDatePicker.bind(this));
  }

  closeDatePicker(event: MouseEvent) {
    if (
      this.state.open
      && this.state.datePickerRef
      && !this.state.datePickerRef?.current!.contains(event.target as HTMLDivElement)
      && this.state.dateDisplayRef
      && !this.state.dateDisplayRef?.current!.contains(event.target as HTMLDivElement)
    ) {
      this.setState({ open: false });
    }
  }

  incrementTodosDate() {
    const incrementedDate = new Date(this.props.todosDate);
    incrementedDate.setDate(incrementedDate.getDate() + 1);
    this.props.updateTodosDate(incrementedDate);
  }

  decrementTodosDate() {
    const incrementedDate = new Date(this.props.todosDate);
    incrementedDate.setDate(incrementedDate.getDate() - 1);
    this.props.updateTodosDate(incrementedDate);
  }

  toggleDatePicker() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const formatedDate = this.props.todosDate.toLocaleDateString("en-US", options);

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
          <div ref={this.state.dateDisplayRef}>
            <Card className='date date-display'>
              <CardActionArea onClick={this.toggleDatePicker.bind(this)}>
                <CardContent>
                  <Typography align="center" gutterBottom variant="h5">
                    {formatedDate}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div ref={this.state.datePickerRef}>
            <DatePicker
              open={this.state.open}
              todosDate={this.props.todosDate}
              updateTodosDate={this.props.updateTodosDate.bind(this)}
            />
          </div>
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
