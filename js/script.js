// https://pokedex.org/

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    return {
        add: function(pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function() {
            return pokemonList;
        },
        findByName: function(pokemonName) {
            let allPokemon = pokemonRepository.getAll();
            let listOfNames = allPokemon.filter(entry => entry.name === pokemonName);
            return listOfNames.length === 0 ? alert(`${pokemonName} not in pokemonList`) : listOfNames;
        },
        getTypes: function(pokedexEntry) {
            let pokemonType = '';

            if (pokedexEntry.types.length > 1) {
                for (let i in pokedexEntry.types) {
                    if (parseInt(i) === pokedexEntry.types.length - 1) {
                        pokemonType += `${pokedexEntry.types[i]}`;
                    } else {
                        pokemonType += `${pokedexEntry.types[i]}, `
                    }
                }
            } else {
                pokemonType += pokedexEntry.types;
            }

            return pokemonType;
        },
        showDetails: function(pokedexEntry) {
            pokemonRepository.loadDetails(pokedexEntry).then(function () {
                console.log(pokedexEntry);
            });
        },
        addListItem: function(pokedexEntry) {
            let unorderedListItem = document.createElement('li');
            unorderedListItem.classList.add('pokemon-list__item');

            let unorderedListButton = document.createElement('button');
            unorderedListButton.classList.add('pokemon-list__button');

            /**======================
             *    Button toggle
             *========================**/
            unorderedListButton.addEventListener('click', function (event) {
                // let activeElement = event.currentTarget;
        
                // activeElement.querySelectorAll('.pokemon-list__toggle').forEach(v => v.classList.toggle('is-not-visible'));
                pokemonRepository.showDetails(pokedexEntry);
            });

            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add('button-header');

            let buttonDivP = document.createElement('h2');
            buttonDivP.innerText = pokedexEntry.name;

            let buttonDivMore = document.createElement('div');
            buttonDivMore.classList.add('pokemon-list__toggle');
            buttonDivMore.innerHTML = `<p>Show more +</p>`;
            let buttonDivLess = document.createElement('div');
            buttonDivLess.classList.add('pokemon-list__toggle', 'is-not-visible');
            buttonDivLess.innerHTML = `<p>Show less -</p>`;

            // let buttonContent = document.createElement('div');
            // buttonContent.classList.add('pokemon-list__button-content', 'pokemon-list__toggle', 'is-not-visible');

            // let pokemonTypes = pokemonRepository.getTypes(pokedexEntry);

            // buttonContent.innerHTML = 
            //     `<p>
            //         <strong>Height:</strong> ${pokedexEntry.height}m.
            //     </p>
            //     <p>
            //         <strong>Types:</strong> ${pokemonTypes}
            //     </p>`;

            buttonDiv.appendChild(buttonDivP);
            buttonDiv.appendChild(buttonDivMore);
            buttonDiv.appendChild(buttonDivLess);
            // buttonDiv.appendChild(buttonContent);

            unorderedListButton.appendChild(buttonDiv);

            unorderedListItem.appendChild(unorderedListButton);

            return unorderedListItem;
        },
        pokemonListBox: function () {
            let pokemonArray = pokemonRepository.getAll();
            let unorderedList = document.createElement('ul');
            unorderedList.classList.add('pokemon-list');
        
            let unorderedListHeader = document.createElement('h1');
            unorderedListHeader.innerText = 'POKEMON';
            unorderedList.appendChild(unorderedListHeader);
        
            pokemonArray.forEach(function(pokedexEntry) {
                let unorderedListItem = pokemonRepository.addListItem(pokedexEntry);
                unorderedList.appendChild(unorderedListItem);
            })
        
            document.getElementsByTagName("main")[0].appendChild(unorderedList);
        },
        loadList: function () {
            return fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    pokemonRepository.add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        },
        loadDetails: function (item) {
            let url = item.detailsUrl;
            return fetch(url).then(function (response) {
              return response.json();
            }).then(function (details) {
              // Now we add the details to the item
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.types = details.types;
            }).catch(function (e) {
              console.error(e);
            });
          }
    }
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.pokemonListBox();
  });

// pokemonListBox();
