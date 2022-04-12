import * as React from 'react';
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
import { useNavigate } from "react-router-dom";
import "./sidenav.css"

export default function Sidenav() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => () => { setOpen(!open); };

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
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        className='menu-button'
        onClick={toggleDrawer()}
      >
        <MenuIcon />
      </IconButton>
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
  );
}
