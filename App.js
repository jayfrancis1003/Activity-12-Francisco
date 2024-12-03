import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonsList from './PokemonsList'; // Check this line
import PokemonDetails from './PokemonDetails';

const App = () => {
  return (
    <Router>
      <div>
        <h1 className="text-center my-4 text-2xl font-bold">Pokédex</h1>
        <Routes>
          <Route path="/" element={<PokemonsList />} />
          <Route path="/pokemons/:name" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
