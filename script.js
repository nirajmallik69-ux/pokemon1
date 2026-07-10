const pokemonNameText = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonType = document.getElementById("pokemonType");
const pokemonHP = document.getElementById("pokemonHP");
const pokemonAttack = document.getElementById("pokemonAttack");
const pokemonDefense = document.getElementById("pokemonDefense");
const pokemonSpeed = document.getElementById("pokemonSpeed");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonID = document.getElementById("pokemonID");
const pokemonInfo = document.getElementById("pokemonInfo");



const content2 = document.querySelector(".content2");



let searchButton = document.getElementById("searchButton");

let pokemonInput = document.getElementById("pokemonName1");

searchButton.addEventListener("click", async function () {

    console.log(pokemonInput.value);

    let errorMessage = document.getElementById("errorMessage");
    let pokemon = pokemonInput.value.trim().toLowerCase();

    errorMessage.textContent = "";

    if (pokemon === "") {

        errorMessage.textContent = "Please enter a Pokémon name.";
        errorMessage.classList.add("shake");

        setTimeout(function () {
            errorMessage.classList.remove("shake");
        }, 300);
        return;

    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    const response = await fetch(url);
    const data = await response.json();



    // datas and values

    pokemonNameText.textContent =
        pokemon.charAt(0).toUpperCase() + pokemon.slice(1);

    // Image
    pokemonImage.src = data.sprites.front_default;

    // Type
    pokemonType.textContent = `Type: ${data.types.map(type => type.type.name).join(", ")}`;

    // Stats
    pokemonHP.textContent = `HP: ${data.stats[0].base_stat}`;
    pokemonAttack.textContent = `Attack: ${data.stats[1].base_stat}`;
    pokemonDefense.textContent = `Defense: ${data.stats[2].base_stat}`;
    pokemonSpeed.textContent = `Speed: ${data.stats[5].base_stat}`;

    // Height & Weight
    pokemonHeight.textContent = `Height: ${data.height}`;
    pokemonWeight.textContent = `Weight: ${data.weight}`;

    // ID
    pokemonID.textContent = `Pokédex ID: #${data.id}`;



    content2.style.display = "flex";
});
