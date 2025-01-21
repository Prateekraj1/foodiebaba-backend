const { EntitySchema } = require('typeorm');
const User = require('./User'); // Reference to User

const Admin = new EntitySchema({
  name: 'Admin',
  tableName: 'admins',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    userId: {
      type: 'int',
      unique: true, // One Admin per User
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
      target: User, // One-to-one relation with User
      joinColumn: { name: 'userId' }, // Foreign key column
    },
  },
});

module.exports = Admin;
