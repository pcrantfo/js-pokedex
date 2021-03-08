// https://pokedex.org/

let pokemonRepository = (function () {
    let pokemonList = [
        {
            nationalIndex: 1,
            name: 'bulbasaur',
            height: 0.7,
            types: ['grass', 'poison']
        },
        {
            nationalIndex: 2,
            name: 'ivysaur',
            height: 1,
            types: ['grass', 'poison']
        },
        {
            nationalIndex: 3,
            name: 'venusaur',
            height: 2,
            types: ['grass', 'posion']
        },
        {
            nationalIndex: 4,
            name: 'charmander',
            height: 0.6,
            types: ['fire']
        },
        {
            nationalIndex: 5,
            name: 'charmeleon',
            height: 1.1,
            types: ['fire']
        },
        {
            nationalIndex: 6,
            name: 'charizard',
            height: 1.7,
            types: ['fire', 'flying']
        },
        {
            nationalIndex: 7,
            name: 'squirtle',
            height: 0.5,
            types: ['water']
        },
        {
            nationalIndex: 8,
            name: 'wartortle',
            height: 1,
            types: ['water']
        },
        {
            nationalIndex: 9,
            name: 'blastoise',
            height: 1.6,
            types: ['water']
        }
    ];

    return {
        add: function(pokemon) {
            let keysInEntry = Object.keys(pokemon);

            if (typeof(pokemon) !== 'object') {
                alert(`${pokemon} is not the correct format to add to pokemonList`);
            } else if (keysInEntry.length !== 4) {
                alert(`pokemonList entry requires four key-value pairs`);
            } else if (keysInEntry[0] !== 'nationalIndex') {
                alert(`${keysInEntry[0]} is not a valid key for pokemonList`);
            } else if (keysInEntry[1] !== 'name') {
                alert(`${keysInEntry[1]} is not a valid key for pokemonList`);
            } else if (keysInEntry[2] !== 'height') {
                alert(`${keysInEntry[2]} is not a valid key for pokemonList`);
            } else if (keysInEntry[3] !== 'types') {
                alert(`${keysInEntry[3]} is not a valid key for pokemonList`);
            } else {
                pokemonList.push(pokemon);
            }
        },
        getAll: function() {
            return pokemonList;
        },
        // Search pokemonList for a pokemon name and return that pokemon's information, or an alert if it is not in the pokemonList
        findByName: function(pokemonName) {
            let allPokemon = pokemonRepository.getAll();
            let listOfNames = allPokemon.filter(entry => entry.name === pokemonName);
            return listOfNames.length === 0 ? alert(`${pokemonName} not in pokemonList`) : listOfNames;
        },
        addListItem: function(pokedexEntry) {
            let unorderedListItem = document.createElement('li');
            unorderedListItem.classList.add('pokemon-list__item');

            let unorderedListButton = document.createElement('button');
            unorderedListButton.classList.add('pokemon-list__button');

            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add('button-header');

            let buttonDivP = document.createElement('p');
            buttonDivP.innerText = pokedexEntry.name;

            let buttonDivMore = document.createElement('div');
            buttonDivMore.classList.add('pokemon-list__toggle');
            buttonDivMore.innerText = 'Show more +'
            let buttonDivLess = document.createElement('div');
            buttonDivLess.classList.add('pokemon-list__toggle', 'is-not-visible');
            buttonDivLess.innerText = 'Show less -'

            buttonDiv.appendChild(buttonDivP);
            buttonDiv.appendChild(buttonDivMore);
            buttonDiv.appendChild(buttonDivLess);

            unorderedListButton.appendChild(buttonDiv);

            unorderedListItem.appendChild(unorderedListButton);
            return unorderedListItem;
        }
    }
})();

function pokemonListBox() {
    let pokemonArray = pokemonRepository.getAll();
    let unorderedList = document.createElement('ul');
    unorderedList.classList.add('pokemon-list');

    let unorderedListHeader = document.createElement('h1');
    unorderedListHeader.innerText = 'Pokemon';
    unorderedList.appendChild(unorderedListHeader);

    pokemonArray.forEach(function(pokedexEntry) {
        let unorderedListItem = pokemonRepository.addListItem(pokedexEntry);
        unorderedList.appendChild(unorderedListItem);
    })

    document.getElementsByTagName("main")[0].appendChild(unorderedList);

    console.log(unorderedList);
}


pokemonListBox();

/**======================
 *    Button toggle
 *========================**/

const listButtons = document.querySelectorAll('.pokemon-list__button');

listButtons.forEach(function (button) {
    console.log(button);
    button.addEventListener('click', function (event) {
        let activeElement = event.currentTarget;
        console.log(activeElement);

        activeElement.querySelectorAll('.pokemon-list__toggle').forEach(v => v.classList.toggle('is-not-visible'));
    });
});

