import React, { Component } from 'react';

/* * Utils * */
import { Link } from 'react-router-dom';

/* * Styles * */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { deepPurple500, tealA700, grey50 } from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const LoggedIn = () => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon color={grey50}/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="My Profile" />
    <a href="/logout" ><MenuItem primaryText="Sign out" /></a>
  </IconMenu>
);

const styles = {
  nav: {
    backgroundColor: deepPurple500
  },
  title: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#FFF'
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    zIndex: 100,
    position: 'fixed',
  }
};

export default class Nav extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title={<Link to="/" style={styles.title}>Toss.it</Link>}
            iconElementRight={<LoggedIn />}
            style={styles.nav}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Link to='/auction'>
            <FloatingActionButton
              style={styles.fab}
              backgroundColor={tealA700}
            >
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        </MuiThemeProvider>
      </div>
    );
  }
}