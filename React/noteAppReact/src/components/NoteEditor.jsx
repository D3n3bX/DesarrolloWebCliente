// Crear un componente NoteEditor para añadir y editar notas
// Utilizar useState para mantener el contenido de la nota en edición
// Uilizar useRef para manejar el enfoque del campo de texto (opcional)

import React, { useState, useRef } from 'react';
import { Dropdown, Form, Button } from 'react-bootstrap';

// COMPONENTS
import ColorFilter from './ColorFilter';

// CSS
import './NoteEditor.css';

/* DICCIONARIO
    colorNames
      Indica el código de color en hexadecimal con su color correspondiente
      Clave:
        - color en hexadecimal
      Valor:
        - nombre de color
*/
const colorNames = {
  '#ffffff': 'Blanco',
  '#ff0000': 'Rojo',
  '#00ff00': 'Verde',
  '#0000ff': 'Azul',
  '#ffff00': 'Amarillo',
};

/* COMPONENTE
    NoteEditor({ addNote })
      Crea un editr de notas
      Propiedades:
        - addNote -> 
      Return:
        NoteEditor
*/
function NoteEditor({ addNote }) {

  const [title, setTitle] = useState(''); // Declaro un estado llamado title, setTitle me permite actualizar dicho estado
  const [content, setContent] = useState(''); // Declaro un estado llamado content, setContent me permite acutalizar dicho estado
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');  // Declaro un estado llamado backgroundColor, setBackgroundColor me permite acutalizar dicho estado
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

      const newNote = { // Creo una nueva nota compuesta por
        id: Date.now(), // Un id único
        title, // Un título
        content, // Un contenido
        backgroundColor, // Un color de fondo
      };

      addNote(newNote); // Llamo a addNote para que añada newNote a NoteList
      setTitle(''); // Llamo a setTitle para setear el título
      setContent(''); // Llamo a setContent para setear el contenido
      setBackgroundColor('#ffffff'); // Llamo a setBackgroundColor para setear el color
      titleInputRef.current.focus();

    }

  };
  
  const presetColors = ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00']; // Colores disponibles para el fondo de color de las notas

  return (

    // Formulario para añadir una nueva nota
    <Form className="addNote">
      {/* Añadir título de la nota */}
      <Form.Group controlId="noteTitle">
        <Form.Control
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleInputRef}
        />
      </Form.Group>

      {/* Añadir contenido de la nota */}
      <Form.Group controlId="noteContent">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      {/* Añadir color de fondo */}
      <Form.Group controlId="noteColor" className="color-dropdown">
        <ColorFilter onFilterChange={setBackgroundColor} />
      </Form.Group>

      {/* Botón para agregar nota */}
      <Button variant="primary" onClick={() => handleAddNote()}>
        Agregar Nota
      </Button>
    </Form>

  );
}

export default NoteEditor;
