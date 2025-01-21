const { EntitySchema } = require('typeorm');
const User = require('./User');

const RestaurantOwner = new EntitySchema({
  name: 'RestaurantOwner',
  tableName: 'restaurant_owners',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    userId: {
      type: 'int',
      unique: true,
    },
    restaurantName: {
      type: 'varchar',
    },
    approvalStatus: {
      type: 'boolean',
      default: false, // Default approval status as false
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  },
  relations: {
    user: {
      type: 'one-to-one',
      target: User,
      joinColumn: { name: 'userId' },
    },
  },
});

module.exports = RestaurantOwner;
