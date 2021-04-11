const fetchPokemonList = (limit = 151) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
    .then(response => response.json());
};

const fetchPokemon = ({ url }) => {
  return fetch(url)
    .then(function (response) {
        return response.json();
    });
};

function showPokemonDetails (wrapper, pokemon) {
  const types = pokemon.types.map(({ type }) => type.name).join(", ");
  const p = document.createElement("p");
  p.textContent = types;
  wrapper.appendChild(p);
}

function addPokemon (pokemon) {
  const wrapper = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = pokemon.name;
  const image = document.createElement("img");
  image.src = pokemon.sprites.front_shiny;
  wrapper.appendChild(title);
  wrapper.appendChild(image);

  wrapper.addEventListener("click", () => showPokemonDetails(wrapper, pokemon));

  return wrapper;
}

fetchPokemonList()
  .then(({ results }) => Promise.all(results.map(fetchPokemon)))
  .then(
    pokemonList => pokemonList
      .map(addPokemon)
      .map(wrapper => document.querySelector(".container").appendChild(wrapper))
  );