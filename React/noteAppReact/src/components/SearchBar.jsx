import React from 'react';

// CSS
import './SearchBar.css'

/* COMPONENTE
    SearchBar({ searchTerm, onSearchChange })
        Crea una barra de búsqueda para poder filtrar notas por título o contenido
        Propiedades:
            - searchTerm -> 
            - onSearchChange -> 
        Return:
            - SearchBar
*/
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
