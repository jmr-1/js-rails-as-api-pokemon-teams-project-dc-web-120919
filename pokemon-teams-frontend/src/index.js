const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", (e)=>{
    console.log('connected');
    renderTrainers();
    
});

function renderTrainers(){
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => trainers.forEach(trainer => buildTrainerCard(trainer)));

}


function buildTrainerCard(trainer){
    console.log(trainer);
    let trainerCard = document.createElement('div');
    getTrainerContainer().appendChild(trainerCard);
    trainerCard.className = 'card';
    trainerCard.dataset.id = trainer.id;
    let trainerName = document.createElement('p');
    trainerName.innerText = trainer.name;
    trainerCard.appendChild(trainerName);
    let addPokemonButton = document.createElement('button');
    addPokemonButton.dataset['trainer']= trainer.id;
    addPokemonButton.innerText = 'Catch Pokémon';
    let pokemonList = document.createElement('ul');
    pokemonList.dataset['trainer'] = trainer.id;
    trainerCard.appendChild(addPokemonButton);
    trainerCard.appendChild(pokemonList);
    addPokemonButton.addEventListener('click', (e) => addPokemonHandler(e, trainer))
    trainer.pokemons.forEach(pokemon => buildPokemon(pokemon));
}


function buildPokemon(pokemon){
    // debugger;
    let pokemonList = document.querySelector(`ul[data-trainer="${pokemon.trainer_id}"]`)
    // trainerCard2.appendChild(pokemonList);
    let newLi = document.createElement('li');
    pokemonList.appendChild(newLi);
    newLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    let releaseButton = document.createElement('button');
    releaseButton.className = 'release';
    releaseButton.innerText = 'release';
    releaseButton.dataset['pokemon'] = pokemon.id;
    newLi.appendChild(releaseButton);
    releaseButton.addEventListener('click', (e)=> releasePokemon(e))
    
}

function getTrainerContainer(){
    return document.getElementById('trainer-container')
}
function releasePokemon(event){

    console.log('releasing pokemon');
    let pokemonID = parseInt(event.target.dataset.pokemon, 10);
    // debugger;
    fetch(`${POKEMONS_URL}/${pokemonID}`, {
        method: "DELETE"
    }).then(response => response.json())
    .then(data => console.log(data))
    event.target.parentElement.remove();
}

function addPokemonHandler(event, trainer){
    console.log(event);
    if(trainer.pokemons.length < 6){
        fetch(`${POKEMONS_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({trainer_id: trainer.id})})
            .then(response => response.json())
            .then(pokemon => buildPokemon(pokemon))

    }
    else {
        alert(`${trainer.name}, you already have 6 pokemon!`)
    }
}