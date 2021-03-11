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
 *    MODAL CODE: goes inside pokemonRepository
 *========================**/

//  showDetails: function(pokedexEntry) {
//     pokemonRepository.loadDetails(pokedexEntry).then(function () {
//         console.log(pokedexEntry);

//         let modalContainer = document.createElement('div');
//         modalContainer.classList.add('modal-container');
//         modalContainer.innerHTML = '';

//         let modal = document.createElement('div');
//         modal.classList.add('modal');

//         let modalImage = document.createElement('img');
//         modalImage.classList.add('modal-image');
//         modalImage.src = pokedexEntry.imageUrl;

//         let modalInteriorDiv = document.createElement('div');
//         modalInteriorDiv.classList.add('modal-interior-div');
        
//         let modalHeader = document.createElement('h2');
//         modalHeader.innerText = pokedexEntry.name;

//         let modalButton = document.createElement('button');
//         modalButton.classList.add('modal-button');
//         modalButton.innerText = 'close';
//         modalButton.addEventListener('click', hideModal);

//         let modalContent = document.createElement('div');
//         modalContent.classList.add('modal-content');
//         let pokemonListTypes = getTypes(pokedexEntry.types);
//         modalContent.innerHTML = 
//         `
//             <p><strong>Height:</strong> ${pokedexEntry.height}m.</p>
//             <p><strong>Types:</strong> ${pokemonListTypes}
//         `
//         modal.appendChild(modalImage);
//         modalInteriorDiv.appendChild(modalHeader);
//         modalInteriorDiv.appendChild(modalButton);
//         modalInteriorDiv.appendChild(modalContent);
//         modal.appendChild(modalInteriorDiv);
//         modalContainer.appendChild(modal);
//         document.getElementsByTagName('body')[0].appendChild(modalContainer);
        
//         window.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape' && modalContainer) {
//                 hideModal();
//             }
//         })

//         modalContainer.addEventListener('click', (e) => {
//             let target = e.target;
//             if (target === modalContainer) {
//                 hideModal();
//             }
//         })

//         function hideModal() {
//             modalContainer.remove();
//         }

//         function getTypes(pokedexTypes) {
//             let types = '';
//             let c = 1;
//             pokedexTypes.forEach(function (typeEntry){
//                 console.log(pokedexTypes);
//                 console.log(c);
//                 if (parseInt(pokedexTypes.length) === c) {
//                     types += typeEntry.type.name;
//                 } else {
//                     types += `${typeEntry.type.name}, `;
//                     c += 1;
//                 }
//             })
//             return types;
//         }
//     });
// },
// addListItem: function(pokedexEntry) {
//     let unorderedListItem = document.createElement('li');
//     unorderedListItem.classList.add('pokemon-list__item');

//     let unorderedListButton = document.createElement('button');
//     unorderedListButton.classList.add('pokemon-list__button');

//     unorderedListButton.addEventListener('click', function (event) {
//         pokemonRepository.showDetails(pokedexEntry);
//     });

//     let buttonDiv = document.createElement('div');
//     buttonDiv.classList.add('button-header');

//     let buttonDivP = document.createElement('h2');
//     buttonDivP.innerText = pokedexEntry.name;

//     let buttonDivMore = document.createElement('div');
//     buttonDivMore.classList.add('pokemon-list__toggle');
//     buttonDivMore.innerHTML = `<p>show more +</p>`;

//     buttonDiv.appendChild(buttonDivP);
//     buttonDiv.appendChild(buttonDivMore);

//     unorderedListButton.appendChild(buttonDiv);

//     unorderedListItem.appendChild(unorderedListButton);

//     return unorderedListItem;
// },

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