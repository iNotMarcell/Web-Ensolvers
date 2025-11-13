const express = require('express'); 
const router = express.Router();
const { Note } = require('../models/Note');

// Obtener notas
router.get('/', async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

// Crear nota
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
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

// ✅ CAMBIADO: POST en vez de PATCH, toggle-archive en vez de archive, isArchived en vez de archived
router.post('/:id/toggle-archive', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: "Nota no encontrada" });

    note.isArchived = !note.isArchived; // ✅ Cambiado de archived a isArchived
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

module.exports = router;