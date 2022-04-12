import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Sidenav from '../sidenav/sidenav';
import { Auth } from 'aws-amplify';
import "./routeHeaderBar.css";

interface RouteHeaderBarProps {
  routeName: string;
}
export default function RouteHeaderBar(props: RouteHeaderBarProps) {
  return (
    <div className='route-header-bar-container'>
      <Box className='flex-grow'>
        <AppBar>
          <Toolbar>
            <Sidenav />
            <Typography variant="h6" className='flex-grow'>
              {props.routeName}
            </Typography>
            <Button color="inherit" onClick={logOut}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

const logOut = () => {
  Auth.signOut().catch(err => console.log(err));
}
