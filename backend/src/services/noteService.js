const noteRepo = require('../repositories/noteRepository');

const createNote = async (payload) => {
  const note = await noteRepo.create(payload);
  return note;
};

const editNote = async (id, payload) => {
  return noteRepo.update(id, payload);
};

const deleteNote = async (id) => {
  return noteRepo.remove(id);
};

const toggleArchive = async (id) => {
  const note = await noteRepo.findById(id);
  if (!note) throw new Error('Nota no encontrada');
  note.archived = !note.archived;
  await note.save();
  return note;
};

const listNotes = async (filter) => {
  return noteRepo.list(filter);
};

const setNoteCategories = async (noteId, categoryIds) => {
  return noteRepo.setCategories(noteId, categoryIds);
};

module.exports = { createNote, editNote, deleteNote, toggleArchive, listNotes, setNoteCategories };
