'use strict';
const express = require('express');
const router = express.Router();
const pg = require('../../db/models/pgAPI');
const middleware = require('../middleware');

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/auctions')
  .get((req, res) => {
    pg.getAllAuctions()
      .then(auctions => {
        res.status(200).send(auctions);
      })
      .catch(error => {
        res.status(404).send("Hmmm...I couldn't find the auctions. Try again later.");
      });
  });

router.route('/auction/:id')
  .get((req, res) => {
    pg.getAuctionById(req.params.id)
      .then(auctionData => {
        res.status(200).send(auctionData);
      })
      .catch(error => {
        res.status(404).send("Hmmm...I couldn't find the auctions.");
      });
  })
  .delete((req, res) => {
    pg.deleteAuctionById(req.params.id)
      .then(deletedAuctionData => {
        res.status(202).send(deletedAuctionData);
      })
      .catch(error => {
        res.status(410).send("Hmmm...I couldn't find what you wanted to delete.");
      });
  });

  router.route('/categories')
    .get((req,res) => {
      pg.getAllCategories()
        .then(categories => {
          res.status(200).send(categories);
        })
        .catch(error => {
          res.status(404).send("Hmmm...I couldn't find the categories.");
        });
    });

  router.route('/auction')
    .post((req, res) => {
      const options = Object.assign({}, req.body, req.session.passport);
      pg.createAuction(options)
      .then(() => {
        res.status(200).redirect('/');
      })
      .catch(error => {
        res.status(401).send("Hmmm...couldn't create a new auction.");
      });
    });

module.exports = router;

// profilebids not currently working
// after mvp for display whether an auction has a bid
  // router.route('/profileBids')
  //   .get((req, res) => {
  //     console.log('>>',req)
  //     return models.ProfileBids.collection().fetch({
  //       withRelated: ['auctions', 'profiles']
  //     })
  //       .then(collection => {
  //         res.send(collection);
  //       });
  //   });
