import React from 'react';
import { Carousel } from 'react-bootstrap';

const ResultCarousel = ({ results }) => (
  <Carousel>
    {results.map(result => (
      <Carousel.Item key={result.pista}>
        {/* Contenido del resultado */}
        <p>{result.resultado}</p>
      </Carousel.Item>
    ))}
  </Carousel>
);

export default ResultCarousel;
