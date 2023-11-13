import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteList from './components/NoteList.jsx';

function App() {
  
  return (
    <div className="App">
      <h1>Aplicación de Notas</h1>
      <NoteList />
    </div>
  );
}

export default App;
