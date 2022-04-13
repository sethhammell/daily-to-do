import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./home.css";

interface DateInterfaceProps {
  toodsDate: Date;
}
interface DateInterfaceState { }
class DateInterface extends React.Component<DateInterfaceProps, DateInterfaceState> {
  constructor(props: DateInterfaceProps) {
    super(props);
    this.state = {};
  }

  render() {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const formatedDate = this.props.toodsDate.toLocaleDateString("en-US", options);
    return (
      <div>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography align="center" gutterBottom variant="h5">
                {formatedDate}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    )
  }
}

export default DateInterface;
