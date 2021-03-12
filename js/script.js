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
    
/**======================
 *    CUT HERE FOR INFO SECTION PASTE
 *    BE SURE TO TAB OVER TWICE
 *========================**/

        showDetails: function(pokedexEntry) {
            pokemonRepository.loadDetails(pokedexEntry).then(function () {
                console.log(pokedexEntry);

                let modalContainer = document.createElement('div');
                modalContainer.classList.add('modal-container');
                modalContainer.innerHTML = '';

                let modal = document.createElement('div');
                modal.classList.add('modal');

                let modalImage = document.createElement('img');
                modalImage.classList.add('modal-image');
                modalImage.src = pokedexEntry.imageUrl;

                let modalInteriorDiv = document.createElement('div');
                modalInteriorDiv.classList.add('modal-interior-div');
                
                let modalHeader = document.createElement('h2');
                modalHeader.innerText = pokedexEntry.name;

                let modalButton = document.createElement('button');
                modalButton.classList.add('modal-button');
                modalButton.innerText = 'close';
                modalButton.addEventListener('click', hideModal);

                let modalContent = document.createElement('div');
                modalContent.classList.add('modal-content');
                let pokemonListTypes = getTypes(pokedexEntry.types);
                modalContent.innerHTML = 
                `
                    <p><strong>Height:</strong> ${pokedexEntry.height}m.</p>
                    <p><strong>Types:</strong> ${pokemonListTypes}
                `
                modal.appendChild(modalImage);
                modalInteriorDiv.appendChild(modalHeader);
                modalInteriorDiv.appendChild(modalButton);
                modalInteriorDiv.appendChild(modalContent);
                modal.appendChild(modalInteriorDiv);
                modalContainer.appendChild(modal);
                document.getElementsByTagName('body')[0].appendChild(modalContainer);
                
                window.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && modalContainer) {
                        hideModal();
                    }
                })

                modalContainer.addEventListener('click', (e) => {
                    let target = e.target;
                    if (target === modalContainer) {
                        hideModal();
                    }
                })

                function hideModal() {
                    modalContainer.remove();
                }

                // Formats types with ', ' until last type entry
                function getTypes(pokedexTypes) {
                    let types = '';
                    let c = 1;
                    pokedexTypes.forEach(function (typeEntry){

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
    /**======================
     *    END CUT
     *========================**/
        pokemonListBox: function () {
            let pokemonArray = pokemonRepository.getAll();
            let unorderedList = document.createElement('ul');
            unorderedList.classList.add('pokemon-list');
        
            let unorderedListHeader = document.createElement('h1');
            unorderedListHeader.innerText = 'POKEMON';
            unorderedList.appendChild(unorderedListHeader);
        
            pokemonArray.forEach(function(pokedexEntry) {
                pokemonRepository.loadDetails(pokedexEntry);

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
