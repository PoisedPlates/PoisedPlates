import React, { Component, PropTypes } from 'react';
import Countdown from 'react-count-down'

/* * Styles * */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};


class AuctionStatus extends Component {
  componentDidMount() {

  }

  time(end_time) {
    var date = new Date(end_time);
    const cb = () => console.log('')
    const OPTIONS = { endDate: date.toString(), prefix: 'for auction', cb}
 
   const TestComponent = () => (
    <Countdown options={OPTIONS} />
   )
      
        // `${date.getHour()}:${date.getMinutes()}:${date.getSeconds()}` 
    return <Countdown options={OPTIONS}/>
  }
  
  render() {
    // console.log(">props>", this.props.auctionData)
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={'Auction ' + this.props.type}
          />
          
          <CardText>
          </CardText>
          // make a map function that input dat
            // populate each el in html list for display

  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>AuctionbidID</TableHeaderColumn>
        <TableHeaderColumn>Auction Title</TableHeaderColumn>
        <TableHeaderColumn>Bid Ends</TableHeaderColumn>
        <TableHeaderColumn>Current Bid</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
    
      {(this.props.data) && this.props.data.map( (row, index) => (
        <TableRow key={index}>
          <TableRowColumn >
            {row.id ? row.title : row.auction.id}
          </TableRowColumn>
          <TableRowColumn >
            {row.title ? row.title : row.auction.title}
          </TableRowColumn>
          <TableRowColumn >
           {row.end_time ? this.time(row.end_time) : this.time(row.auction.end_time)}
          </TableRowColumn>
          <TableRowColumn >
           {row.bid ? row.bid : ""}
          </TableRowColumn>
      </TableRow>
      ))}
    </TableBody>
  </Table>
);
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default AuctionStatus