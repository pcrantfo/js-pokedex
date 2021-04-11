const pokeRepository = (function () {
    return {
        fetchPokemonList: (limit = 151) => {
            return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
            .then(response => response.json());
        },

        fetchPokemon: ({ url }) => {
            return fetch(url)
            .then(function (response) {
                return response.json();
            });
        },

        createDOMList: function() {
            const unorderedList = document.createElement('ul');
            unorderedList.classList.add('pokemon-list');

            const unorderedListHeader = document.createElement('h1');
            unorderedListHeader.innerText = 'POKEMON';
            unorderedList.appendChild(unorderedListHeader);

            return unorderedList;
        },

        showDetails: function(pokemon) {
            const info = document.createElement('div');
            info.classList.add('info');

            const infoImage = document.createElement('img');
            infoImage.classList.add('info-image');
            infoImage.src = pokemon.sprites.front_default;

            const infoInteriorDiv = document.createElement('div');
            infoInteriorDiv.classList.add('info-interior-div');

            const infoContent = document.createElement('div');
            infoContent.classList.add('info-content');

            const types = pokemon.types.map(({ type }) => type.name).join(', ');

            infoContent.innerHTML = 
            `
                <p><strong>Height:</strong> ${pokemon.height}m.</p>
                <p><strong>Types:</strong> ${types}</p>
            `

            info.appendChild(infoImage);
            infoInteriorDiv.appendChild(infoContent);
            info.appendChild(infoInteriorDiv);

            return info;
        },

        addListItem: function(pokemon) {
            const unorderedListItem = document.createElement('li');
            unorderedListItem.classList.add('pokemon-list__item');

            const unorderedListButton = document.createElement('button');
            unorderedListButton.classList.add('pokemon-list__button');

            const info = pokeRepository.showDetails(pokemon);
                
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

            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('button-header');

            const buttonDivH2 = document.createElement('h2');
            buttonDivH2.innerText = pokemon.name;

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
        }
    }
})();

pokeRepository.fetchPokemonList()
.then(({ results }) => Promise.all(results.map(pokeRepository.fetchPokemon)))
.then( function (pokemonList) {
    const unorderedList = pokeRepository.createDOMList();

    pokemonList.forEach(function (pokemon) {
        const unorderedListItem = pokeRepository.addListItem(pokemon);
        unorderedList.appendChild(unorderedListItem);
    });

    document.getElementsByTagName("main")[0].appendChild(unorderedList);
});