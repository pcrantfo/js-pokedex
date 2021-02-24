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

function pokemonHeight () {
    let results = '';
    for (let element of pokemonList) {
        results += 
            `<div class="pokemon-height__item">
                <h3>${element.name}</h3>`
        if (element.height < 2) {
            results += 
                `<p>Height: ${element.height}</p>
            </div>`
        } else {
            results +=
                `<p>Height: ${element.height} — How's the weather up there?</p>
                </div>`
        }
    };
    document.getElementById('pokemon-height').innerHTML = `<h2>Pokemon height info</h2> ${results}`;
}

// Create table of all Pokemon in pokemonList

let table = document.querySelector('.pokemon-table');
let data = Object.keys(pokemonList[0]);
    // creates table headers
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
    // creates table body
function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            // test if a the 'types' key-value pair has multiple values
            if (key === 'types' && element[key].length > 1) { 
                let multiEntryArray = '';
                for (let value of element[key]) {
                    // check if it is the last value in the key-value pair
                    if (value === element[key][element[key].length-1]) {
                        multiEntryArray += `${value}`;
                    } else {
                        multiEntryArray += `${value}, `;
                    }
                }
                let text = document.createTextNode(multiEntryArray);
                cell.appendChild(text);
            } else {
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    }
}

// generateTable(table, pokemonList);
// generateTableHead(table, data);
pokemonHeight();