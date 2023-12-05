import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Button, Card, Table, Carousel } from 'react-bootstrap';

const App = () => {
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Descargar datos de participantes
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setParticipants(data));
  }, []);

  const handleRandomDraw = () => {
    // Lógica para sortear enfrentamientos y actualizar estado "matches"
    const shuffledParticipants = participants.sort(() => Math.random() - 0.5);

    const newMatches = [];
    for (let i = 0; i < shuffledParticipants.length; i += 2) {
      newMatches.push({
        pista: `Pista ${i / 2 + 1}`,
        jugador1: shuffledParticipants[i].name,
        jugador2: shuffledParticipants[i + 1].name,
        resultado: '',
      });
    }

    setMatches(newMatches);
  };

  const handleRandomResults = () => {
    // Lógica para obtener resultados aleatorios y actualizar estado "results"
    const newResults = matches.map(match => ({
      ...match,
      resultado: Math.random() > 0.5 ? 'Ganó Jugador 1' : 'Ganó Jugador 2',
    }));

    setResults(newResults);
  };

  const SaveButton = () => {
    // Lógica para guardar en la caché del navegador y simular llamada POST al backend
    const saveData = () => {
      localStorage.setItem('matches', JSON.stringify(matches));
      // Simular llamada POST al backend
      fetch('https://tu-backend/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matches }),
      })
        .then(response => response.json())
        .then(data => console.log('Datos guardados en el backend:', data))
        .catch(error => console.error('Error al guardar en el backend:', error));
    };

    return (
      <Button onClick={saveData}>Salvar</Button>
    );
  };

  return (
    <div className="App">
      <Accordion>
        {participants.map(participant => (
          <Card key={participant.id}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={participant.id.toString()}>
                {participant.name}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={participant.id.toString()}>
              <Card.Body>
                {/* Detalles del participante */}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>

      <Button onClick={handleRandomDraw}>Sortear Enfrentamientos</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pista</th>
            <th>Jugador 1</th>
            <th>Jugador 2</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(match => (
            <tr key={match.pista}>
              <td>{match.pista}</td>
              <td>{match.jugador1}</td>
              <td>{match.jugador2}</td>
              <td>{match.resultado}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={handleRandomResults}>Obtener Resultados</Button>

      <Carousel>
        {results.map(result => (
          <Carousel.Item key={result.pista}>
            {/* Contenido del resultado */}
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Botón para salvar */}
      <SaveButton />
    </div>
  );
};

export default App;
