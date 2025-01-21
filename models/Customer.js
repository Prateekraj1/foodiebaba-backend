const { EntitySchema } = require('typeorm');
const User = require('./User');

const Customer = new EntitySchema({
  name: 'Customer',
  tableName: 'customers',
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
    address: {
      type: 'text',
      nullable: true,
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

module.exports = Customer;
