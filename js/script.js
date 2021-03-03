// https://pokedex.org/

// create IIFE to store pokemonList array with functions .add and .getAll to modify or access pokemonList
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
        }
    }
})();

// Test alerts in if statements
// pokemonRepository.add('not an object');
// pokemonRepository.add({
//     natlIndex: 10, 
//     name: 'caterpie', 
//     height: 0.3, 
//     types: 'bug'
// });
// pokemonRepository.add({
//     nationalIndex: 10, 
//     na: 'caterpie', 
//     height: 0.3, 
//     types: 'bug'
// });
// pokemonRepository.add({
//     nationalIndex: 10, 
//     name: 'caterpie', 
//     hgt: 0.3, 
//     types: 'bug'
// });
// pokemonRepository.add({
//     nationalIndex: 10, 
//     name: 'caterpie', 
//     height: 0.3, 
//     typs: 'bug'
// });
// pokemonRepository.add({
//     nationalIndex: 10, 
//     name: 'caterpie', 
//     height: 0.3, 
// });

// correct entry
pokemonRepository.add({
    nationalIndex: 10, 
    name: 'caterpie', 
    height: 0.3, 
    types: 'bug'
});

console.log(pokemonRepository.getAll());

// test findByName
// console.log(pokemonRepository.findByName('charizard'));
// console.log(pokemonRepository.findByName('caerpie'))

// pokemonHeight loops through a list of objects (pokemonList in this case) and returns all pokemon's height value (with dimension), as well as checking if a pokemon is taller than 2m.

// Function will create a <div class="pokemon-height" each time function is called and insert that div before the end of the <main> element in the HTML.

// function pokemonHeight (pokedex) {
//     let results = '';
//     for (let element of pokedex) {
//         results += 
//             `<div class="pokemon-height__item">
//                 <h3>${element.name}</h3>`
//         if (element.height < 2) {
//             results += 
//                 `<p>Height: ${element.height}m.</p>
//             </div>`
//         } else {
//             results +=
//                 `<p>Height: ${element.height}m. — How's the weather up there?</p>
//                 </div>`
//         }
//     };
//     document.getElementsByTagName("main")[0].insertAdjacentHTML("beforeend", `<div class="pokemon-height"><h2>Pokemon height info</h2>${results}</div>`);
// }


// takes pokemon height, tests to see if it is greater than 2, then formats it in meters.
function formatHeightInMeters (pokedexEntry) {
    let heightInMeters = pokedexEntry.height < 2 ? `${pokedexEntry.height}m.` : `${pokedexEntry.height}m. — How's the weather up there?`;
    return heightInMeters;
}

// creates divs with pokemon name and height information within them
function formatHeightDiv (pokedexEntry) {
    let heightDiv  = `<div class=pokemon-height__item><h3>${pokedexEntry.name}</h3><p>${formatHeightInMeters(pokedexEntry)}</p></div>`;
    return heightDiv;
}

// writes a div containing pokemon height divs at the end of main tag in HTML body
function writeHeights (content) {
    document.getElementsByTagName("main")[0].insertAdjacentHTML("beforeend", `<div class="pokemon-height"><h2>Pokemon height info</h2>${content}</div>`);
};

// combines three above functions to write a nested div structure displaying all meter-formatted heights of the pokemon in pokemonList
(function () {
    let results = "";
    pokemonRepository.getAll().forEach(function(pokedexEntry) {
        results += formatHeightDiv(pokedexEntry);
        return results;
    });
    writeHeights(results);
})();

// pokemonHeight(pokemonList);