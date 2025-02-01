// models/RestaurantOwner.js
const { EntitySchema } = require('typeorm');
const { ObjectId } = require('mongodb');

module.exports = new EntitySchema({
  name: 'RestaurantOwner',
  tableName: 'restaurant_owners',
  columns: {
    _id: {
      type: ObjectId,
      primary: true,
      generated: true,
    },
    userId: {
      type: ObjectId,
      unique: true,
    },
    restaurantName: {
      type: 'string',
    },
    approvalStatus: {
      type: 'boolean',
      default: false,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
  relations: {
    user: {
      type: 'one-to-one',
      target: 'User',
      joinColumn: { name: 'userId' },
      cascade: true,
    },
  },
});
