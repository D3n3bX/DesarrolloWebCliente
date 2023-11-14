import React, { useState } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

// CSS
import './ColorFilter.css'

/* COMPONENTE
    ColorFilter({ onFilterChange })
      Crea un menu desplegable para poder filtrar por color
      Propiedades:
        - onFilterChange -> 
      Return:
        - ColorFilter
*/
const ColorFilter = ({ onFilterChange }) => {

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
    '#ffb3b3': 'Rojo',
    '#b3ffbf': 'Verde',
    '#b3daff': 'Azul',
    '#ffffbf': 'Amarillo',
  };

  const presetColors = ['#ffffff', '#ffb3b3', '#b3ffbf', '#b3daff', '#ffffbf']; // Array con los colores posibles que hay

  const [selectedColor, setSelectedColor] = useState(''); // Declaro un estado llamado selectedColor, setSelectedColor me permite actualizar dicho estado

  /* FUNCIÓN
    handleColorChange(color)
      Cambia el color de fondo de la nota
      Parámetros:
        - color -> codigo en hexadecimal del color que se quiere poner de fondo en la nota
      Return:
        - Ninguno
  */
  const handleColorChange = (color) => {
    setSelectedColor(color);
    onFilterChange(color);
  };

  return (

    <div className="color-filter">
      {/* Manú desplegable */}
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle variant="light" id="color-filter-dropdown">
          Filtrar por Color
        </Dropdown.Toggle>
        {/* Items del menú desplegable */}
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleColorChange('')}>Todos los colores</Dropdown.Item>
          {presetColors.map((color) => (
            <Dropdown.Item key={color} onClick={() => handleColorChange(color)}>
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
