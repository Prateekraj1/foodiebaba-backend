// models/Admin.js
const { EntitySchema } = require('typeorm');
const { ObjectId } = require('mongodb');
const User = require('./User');

module.exports = new EntitySchema({
  name: 'Admin',
  tableName: 'admins',
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
