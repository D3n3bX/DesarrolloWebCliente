// Crear un componente NoteEditor para añadir y editar notas
// Utilizar useState para mantener el contenido de la nota en edición
// Uilizar useRef para manejar el enfoque del campo de texto (opcional)

import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

// COMPONENTS

// CSS
import './NoteEditor.css';

/* COMPONENTE
    NoteEditor({ addNote })
      Edita las notas
      Propiedades:
        - addNote -> 
      Return:
        NoteEditor
*/
function NoteEditor({ addNote }) {

  const [title, setTitle] = useState(''); // Declaro un estado llamado title, setTitle me permite actualizar dicho estado
  const [content, setContent] = useState(''); // Declaro un estado llamado content, setContent me permite acutalizar dicho estado
  const titleInputRef = useRef(null);

  /* FUNCIÓN
    Maneja las notas que se van a añadir
    Parámteros:
      - Ninguno
    Return:
      - Ninguno
  */
  const handleAddNote = () => {
    if (title && content) { // Si title y content tienen contenido
      const newNote = { // Creo una nueva nota
        id: Date.now(),
        title,
        content,
      };
      addNote(newNote); // Llamo a addNote para que añada newNote a NoteList
      setTitle(''); // Llamo a setTitle para setear el título
      setContent(''); // Llamo a setContent para setear el contenido
      titleInputRef.current.focus();
    }
  };

  return (
    <Form className="addNote">
      <Form.Group controlId="noteTitle">
        <Form.Control
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleInputRef}
        />
      </Form.Group>

      <Form.Group controlId="noteContent">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={() => handleAddNote()}>
        Agregar Nota
      </Button>
    </Form>
  );
}

export default NoteEditor;
