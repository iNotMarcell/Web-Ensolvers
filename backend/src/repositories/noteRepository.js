const { Note, Category } = require('../models');

const create = async (data) => {
  const note = await Note.create(data);
  return note;
};

const update = async (id, data) => {
  await Note.update(data, { where: { id } });
  return Note.findByPk(id, { include: 'categories' });
};

const remove = async (id) => {
  return Note.destroy({ where: { id } });
};

const findById = async (id) => {
  return Note.findByPk(id, { include: 'categories' });
};

const list = async (filter = {}) => {
  const where = {};
  if (filter.archived !== undefined) where.archived = filter.archived;

  const include = [];
  if (filter.categoryId) {
    include.push({
      model: Category,
      as: 'categories',
      where: { id: filter.categoryId }
    });
  } else {
    include.push({ model: Category, as: 'categories' });
  }

  return Note.findAll({ where, include, order: [['updatedAt','DESC']] });
};

const setCategories = async (noteId, categoryIds = []) => {
  const note = await Note.findByPk(noteId);
  const categories = await Category.findAll({ where: { id: categoryIds } });
  await note.setCategories(categories);
  return Note.findByPk(noteId, { include: 'categories' });
};

module.exports = { create, update, remove, findById, list, setCategories };
