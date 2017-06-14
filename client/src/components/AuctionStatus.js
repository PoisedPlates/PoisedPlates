import React, { Component } from 'react';

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

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];
const sampleData = [{"id":4,"location_id":4,"end_time":"2017-06-13T20:40:36.119Z","title":"Canon camera"},{"id":5,"location_id":4,"end_time":"2020-08-14T06:27:16.119Z","title":"Apple MacBook Pro 13-inch"},{"id":6,"location_id":4,"end_time":"2020-08-14T06:27:16.119Z","title":"klean kanteen insulated"}];


class AuctionStatus extends Component {
  componentDidMount() {

  }

  time(end_time) {
    var date = new Date(end_time);
      console.log( 'a', typeof end_time )
        // `${date.getHour()}:${date.getMinutes()}:${date.getSeconds()}` 
    return date
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
          {console.log('thisprop',this.props.data)}
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
           {row.end_time ? (row.end_time) : row.auction.end_time}
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