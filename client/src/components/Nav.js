import React, { Component } from 'react';

/* * Utils * */
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* * Actions * */
import { fetchCategories, changeCategory, fetchAuctions } from '../actions';

/* * Styles * */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
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
    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="/myaccount" style={styles.links} >
      <MenuItem primaryText="My Account" />
    </Link>
    <a href="/logout" style={styles.links} >
      <MenuItem primaryText="Sign out" />
    </a>
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
  links: {
    textDecoration: 'none'
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

class Nav extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(e, value) {
    this.props.changeCategory(value);
    this.props.fetchAuctions(value);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title={<Link to="/" style={styles.title}>Toss.it</Link>}
            iconElementLeft={
              <IconMenu
                iconButtonElement={
                  <IconButton>
                    <ContentFilter color={grey50}/>
                  </IconButton>
                }
                onChange={this.handleChange.bind(this)}
                value={this.props.showing}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                menuStyle={{maxHeight: 300}}
              >
                <MenuItem
                  key="all"
                  value="all"
                  primaryText="All"
                  containerElement={<Link to="/" style={styles.links} />}
                />
                {this.props.categories.map(category => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    primaryText={category.name}
                    containerElement={<Link to="/" style={styles.links} />}
                  />
                ))}
              </IconMenu>
            }
            iconElementRight={<LoggedIn />}
            style={styles.nav}
            zDepth={1}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Link to="/auction">
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

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories.categories,
    showing: categories.showing
  };
};

export default connect(mapStateToProps, { fetchCategories, changeCategory, fetchAuctions })(Nav);
