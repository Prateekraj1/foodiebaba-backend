// config/db.js
const { DataSource } = require('typeorm');
const User = require('../models/User');
const Admin = require('../models/Admin');
const RestaurantOwner = require('../models/RestaurantOwner');
const Customer = require('../models/Customer');

const AppDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'foodiebaba',
  synchronize: false,
  logging: false,
  entities: [User, Admin, RestaurantOwner, Customer],
});


AppDataSource.initialize()
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

module.exports = AppDataSource;
