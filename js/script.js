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
        showDetails: function(pokedexEntry) {
            pokemonRepository.loadDetails(pokedexEntry).then(function () {
                console.log(pokedexEntry);
                return pokedexEntry;
                function getTypes(pokedexTypes) {
                    let types = '';
                    let c = 1;
                    pokedexTypes.forEach(function (typeEntry){
                        console.log(pokedexTypes);
                        console.log(c);
                        if (parseInt(pokedexTypes.length) === c) {
                            types += typeEntry.type.name;
                        } else {
                            types += `${typeEntry.type.name}, `;
                            c += 1;
                        }
                    })
                    return types;
                }
            });
        },
        addListItem: function(pokedexEntry) {
            let unorderedListItem = document.createElement('li');
            unorderedListItem.classList.add('pokemon-list__item');

            let unorderedListButton = document.createElement('button');
            unorderedListButton.classList.add('pokemon-list__button');

            unorderedListButton.addEventListener('click', function (event) {
                pokemonRepository.showDetails(pokedexEntry);
            });

            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add('button-header');

            let buttonDivP = document.createElement('h2');
            buttonDivP.innerText = pokedexEntry.name;

            let buttonDivMore = document.createElement('div');
            buttonDivMore.classList.add('pokemon-list__toggle');
            buttonDivMore.innerHTML = `<p>show more +</p>`;

            buttonDiv.appendChild(buttonDivP);
            buttonDiv.appendChild(buttonDivMore);

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
                json.results.forEach(function (pokedexEntry) {
                    let pokemon = {
                        name: pokedexEntry.name,
                        detailsUrl: pokedexEntry.url
                    };
                    pokemonRepository.add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        },
        loadDetails: function (pokedexEntry) {
            let url = pokedexEntry.detailsUrl;
            return fetch(url).then(function (response) {
              return response.json();
            }).then(function (details) {
              // Now we add the details to the pokedexEntry
              pokedexEntry.imageUrl = details.sprites.front_default;
              pokedexEntry.height = details.height;
              pokedexEntry.types = details.types;
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
