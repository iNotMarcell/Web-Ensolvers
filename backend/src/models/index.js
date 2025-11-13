const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  logging: dbConfig.logging
});

const Note = require('./Note')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);

Note.belongsToMany(Category, { through: 'NoteCategory', as: 'categories' });
Category.belongsToMany(Note, { through: 'NoteCategory', as: 'notes' });

// Relación Usuario - Notas (OPCIONAL)
User.hasMany(Note, { foreignKey: 'userId', as: 'notes' });
Note.belongsTo(User, { foreignKey: 'userId', as: 'user', constraints: false });

module.exports = { sequelize, Note, Category, User };