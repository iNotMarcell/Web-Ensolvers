const catRepo = require('../repositories/categoryRepository');

const createCategory = async (payload) => {
  return catRepo.create(payload);
};

const listCategories = async () => {
  return catRepo.list();
};

const deleteCategory = async (id) => {
  return catRepo.remove(id);
};

module.exports = { createCategory, listCategories, deleteCategory };
