import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonsList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Pokémon data
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(data => {
        setPokemons(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching Pokémons: ", error);
        setLoading(false);
      });
  }, []);

  const loadMore = () => {
    // Implement load more functionality here if needed
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-list">
      <h2>Pokémon List</h2>
      <ul className="flex flex-wrap justify-around gap-4">
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} className="border p-4 rounded-lg shadow-md w-1/5 text-center">
            <Link to={`/pokemons/${pokemon.name}`} className="block text-blue-500">
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={loadMore} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Load More
      </button>
    </div>
  );
};

export default PokemonsList;
