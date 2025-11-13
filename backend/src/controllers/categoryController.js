const { Category } = require('../models');

// Listar todas las categorías
exports.list = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error en list categories:', error);
    res.status(500).json({ error: error.message });
  }
};

// Crear una categoría
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }

    const category = await Category.create({ name });
    res.json(category);
  } catch (error) {
    console.error('Error en create category:', error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una categoría
exports.remove = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    await category.destroy();
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error en remove category:', error);
    res.status(500).json({ error: error.message });
  }
};