// models/User.js
const { EntitySchema } = require('typeorm');
const { ObjectId } = require('mongodb');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    _id: {
      type: ObjectId,
      primary: true,
      generated: true,
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      unique: true,
    },
    uniqueKey: {
      type: 'string',
      unique: true,
    },
    phoneNumber: {
      type: 'string',
    },
    password: {
      type: 'string',
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
});
