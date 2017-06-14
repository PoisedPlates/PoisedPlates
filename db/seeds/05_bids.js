
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bids').del()
    .then(function () {
      // Inserts seed entries
      var date = new Date();
      var one = new Date('June 5, 2017 03:24:00');
      var two = new Date('June 5, 2017 04:24:00');
      var three = new Date('June 5, 2017 05:24:00');
      var four = new Date('June 5, 2017 06:24:00');
      var five = new Date('June 5, 2017 07:24:00');
      var six = new Date('June 5, 2017 08:24:00');
      var seven = new Date('June 5, 2017 09:24:00');
      var eight = new Date('June 5, 2017 10:24:00');
      return knex('bids').insert([
        { profile_id: 2, auction_id: 1, bid: 5, created_at: one },
        { profile_id: 3, auction_id: 1, bid: 5, created_at: two },
        { profile_id: 4, auction_id: 1, bid: 4, created_at: one },
        { profile_id: 4, auction_id: 1, bid: 1, created_at: one },
        { profile_id: 2, auction_id: 2, bid: 5, created_at: three},
        { profile_id: 2, auction_id: 2, bid: 6, created_at: four },
        { profile_id: 3, auction_id: 2, bid: 7, created_at: five },
        { profile_id: 2, auction_id: 2, bid: 8, created_at: six },
        { profile_id: 4, auction_id: 3, bid: 8, created_at: seven },
        { profile_id: 3, auction_id: 3, bid: 8, created_at: eight },
        { profile_id: 5, auction_id: 3, bid: 10, created_at: one },
        { profile_id: 2, auction_id: 4, bid: 8, created_at: one },
        { profile_id: 3, auction_id: 4, bid: 8, created_at: two },
        { profile_id: 4, auction_id: 4, bid: 8, created_at: three },
        { profile_id: 5, auction_id: 4, bid: 10, created_at: one },
      ]);
    });
};
