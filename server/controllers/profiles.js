const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getAuctionsByOwner = (profileId, cb) => {
  models.Profile
    .where({ id: profileId })
    .fetch({
      columns: ['id'],
      withRelated: [{
        'auctions': (qb) => {
          qb.select('id', 'profile_id');
        }
      }]
    })
    .then(auctions => {
      cb(null, auctions);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports.getBiddedAuctions = (profileId, cb) => {
  models.Profile
    .where({ id: profileId })
    .fetch({
      withRelated: ['auctionBids']
      // columns: ['id'],
      // withRelated: [{
      //   'bids' : (qb) => {
      //      qb.select('id', 'profile_id', 'auction_id');
      //   },
      //   'auctionBids': (qb) => {
      //     qb.select('id', 'profile_id');
      //   }
      // }]
    })
    .then(biddedAuctionsModel => {
      let biddedAuctions = biddedAuctionsModel.toJSON();
      let auctionIds = biddedAuctions.auctionBids.map((auction) => {
        return auction.id;
      });
      cb(null, auctionIds);
    })
    .catch(err => {
      cb(err, null);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
