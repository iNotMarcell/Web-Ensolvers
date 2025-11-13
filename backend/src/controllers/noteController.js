const Note = require('../models/Note');

// Obtener todas las notas
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { archivada: false },
      order: [['fechaCreacion', 'DESC']]
    });
    res.json(notes);
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ 
      message: 'Error al obtener las notas',
      error: error.message 
    });
  }
};

// Crear una nueva nota
exports.createNote = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    
    const { titulo, contenido, categoria } = req.body;

    if (!titulo || !contenido) {
      return res.status(400).json({ 
        message: 'Título y contenido son requeridos' 
      });
    }

    const newNote = await Note.create({
      titulo,
      contenido,
      categoria: categoria || 'Sin categoría',
      fechaCreacion: new Date(),
      archivada: false
    });

    console.log('Nota guardada:', newNote.toJSON());
    
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ 
      message: 'Error al crear la nota',
      error: error.message 
    });
  }
};

// Actualizar una nota
exports.updateNote = async (req, res) => {
  try {
    const { titulo, contenido, categoria } = req.body;
    
    const [updated] = await Note.update(
      { titulo, contenido, categoria },
      { where: { id: req.params.id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    const updatedNote = await Note.findByPk(req.params.id);
    res.json(updatedNote);
  } catch (error) {
    console.error('Error al actualizar nota:', error);
    res.status(500).json({ 
      message: 'Error al actualizar la nota',
      error: error.message 
    });
  }
};

// Eliminar una nota
exports.deleteNote = async (req, res) => {
  try {
    const deleted = await Note.destroy({
      where: { id: req.params.id }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.json({ message: 'Nota eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar nota:', error);
    res.status(500).json({ 
      message: 'Error al eliminar la nota',
      error: error.message 
    });
  }
};

// Archivar una nota
exports.archiveNote = async (req, res) => {
  try {
    const [updated] = await Note.update(
      { archivada: true },
      { where: { id: req.params.id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    const archivedNote = await Note.findByPk(req.params.id);
    res.json(archivedNote);
  } catch (error) {
    console.error('Error al archivar nota:', error);
    res.status(500).json({ 
      message: 'Error al archivar la nota',
      error: error.message 
    });
  }
};

// Obtener notas archivadas
exports.getArchivedNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { archivada: true },
      order: [['fechaCreacion', 'DESC']]
    });
    res.json(notes);
  } catch (error) {
    console.error('Error al obtener notas archivadas:', error);
    res.status(500).json({ 
      message: 'Error al obtener las notas archivadas',
      error: error.message 
    });
  }
};