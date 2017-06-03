const models = require('./');

const pg = {
  getAllAuctions: () => {
    return models.Auction.collection().fetch({
      withRelated: ['images', 'location', 'auctionOwner', 'bids', 'category', 'bidsProfiles']
    })
    .then(collection => {
      return collection;
    })
    .catch(error => {
      return error;
    });
  },

  getAuctionById: (auctionId) => {
    return models.Auction
      .where({ id: auctionId })
      .fetch({
        withRelated: ['images', 'location', 'auctionOwner', 'bids', 'category', 'bidsProfiles']
      })
      .then(auction => {
        return auction;
      })
      .catch(error => {
        return error;
      });
  },

  deleteAuctionById: (auctionId) => {
    return models.Auction
      .where({ id: auctionId })
      .destroy()
      .then(deletedAuction => {
        return deletedAuction;
      })
      .catch(error => {
        return error;
      });
  },

  getAllCategories: () => {
    return models.Category
      .collection()
      .fetch({
        columns: ['id', 'name']
      })
      .then(categories => {
        return categories;
      })
      .catch(error => {
        return error;
      });
  },

  createAuction: (options) => {
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
              // returns new increment of locations table insert
              return newLocation;
            })
            .catch(error => {
              return error;
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
            return models.Auction
              .forge({
                profile_id: 4,
                // profile_id: options.user,
                category_id: category.id,
                location_id: location.id,
                end_time: options.end_time || new Date(),
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
                    return newAuction;
                  });
              })
              .catch(error => {
                return error;
              });
          });
      })
      .catch(error => {
        return error;
      });
  }
};

module.exports = pg;
