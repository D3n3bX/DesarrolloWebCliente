// Crear un componente Note para representar una nota individual
// Añadir un botón para eliminar la nota
// Utilzar propiedades para pasar la información de la nota desde NoteList a Note

import React from 'react';
import { Card, Button } from 'react-bootstrap'

// COMPONENTS


// CSS
import './Note.css';

/* COMPONENTE
    Note({ note, deleteNote })
        Crea una nota con un formato de tarjeta de Bootstrap
        Propiedades:
            - note -> nota compuesto por el título y su contenido
            - deleteNote -> función que borrará la nota
        Return:
            - Note
*/
function Note({ note, deleteNote }) {
  const cardStyle = {
    backgroundColor: note.backgroundColor || '#ffffff', // Usa el color de fondo o blanco por defecto
  };

  return (

    <div className="card-container">
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.content}</Card.Text>
          <Button variant="danger" onClick={() => deleteNote(note.id)}>
            Eliminar
          </Button>
        </Card.Body>
      </Card>
    </div>
    
  );
}

export default Note;
