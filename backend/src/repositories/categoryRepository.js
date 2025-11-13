const { Category } = require('../models');

const create = async (data) => {
  return Category.create(data);
};

const list = async () => {
  return Category.findAll({ order: [['name','ASC']] });
};

const remove = async (id) => {
  return Category.destroy({ where: { id } });
};

const findById = async (id) => {
  return Category.findByPk(id);
};

module.exports = { create, list, remove, findById };
