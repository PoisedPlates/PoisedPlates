const models = require('../../db/models');

const determineWinningBidder = (auction) => {
  let winningBidder;
  if (auction.bids[0]) {
    let winningBidAmt = auction.bids[0].bid;
    let winningBidderProfileId = auction.bids[0].profile_id;
    winningBidder = auction.bidders
                    .filter((bidder) => {
                        return bidder.id === winningBidderProfileId;
                      })
                    .map((winner) => {
                      return {
                        bid: winningBidAmt,
                        first: winner.first,
                        last: winner.last,
                        email: winner.email
                      };
                    });
  }
    if (winningBidder) {
      return winningBidder[0];
    } else {
      winningBidder = null;
      return winningBidder;
    }
};

module.exports.getAllAuctions = (cb) => {
<<<<<<< 1c4063caaf1dc3ebb30c143ef5e0fda89523fd38
  return models.Auction
    .where({ ended: false })
    .fetchAll({
=======
  return models.Auction.collection()
    .fetch({
>>>>>>> bug post server fix
      columns: ['id', 'category_id', 'location_id', 'end_time', 'title', 'description'],
      withRelated: [{
        'images': (qb) => {
          qb.select('auction_id', 'url');
        },
        'location': (qb) => {
          qb.select('id', 'city', 'state');
        },
        'category': (qb) => {
          qb.select('id', 'name');
        }
      }]
    })
    .then(auctions => {
      return cb(null, auctions);
    })
    .catch(err => {
      return cb(err, null);
    });
};

module.exports.getAuctionById = (auctionId, cb) => {
  return models.Auction
    .where({ id: auctionId })
    .fetch({
      columns: ['id', 'category_id', 'location_id', 'end_time', 'title', 'description'],
      withRelated: [{
        'images': (qb) => {
          qb.select('auction_id', 'url');
        },
        'location': (qb) => {
          qb.select('id', 'city', 'state');
        },
        'category': (qb) => {
          qb.select('id', 'name');
        }
      }]
    })
    .then(auction => {
      cb(null, auction);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.getAuctionsByCategory = (categoryId, cb) => {
  return models.Auction
<<<<<<< 1c4063caaf1dc3ebb30c143ef5e0fda89523fd38
    .where({ category_id: categoryId, ended: false })
=======
    .where({ category_id: categoryId })
>>>>>>> bug post server fix
    .fetchAll({
      columns: ['id', 'category_id', 'location_id', 'end_time', 'title', 'description'],
      withRelated: [{
        'images': (qb) => {
          qb.select('auction_id', 'url');
        },
        'location': (qb) => {
          qb.select('id', 'city', 'state');
        },
        'category': (qb) => {
          qb.select('id', 'name');
        }
      }]
    })
    .then(auction => {
      cb(null, auction);
    })
    .catch(err => {
      cb(err, null);
    });
}

module.exports.createAuction = (options, cb) => {
  return models.Location
    .where({ city: options.city, state: options.state })
    .fetch({
      columns: ['id']
    })
    .then(location => {
      if (location) {
        return location;
      } else { // insert city and state into Locations table
        return models.Location
          .forge({
            city: options.city,
            state: options.state
          })
          .save()
          .then(newLocation => {
            return newLocation;
          });
      }
    })
    .then(location => {
      return models.Category
        .where({ name: options.category })
        .fetch({
          columns: ['id']
        })
        .then(category => {
<<<<<<< 1c4063caaf1dc3ebb30c143ef5e0fda89523fd38
=======
          console.log('options.end_time', options.end_time);
          console.log('options', options)
>>>>>>> bug post server fix
          return models.Auction
            .forge({
              profile_id: options.user,
              category_id: category.id,
              location_id: location.id,
<<<<<<< 1c4063caaf1dc3ebb30c143ef5e0fda89523fd38
              end_time: options.end_time || new Date(),
=======
              end_time: options.date || new Date(),
>>>>>>> bug post server fix
              title: options.title,
              description: options.description
            })
            .save()
            .then(newAuction => {
              return models.Image
                .forge({
                  auction_id: newAuction.id,
                  url: options.url
                })
                .save()
                .then(() => {
                  cb(null, newAuction);
                });
            });
        });
    });
};

module.exports.deleteAuctionById = (auctionId, cb) => {
  return models.Auction
    .where({ id: auctionId })
    .destroy()
    .then(deletedAuction => {
      cb(null, deletedAuction);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.retrieveAndUpdateEndingAuctions = (currentTime, cb) => {
  return models.Auction.query((qb) => {
      qb.where('ended', false).andWhere('end_time', '<', currentTime);
    })
    .fetchAll({
      columns: ['id', 'profile_id', 'title'],
      withRelated: ['auctionOwner', 'bidders', {
        'bids': (qb) => {
          qb.orderBy('bid', 'desc').orderBy('created_at', 'asc');
        }
      }]
    })
    .then(auctionModels => {
      let auctions = auctionModels.toJSON();
      return auctions.map((auction) => {
        let winningBidder = determineWinningBidder(auction);
        return {
          auction_id: auction.id,
          auctionTitle: auction.title,
          auctionOwner: {
            first: auction.auctionOwner.first,
            last: auction.auctionOwner.last,
            email: auction.auctionOwner.email
          },
          winningBidder
        };
      });
    })
    .tap(endingAuctions => {
      // update ending auctions
      let auctionIds = endingAuctions.map((auction) => {
        return auction.auction_id;
      });
      return models.Auction.query((qb) => {
        qb.whereIn('id', auctionIds).update({ended: true});
      }).fetch();
    })
    .then(endingAuctions => {
      cb(null, endingAuctions);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.getAuctionsByProfileId = ({profileId}, cb) => {
  return models.Auction
    .where({ profile_id: profileId })
    .fetchAll({
      columns: ['id', 'location_id', 'end_time', 'title'],
      withRelated: [{
        'bids': (qb) => {
          qb.select('auction_id');
        }
      }]
    })
    .then(auction => {
      console.log('>>here', auction)
      cb(null, auction);
    })
    .catch(err => {
      cb(err, null);
    });
};
module.exports.getAuctionsById = ({id}, cb) => {
  return models.Auction
    .where({ id: id })
    .fetchAll({
      columns: ['id', 'location_id', 'end_time', 'title'],
    })
    .then(auction => {
      console.log('>>here', auction)
      cb(null, auction);
    })
    .catch(err => {
      cb(err, null);
    });
};

