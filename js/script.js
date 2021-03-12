// https://pokedex.org/

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=386';

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

        // Function must be called in .loadDetails promise
        showDetails: function(pokedexEntry) {
            // console.log(pokedexEntry);

            let info = document.createElement('div');
            info.classList.add('info');

            let infoImage = document.createElement('img');
            infoImage.classList.add('info-image');
            infoImage.src = pokedexEntry.imageUrl;

            let infoInteriorDiv = document.createElement('div');
            infoInteriorDiv.classList.add('info-interior-div');

            let infoContent = document.createElement('div');
            infoContent.classList.add('info-content');
            let pokemonListTypes = getTypes(pokedexEntry.types);
            infoContent.innerHTML = 
            `
                <p><strong>Height:</strong> ${pokedexEntry.height}m.</p>
                <p><strong>Types:</strong> ${pokemonListTypes}
            `
            info.appendChild(infoImage);
            infoInteriorDiv.appendChild(infoContent);
            info.appendChild(infoInteriorDiv);

            function hideinfo() {
                info.remove();
            }

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

            return info;
        },
        addListItem: function(pokedexEntry) {
            let unorderedListItem = document.createElement('li');
            unorderedListItem.classList.add('pokemon-list__item');

            let unorderedListButton = document.createElement('button');
            unorderedListButton.classList.add('pokemon-list__button');

            pokemonRepository.loadDetails(pokedexEntry).then(function () {
                let info = pokemonRepository.showDetails(pokedexEntry);
                
                unorderedListButton.addEventListener('click', function (event) {
                    let activeElement = event.currentTarget;
            
                    activeElement.querySelectorAll('.pokemon-list__toggle').forEach(v => v.classList.toggle('is-not-visible'));

                    info.remove();
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

            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add('button-header');

            let buttonDivP = document.createElement('h3');
            buttonDivP.innerText = pokedexEntry.name;

            let buttonDivMore = document.createElement('div');
            buttonDivMore.classList.add('pokemon-list__toggle');
            buttonDivMore.innerHTML = `<p>show more +</p>`;
            let buttonDivLess = document.createElement('div');
            buttonDivLess.classList.add('pokemon-list__toggle', 'is-not-visible');
            buttonDivLess.innerHTML = `<p>Show less -</p>`;

            buttonDiv.appendChild(buttonDivP);
            buttonDiv.appendChild(buttonDivMore);
            buttonDiv.appendChild(buttonDivLess);

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
            
            let c = 1;
            pokemonArray.forEach(function(pokedexEntry) {
                pokemonRepository.loadDetails(pokedexEntry);

                let unorderedListItem = pokemonRepository.addListItem(pokedexEntry);

                // add generation headers to link to in nav
                let genHeader = document.createElement('h2');
                if (c === 1) {
                    genHeader.innerText = 'Generation I';
                    genHeader.classList.add('pokemon-generation');
                    genHeader.id = 'generation-1'
                    unorderedList.appendChild(genHeader);
                } else if (c === 152) {
                    genHeader.innerText = 'Generation II';
                    genHeader.classList.add('pokemon-generation');
                    genHeader.id = 'generation-2'
                    unorderedList.appendChild(genHeader);
                } else if (c === 252) {
                    genHeader.innerText = 'Generation III';
                    genHeader.classList.add('pokemon-generation');
                    genHeader.id = 'generation-3'
                    unorderedList.appendChild(genHeader);
                }
                unorderedList.appendChild(unorderedListItem);
                c += 1;
            })
        
            document.getElementsByTagName("main")[0].appendChild(unorderedList);

            let navLinks = document.createElement('div');
            navLinks.classList.add('pokemon-list__links');
            let genOneLink = document.createElement('a');
            genOneLink.href = '#generation-1';
            genOneLink.innerText = 'GEN I';

            let genTwoLink = document.createElement('a');
            genTwoLink.href = '#generation-2';
            genTwoLink.innerText = 'GEN II';

            let genThreeLink = document.createElement('a');
            genThreeLink.href = '#generation-3';
            genThreeLink.innerText = 'GEN III';

            let headerBottom = document.getElementById('header-bottom');
            let nav = document.getElementsByTagName('header')[0];

            navLinks.appendChild(genOneLink);
            navLinks.appendChild(genTwoLink);
            navLinks.appendChild(genThreeLink);

            nav.insertBefore(navLinks, headerBottom);

            
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
                console.error(`loadList ${e}`);
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
