/**======================
 *    Pokemon List
 *========================**/
 [{
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
/**======================
 *    Begin No. 1
 *========================**/

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

/**======================
 *    End No. 1
 *========================**/