const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for cross-origin requests
app.use(cors());

// Mock Pokémon data for demonstration purposes
const pokemons = [
  { name: 'Bulbasaur', type: ['Grass', 'Poison'] },
  { name: 'Charmander', type: ['Fire'] },
  { name: 'Squirtle', type: ['Water'] },
  { name: 'Pikachu', type: ['Electric'] },
];

// API to get a list of Pokémon
app.get('/api/v1/pokemons', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;

  // Slice the pokemons array based on the limit and offset
  const results = pokemons.slice(offset, offset + limit);

  // Return paginated results
  res.json({
    results,
    total: pokemons.length,
    limit,
    offset,
  });
});

// API to get Pokémon details by name
app.get('/api/v1/pokemons/:name', (req, res) => {
  const pokemonName = req.params.name.toLowerCase(); // Convert name to lowercase for case-insensitivity

  try {
    const pokemon = pokemons.find((p) => p.name.toLowerCase() === pokemonName); // Find the Pokémon by name

    // Log the requested Pokémon name
    console.log('Requested Pokémon:', pokemonName);

    // If the Pokémon is found, return its details
    if (pokemon) {
      console.log('Found Pokémon:', pokemon); // Log the found Pokémon
      res.json(pokemon); // Return the Pokémon details
    } else {
      console.log('Pokémon not found:', pokemonName); // Log the missing Pokémon
      res.status(404).json({ message: 'Pokémon not found!' }); // Return a 404 error if not found
    }
  } catch (error) {
    console.error('Error fetching Pokémon details:', error); // Log any internal errors
    res.status(500).json({ message: 'Internal Server Error' }); // Return a 500 error for unexpected issues
  }
});

// Start the server and log the port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
