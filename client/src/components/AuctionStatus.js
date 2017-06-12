import React, { Component } from 'react';

/* * Styles * */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AuctionStatus extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={this.props.type}
          />
          <CardText>
          {this.props.auctions}
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default AuctionStatus