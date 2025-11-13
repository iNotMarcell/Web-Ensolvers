module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: true },
    isArchived: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    userId: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 }
  }, {
    tableName: 'Notes',
    timestamps: true
  });
  return Note;
};