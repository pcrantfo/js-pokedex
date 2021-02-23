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

//  for (let x of pokemonList) {
//      console.log(x.nationalIndex);
//      console.log(x.name);
//      console.log(x.height);
//      for (let i of x.types) {
//          console.log(i);
//      };
//  };

let table = document.querySelector("table");
let data = Object.keys(pokemonList[0]);

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

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            if (element[key].length > 1 && typeof element[key] == 'object') { 
                let multiEntryArray = '';
                for (let i of element[key]) {
                    if (i == element[key][element[key].length-1]) {
                        multiEntryArray += `${i}`;
                    } else {
                        multiEntryArray += `${i}, `;
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

generateTable(table, pokemonList);
generateTableHead(table, data);