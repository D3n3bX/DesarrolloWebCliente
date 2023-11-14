// Crear un componente NoteList para mostrar todas las notas existentes
// Utilizar useState para mantener una lista de notas

import React, { useState, useEffect } from 'react';

// COMPONENTS
import Note from './Note';
import NoteEditor from './NoteEditor';
import SearchBar from  './SearchBar';
import ColorFilter from './ColorFilter';

//CSS
import './NoteList.css';

/* COMPONENTE
    NoteList()
        Crea una lista de notas, además puedes añadir nuevas notas y filtrar dichas notas por título, contenido o color
        Propiedades:
            - Ninguno
        Return:
            - NoteList
*/
function NoteList() {

  // HOOKS
  const [notes, setNotes] = useState([]); // Declaro un estado llamado notes, setNotes me permite actualizar dicho estado
  const [searchTerm, setSearchTerm] = useState(''); // Declaro un estado llamado searchTerm, setSearchTerm me permite actualizar dicho estado
  const [colorFilter, setColorFilter] = useState('');  // Declaro un estado llamado colorFilter, setColorFilter me permite actulizar dicho estado
  
  /* FUNCIÓN
      updateLocalStorage(updateNotes)
      Actualiza el localStorage cada vez que se añade o elimina una nota
      Parámetros:
        - updatedNotes
      Return:
        - Ninguno
  */
  const updateLocalStorage = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  /* FUNCIÓN
        addNote (note)
          Añade una nota a NoteList y actualiza el localStorage
          Parámetros:
            - note -> Texto que se va a añadir como nueva nota
          Return:
            - Ninguno
  */
  const addNote = (note) => {
    setNotes([...notes, note]);
    updateLocalStorage([...notes, note]);
  };

  /* FUNCIÓN
      deleteNote (id)
        Elimina una nota con el id dado y actualiza el localStorage
          Parámetros:
            - id -> Identifica la nota que se va a a eliminar
          Return:
          - Ninguno
  */
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    updateLocalStorage(notes.filter((note) => note.id !== id));
  };

  /* FUNCIÓN ANÓNIMA
    Se ejecuta cuando se renderiza por primera vez y obtiene las notas que hay en localStorage
    Parámetros:
      - Ninguno
    Return:
      - notes -> Notas que esten almacenadas en localStorage
  */
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  /* FUNCIÓN
   filterNotes(note)
     Filtra las notas según los criterios de búsqueda y color
      Parámetros:
         - note -> La nota que se evalúa para determinar si cumple con los criterios
      Return:
         - Booleano -> indicando si la nota pasa los criterios de búsqueda y color
*/
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (colorFilter === '' || note.backgroundColor === colorFilter)
  );

  return (

    <div className="list-container">
      {/* Búsqueda con una barra de busqueda y para filtrar por color */}
      <div className="searcBar-container">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ColorFilter onFilterChange={setColorFilter} />
      </div>
      {/* Editor de notas */}
      <NoteEditor addNote={addNote} />
      {/* Lista con las notas añadidas */}
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