const { DataSource } = require('typeorm');
const User = require('../models/User');
const Admin = require('../models/Admin');
const RestaurantOwner = require('../models/RestaurantOwner');
const Customer = require('../models/Customer');

require('reflect-metadata');

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '', // Set your password here if applicable
  database: 'foodiebaba',
  synchronize: true, // Automatically create tables
  logging: false,
  entities: [
    User,
    Admin,
    RestaurantOwner,
    Customer,
  ],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

module.exports = AppDataSource;
