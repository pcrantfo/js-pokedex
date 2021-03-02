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

// pokemonHeight loops through a list of objects (pokemonList in this case) and returns all pokemon's height value (with dimension), as well as checking if a pokemon is taller than 2m.

// Function will create a <div class="pokemon-height" each time function is called and insert that div before the end of the <main> element in the HTML.
function pokemonHeight (pokedex) {
    let results = '';
    for (let element of pokedex) {
        results += 
            `<div class="pokemon-height__item">
                <h3>${element.name}</h3>`
        if (element.height < 2) {
            results += 
                `<p>Height: ${element.height}m.</p>
            </div>`
        } else {
            results +=
                `<p>Height: ${element.height}m. — How's the weather up there?</p>
                </div>`
        }
    };
    document.getElementsByTagName("main")[0].insertAdjacentHTML("beforeend", `<div class="pokemon-height"><h2>Pokemon height info</h2>${results}</div>`);
}

// Create table of all Pokemon in pokemonList

}
}

pokemonHeight(pokemonList);