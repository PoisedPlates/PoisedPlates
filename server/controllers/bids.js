const { getAuctionsByProfileId } = require('../controllers').Auctions;
const AuctionsController = require('../controllers').Auctions;
const models = require('../../db/models');

module.exports.postBid = (options, cb) => {
  return models.Bid
    .forge(options)
    .save()
    .then(bid => {
      cb(null, bid);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.currentUserBid = ({ auctionId, profileId }, cb) => {
  return models.Bid
    .where({ auction_id: auctionId, profile_id: profileId })
    .orderBy('bid', 'desc')
    .fetch({
      columns: ['bid']
    })
    .then(bid => {
      cb(null, bid);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.currentUserBids = ({ profileId }, cb) => {
  return models.Bid
    .where({ profile_id: profileId })
    .orderBy('bid', 'desc')
    .fetch({
      columns: ['bid']
    })
    .then(bid => {
      cb(null, bid);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.getBidsByProfileId = ({profileId}, cb) => {
  return models.Bid
    .where( { profile_id: profileId } )
    .fetchAll({
      columns: ['auction_id', 'bid'],
      withRelated: [{
        'auction': (qb) => {
          qb.select('id', 'title', 'end_time')
        }
      }]
    })
    .then(bidsByProfileId => { 
      cb(null, bidsByProfileId);
    })
    .catch(err => {
      cb(err, null);
    });
};