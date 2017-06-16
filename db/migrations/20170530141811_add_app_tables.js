exports.up = function(knex, Promise) {
  var date = knex.raw('now()');
  return Promise.all([
    knex.schema.createTableIfNotExists('locations', function (table) {
      table.increments('id').unsigned().primary();
      table.string('city', 50).notNullable();
      table.string('state', 50).notNullable();
    }),
    knex.schema.table('profiles', function (table) {
      table.string('username', 100).nullable();
      table.integer('location_id').references('locations.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('auctions', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('category_id').references('categories.id').onDelete('CASCADE');
      table.integer('location_id').references('locations.id').onDelete('CASCADE');
      table.timestamp('end_time').notNullable();
      table.string('title', 100).nullable();
      table.string('description', 300).nullable();
      table.timestamp('created_at').notNullable().defaultTo(date);
      table.timestamp('updated_at').notNullable().defaultTo(date);
    }),
    knex.schema.createTableIfNotExists('images', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('auction_id').references('auctions.id').onDelete('CASCADE');
      table.string('url', 300).nullable();
    }),
    knex.schema.createTableIfNotExists('categories', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable();
      table.integer('parent_id', 50).nullable();
    }),
    knex.schema.createTableIfNotExists('bids', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('auction_id').references('auctions.id').onDelete('CASCADE');
      table.integer('bid', 100).notNullable();
      table.timestamp('created_at').notNullable().defaultTo(date);
      table.timestamp('updated_at').notNullable().defaultTo(date);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE LOCATIONS CASCADE'),
    knex.schema.table('profiles', function (table) {
      table.dropColumn('username');
      table.dropColumn('location_id');
    }),
    knex.schema.dropTable('images'),
    knex.schema.dropTable('bids'),
    knex.raw('DROP TABLE CATEGORIES CASCADE'),
    knex.schema.dropTable('auctions')
  ]);
};