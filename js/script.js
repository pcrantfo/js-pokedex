// https://pokedex.org/

const pokemonRepository = (function () {
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    return {
        add: function(pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function() {
            return pokemonList;
        },
        findByName: function(pokemonName) {
            const allPokemon = pokemonRepository.getAll();
            const listOfNames = allPokemon.filter(entry => entry.name.includes(pokemonName.toLowerCase));
            return listOfNames.length === 0 ? alert(`${pokemonName} not in pokemonList`) : listOfNames;
        },

        // Function that retrieves and shows a pokemon's details when list item is clicked. Must be called in .loadDetails promise.
        showDetails: function(pokedexEntry) {
            // console.log(pokedexEntry);

            const info = document.createElement('div');
            info.classList.add('info');

            const infoImage = document.createElement('img');
            infoImage.classList.add('info-image');
            infoImage.src = pokedexEntry.imageUrl;

            const infoInteriorDiv = document.createElement('div');
            infoInteriorDiv.classList.add('info-interior-div');

            const infoContent = document.createElement('div');
            infoContent.classList.add('info-content');
            const pokemonListTypes = pokedexEntry.types.map(({ type }) => type.name).join(", ");
            infoContent.innerHTML = 
            `
                <p><strong>Height:</strong> ${pokedexEntry.height}m.</p>
                <p><strong>Types:</strong> ${pokemonListTypes}</p>
            `
            info.appendChild(infoImage);
            infoInteriorDiv.appendChild(infoContent);
            info.appendChild(infoInteriorDiv);

            return info;
        },
        addListItem: function(pokedexEntry) {
            const unorderedListItem = document.createElement('li');
            unorderedListItem.classList.add('pokemon-list__item');

            const unorderedListButton = document.createElement('button');
            unorderedListButton.classList.add('pokemon-list__button');

            pokemonRepository.loadDetails(pokedexEntry).then(function () {
                const info = pokemonRepository.showDetails(pokedexEntry);
                
                unorderedListButton.addEventListener('click', function (event) {
                    const activeElement = event.currentTarget;
                    
                    // toggle Show more + and Show less -
                    // @ts-ignore
                    activeElement.querySelectorAll('.pokemon-list__toggle').forEach(v => v.classList.toggle('is-not-visible'));

                    // Display/remove details based on clicks
                    if (info.classList.contains('is-visible')) {
                        info.classList.toggle('is-visible');
                        info.remove();
                        unorderedListItem.classList.toggle('clicked');
                    } else {
                        console.log(info);
                        info.classList.toggle('is-visible');
                        unorderedListItem.appendChild(info);
                        unorderedListItem.classList.toggle('clicked');
                    }
                });
            });

            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('button-header');

            const buttonDivH2 = document.createElement('h2');
            buttonDivH2.innerText = pokedexEntry.name;

            const buttonDivMore = document.createElement('div');
            buttonDivMore.classList.add('pokemon-list__toggle');
            buttonDivMore.innerHTML = `<p>show more +</p>`;
            const buttonDivLess = document.createElement('div');
            buttonDivLess.classList.add('pokemon-list__toggle', 'is-not-visible');
            buttonDivLess.innerHTML = `<p>show less -</p>`;

            buttonDiv.appendChild(buttonDivH2);
            buttonDiv.appendChild(buttonDivMore);
            buttonDiv.appendChild(buttonDivLess);

            unorderedListButton.appendChild(buttonDiv);

            unorderedListItem.appendChild(unorderedListButton);

            return unorderedListItem;
        },
        // Uses addListItem to create pokedex ul
        pokemonListBox: function () {
            const pokemonArray = pokemonRepository.getAll();
            const unorderedList = document.createElement('ul');
            unorderedList.classList.add('pokemon-list');
        
            const unorderedListHeader = document.createElement('h1');
            unorderedListHeader.innerText = 'POKEMON';
            unorderedList.appendChild(unorderedListHeader);
        
            pokemonArray.forEach(function(pokedexEntry) {
                // pokemonRepository.loadDetails(pokedexEntry);

                const unorderedListItem = pokemonRepository.addListItem(pokedexEntry);
                unorderedList.appendChild(unorderedListItem);
            })
        
            document.getElementsByTagName("main")[0].appendChild(unorderedList);
        },
        loadList: function () {
            return fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(function (pokemonObject) {
                pokemonObject.results.forEach(function (pokedexEntry) {
                    const pokemon = {
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
            const url = pokedexEntry.detailsUrl;
            return fetch(url).then(function (response) {
              return response.json();
            }).then(function (details) {
                // Add const variable to return
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
