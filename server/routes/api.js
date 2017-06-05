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
        res.status(404);
      });
  });

router.route('/auction/:id')
  .get((req, res) => {
    pg.getAuctionById(req.params.id)
      .then(auctionData => {
        res.status(200).send(auctionData);
      })
      .catch(error => {
        res.status(404);
      });
  })
  .delete(middleware.auth.verify, (req, res) => {
    pg.deleteAuctionById(req.params.id)
      .then(deletedAuctionData => {
        res.status(202).send(deletedAuctionData);
      })
      .catch(error => {
        res.status(410);
      });
  });

router.route('/categories')
  .get((req,res) => {
    pg.getAllCategories()
      .then(categories => {
        res.status(200).send(categories);
      })
      .catch(error => {
        res.status(404);
      });
  });

//middleware.auth.verify,
router.route('/auction')
  .post(middleware.auth.verify, (req, res) => {
    const options = Object.assign({}, req.body, req.session.passport);
    // const options = Object.assign({}, req.body); // for test purpose
    pg.createAuction(options)
    .then(() => {
      console.log(options)
      res.status(200).redirect('/');
    })
    .catch(error => {
      res.status(401);
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
  
  
  



