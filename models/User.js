const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User', // Entity name
  tableName: 'users', // Table name
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true, // Auto increment
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true, // Unique email for each user
    },
    uniqueKey: {
        type: 'varchar',
        unique: true, // Unique email for each user
    },
    phoneNumber: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP', // Default value for created_at
    },
    updatedAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP', // Default value for updated_at
      onUpdate: 'CURRENT_TIMESTAMP', // Update on every modification
    },
  },
});

module.exports = User;
