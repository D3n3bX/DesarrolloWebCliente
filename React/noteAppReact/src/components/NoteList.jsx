// Crear un componente NoteList para mostrar todas las notas existentes
// Utilizar useState para mantener una lista de notas

import React, { useState } from 'react';

// COMPONENTS
import Note from './Note';
import NoteEditor from './NoteEditor';
import SearchBar from './SearchBar';

//CSS
import './NoteList.css';

/* COMPONENTE
    NoteList()
        Crea una lista de notas
        Propiedades:
            - Ninguno
        Return:
            - NoteList
*/
function NoteList() {

  // HOOKS
  const [notes, setNotes] = useState([]); // Declaro un estado llamado notes, setNotes me permite actualizar dicho estado
  const [searchTerm, setSearchTerm] = useState(''); // Declaro un estado llamado notes, setNotes me permite actualizar dicho estado
  
  /* FUNCIÓN
        addNote (note)
          Añade una nota a NoteList
          Parámetros:
            - note -> Texto que se va a añadir como nueva nota
          Return:
            - Ninguno
  */
  const addNote = (note) => setNotes([...notes, note]);

  /* FUNCIÓN
      deleteNote (id)
        Elimina una nota con el id dado
          Parámetros:
            - id -> Identifica la nota que se va a a eliminar
          Return:
          - Ninguno
  */
  const deleteNote = (id) => setNotes(notes.filter((note) => note.id !== id));

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <NoteEditor addNote={addNote} />
      <div className="notes-list">
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <Note note={note} deleteNote={deleteNote} />
          </div>
        ))}
      </div>
    </div>
  );

}

export default NoteList;