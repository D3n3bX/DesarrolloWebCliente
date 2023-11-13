import React from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

const ColorFilter = ({ onFilterChange }) => {
  const colorNames = {
    '#ffffff': 'Blanco',
    '#ff0000': 'Rojo',
    '#00ff00': 'Verde',
    '#0000ff': 'Azul',
    '#ffff00': 'Amarillo',
  };

  const presetColors = ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00'];

  return (
    <div className="color-filter">
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle variant="light" id="color-filter-dropdown">
          Filtrar por Color
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onFilterChange('')}>Todos los colores</Dropdown.Item>
          {presetColors.map((color) => (
            <Dropdown.Item key={color} onClick={() => onFilterChange(color)}>
              <div className="color-preview" style={{ backgroundColor: color }}></div>
              <span className="color-name">{colorNames[color]}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ColorFilter;
