let currentPokemonId = 1;
let isShiny = false;

function fetchPokemonData(pokemonId) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(data => {
      displayPokemonData(data);
      fetchEvolutionData(data.species.url);
    })
    .catch(error => console.error('Error:', error));
}

function fetchEvolutionData(speciesUrl) {
  fetch(speciesUrl)
    .then(response => response.json())
    .then(data => {
      const evolutionChainUrl = data.evolution_chain.url;
      fetch(evolutionChainUrl)
        .then(response => response.json())
        .then(evolutionData => {
          displayEvolutionData(evolutionData.chain);
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}

function displayPokemonData(data) {
  document.getElementById('pokemon-name').textContent = data.name;
  document.getElementById('pokemon-number').textContent = `#${data.id.toString().padStart(3, '0')}`;
  document.getElementById('pokemon-image').src = isShiny ? data.sprites.front_shiny : data.sprites.front_default;
  document.getElementById('pokemon-description').textContent = `Base experience: ${data.base_experience}`;
  document.getElementById('pokemon-type').textContent = `Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
  document.getElementById('pokemon-level').textContent = `Level: ${data.base_experience}`;

  const abilitiesList = document.getElementById('pokemon-abilities');
  abilitiesList.innerHTML = '';
  data.stats.forEach(stat => {
    const listItem = document.createElement('li');
    listItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    abilitiesList.appendChild(listItem);
  });
}

function displayEvolutionData(chain) {
}

document.getElementById('shiny-button').addEventListener('click', () => {
  isShiny = !isShiny;
  fetchPokemonData(currentPokemonId);
});

document.getElementById('prev-button').addEventListener('click', () => {
  if (currentPokemonId > 1) {
    currentPokemonId--;
    fetchPokemonData(currentPokemonId);
  }
});

document.getElementById('next-button').addEventListener('click', () => {
  currentPokemonId++;
  fetchPokemonData(currentPokemonId);
});

fetchPokemonData(currentPokemonId);

function fetchPokemonData(pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        displayPokemonData(data);
        fetchSpeciesData(data.species.url);
      })
      .catch(error => console.error('Error:', error));
  }
  
  function fetchSpeciesData(speciesUrl) {
    fetch(speciesUrl)
      .then(response => response.json())
      .then(data => {
        const description = data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
        document.getElementById('pokemon-description').textContent = description;
      })
      .catch(error => console.error('Error:', error));
  }
  
  function displayPokemonData(data) {
    document.getElementById('pokemon-name').textContent = data.name;
    document.getElementById('pokemon-number').textContent = `#${data.id.toString().padStart(3, '0')}`;
    document.getElementById('pokemon-image').src = isShiny ? data.sprites.front_shiny : data.sprites.front_default;
    document.getElementById('pokemon-type').textContent = `Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
    document.getElementById('pokemon-level').textContent = `Level: ${data.base_experience}`;
  
    const abilitiesList = document.getElementById('pokemon-abilities');
    abilitiesList.innerHTML = '';
    data.stats.forEach(stat => {
      const listItem = document.createElement('li');
      listItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
      abilitiesList.appendChild(listItem);
    });
  }
  
  // Event listeners remain unchanged
  
  // Fetch initial Pokémon data
  fetchPokemonData(currentPokemonId);
