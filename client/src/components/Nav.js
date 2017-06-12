import React, { Component } from 'react';

/* * Utils * */
import { Link } from 'react-router-dom';

/* * Styles * */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { deepPurple500, tealA700 } from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const styles = {
  nav: {
    backgroundColor: deepPurple500
  },
  title: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#FFF'
  },
  buttons: {
    marginTop: 5,
    color: '#FFF',
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
            iconElementRight={
              <div style={styles.div}>
                <Link to="/auction">
                  <FlatButton label="Post" style={styles.buttons}/>
                </Link>
              </div>
            }
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