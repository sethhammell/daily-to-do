import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Create';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';
import "./sidenav.css"

export default function Sidenav() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => () => { setOpen(!open); };
  const logOut = () => {
    Auth.signOut().catch(err => console.log(err));
  }

  const navlist = (
    <div>
      <List>
        <ListItem button onClick={() => { toggleDrawer() }}>
          <ListItemIcon>
            <ChevronLeftIcon />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem button onClick={() => { navigate("/") }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => { navigate("/manage-tasks") }}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Tasks" />
        </ListItem>
        <ListItem button onClick={() => { navigate("/stats") }}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Stats" />
        </ListItem>
        <Divider />
        <ListItem button onClick={logOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box>
      <div>
        <IconButton onClick={toggleDrawer()}><MenuIcon /></IconButton>
        <Drawer open={open} onClose={toggleDrawer()}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
            className="nav"
          >
            {navlist}
          </div>
        </Drawer>
      </div>
    </Box>
  );
}