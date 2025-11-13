const express = require('express');
const router = express.Router();
const { Note, Category } = require('../models');

// Obtener todas las notas con sus categorías
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [{ model: Category, as: 'categories' }]
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nota (sin userId requerido)
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ 
      title, 
      content,
      userId: 1 // Usuario por defecto
    });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar nota
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: "Nota no encontrada" });

    await note.update(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Archivar / Desarchivar nota
router.post('/:id/toggle-archive', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: "Nota no encontrada" });

    note.isArchived = !note.isArchived;
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar nota
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: 'Nota no encontrada' });

    await note.destroy();
    res.json({ message: 'Nota eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Asignar categoría a una nota
router.post('/:noteId/categories/:categoryId', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.noteId);
    const category = await Category.findByPk(req.params.categoryId);
    
    if (!note) return res.status(404).json({ message: 'Nota no encontrada' });
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    
    await note.addCategory(category);
    
    const updatedNote = await Note.findByPk(req.params.noteId, {
      include: [{ model: Category, as: 'categories' }]
    });
    
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Quitar categoría de una nota
router.delete('/:noteId/categories/:categoryId', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.noteId);
    const category = await Category.findByPk(req.params.categoryId);
    
    if (!note) return res.status(404).json({ message: 'Nota no encontrada' });
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    
    await note.removeCategory(category);
    
    const updatedNote = await Note.findByPk(req.params.noteId, {
      include: [{ model: Category, as: 'categories' }]
    });
    
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;