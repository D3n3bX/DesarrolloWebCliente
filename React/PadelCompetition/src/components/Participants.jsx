import React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';

const Participant = ({ id, name, details }) => (
  <Card key={id}>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey={id.toString()}>
        {name}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={id.toString()}>
      <Card.Body>
        {details}
      </Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default Participant;
