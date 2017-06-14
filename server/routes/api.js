'use strict';
const express = require('express');
const router = express.Router();
const AuctionsController = require('../controllers').Auctions;
const BidsController = require('../controllers').Bids;
const CategoriesController = require('../controllers').Categories;
const ProfiliesController = require('../controllers').Profiles;
const middleware = require('../middleware');

// routx`
//test
router.route('/profile/bids')
  .get(middleware.auth.verify, (req, res) => {
    let options = {
      profileId: req.session.passport.user
    };
    console.log('server/app/options',options)
    BidsController.getBidsByProfileId(options, (err, postedBids) => {
      if (err) {
        console.log(`Couldn't get the bids for Profile id: ${req.session.passport.user} `, err);
      }
      res.send(postedBids);
    });
  });

router.route('/profile/auctions')
  .get(middleware.auth.verify, (req, res) => {
    let options = {
      profileId: req.session.passport.user
    };
    console.log('server/app/options',options)
    AuctionsController.getAuctionsByProfileId(options, (err, postedBids) => {
      if (err) {
        console.log(`Couldn't get the post for Profile id: ${req.session.pasport.user} `, err);
      }
      console.log('api/my/post>', postedBids)
      res.send(postedBids);
    });
  });

router.route('/auctions')
  .get((req, res) => {
    AuctionsController.getAllAuctions((err, auctions) => {
      if (err) {
        console.log("Couldn't get all auctions: ", err);
        res.status(404);
      }
      res.status(200).send(auctions);
    });
  });

router.route('/auction/:id')
  .get((req, res) => {
    AuctionsController.getAuctionById(req.params.id, (err, auction) => {
      if (err) {
        console.log("Couldn't get auction info: ", err);
        res.status(404);
      }
      res.status(200).send(auction);
    });
  })
  .delete(middleware.auth.verify, (req, res) => {
    AuctionsController.deleteAuctionById(req.params.id, (err, deletedAuction) => {
      if (err) {
        console.log("Couldn't delete auction: ", err);
        res.status(410);
      }
      res.status(202).send(deletedAuction);
    });
  })
  .post((req, res) => {
    console.log("I'm in /auction/:id posting a bid");
    let options = {
      auction_id: req.params.id,
      profile_id: req.session.passport.user,
      bid: req.body.amt
    };
    BidsController.postBid(options, (err, bid) => {
      if (err) {
        console.log("Couldn't post a bid: ", err);
        res.status(404);
      }
      res.status(200).send(bid);
    });
  });

router.route('/categories')
  .get((req,res) => {
    CategoriesController.getAllCategories((err, categories) => {
      if (err) {
        res.status(404);
      }
      res.status(200).send(categories);
    });
  });

router.route('/auction')
  .post(middleware.auth.verify, (req, res) => {
    const options = Object.assign({}, req.body, req.session.passport);
    AuctionsController.createAuction(options, (err, auction) => {
      if (err) {
        console.log("Couldn't create an auction: ", err);
        res.status(401);
      }
      res.status(200).redirect('/');
    });
  });

router.route('/auction/:id/currentBid')
  .get(middleware.auth.verify, (req, res) => {
    let options = {
      auctionId: req.params.id,
      profileId: req.session.passport.user
    };
    BidsController.currentUserBid(options, (err, bid) => {
      if (err) {
        console.log("Couldn't get the current bid: ", err);
        res.status(404);
      }
      res.send(bid);
    });
  });

// testing purposes
router.route('/endingAuctions')
  .get((req, res) => {
    let currentTime = new Date(Date.now());
    AuctionsController.retrieveAndUpdateEndingAuctions(currentTime, (err, endingAuctions) => {
      if (err) {
        console.log("Couldn't find ending auctions: ", err);
        res.status(400);
      }
      res.status(200).send(endingAuctions);
    });
  });

module.exports = router;
