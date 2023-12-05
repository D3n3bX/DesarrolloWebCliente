import React from 'react';
import { Table } from 'react-bootstrap';

const MatchTable = ({ matches }) => (
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
);

export default MatchTable;
