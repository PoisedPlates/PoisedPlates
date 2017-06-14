import React, { Component } from 'react';
import { connect } from 'react-redux';
import BidModal from './BidModal';

/* * Actions * */
import { fetchAuctionByProfileId, fetchBidsByProfileId } from '../actions';

/* * Utils * */
import _ from 'lodash';
import { Link } from 'react-router-dom';

/* * Styles * */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/* * Components * */
import AuctionStatus from '../components/AuctionStatus'

class MyAccount extends Component { //rip from AuctionPage
  componentDidMount() {
    this.props.fetchAuctionByProfileId()
    this.props.fetchBidsByProfileId()
  }

  render() {
    const { auction } = this.props;
    // console.log('props>>', this.props)
    if (!auction) {
      // return <div>Loading...</div>;
    }

    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={"My Accounts Page"}
          />
            <AuctionStatus 
              className="auctionBids" 
              type={"posts"} 
              data ={this.props.auctions}
             />
            <AuctionStatus 
              className="auctionPosts" 
              type={"bids"}
              data={this.props.bids}
            />

        </Card>
      </MuiThemeProvider>
      
    )
  }
};

const mapStateToProps = ({ profile }, ownProps) => {
  return {
    auctions: profile.auctions,
    bids: profile.bids
  };
}

export default connect(mapStateToProps, { fetchAuctionByProfileId, fetchBidsByProfileId})(MyAccount);

