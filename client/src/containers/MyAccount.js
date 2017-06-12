import React, { Component } from 'react';
import { connect } from 'react-redux';
import BidModal from './BidModal';

/* * Actions * */
import { fetchAuction, toggleModal } from '../actions';

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
    // if (!this.props.auction) {
    //   const { id } = this.props.match.params;
    //   this.props.fetchAuction(id);
    // }
    // const post = this.props.getAuctionsByOwner
  }

  render() {
    const { auction } = this.props;
    if (!auction) {
      console.log('this >>>',this.props)
      // return <div>Loading...</div>;
    }

    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={"My Accounts Page"}
          />
          {console.log('this>>',this)}
            <AuctionStatus 
              className="auctionBids" 
              type={"Auction Posts"} 
             />
            <AuctionStatus 
              className="auctionPosts" 
              type={"Auction Bids"}
            />

        </Card>
      </MuiThemeProvider>
      
    )
  }
};

const mapStateToProps = ({ auctions, bidding }, ownProps) => {
  return {
    auction: auctions[ownProps.match.params.id],
    bidding: bidding
  };
}

export { MyAccount };
export default connect(mapStateToProps, { fetchAuction, toggleModal })(MyAccount);

