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





// ================= Progress Bar Selectors =================

const hpFill = document.getElementById("hpFill");
const attackFill = document.getElementById("attackFill");
const defenseFill = document.getElementById("defenseFill");
const speedFill = document.getElementById("speedFill");





const content2 = document.querySelector(".content2");

const loading = document.getElementById("loading");// loading div

let errorMessage = document.getElementById("errorMessage");

let searchButton = document.getElementById("searchButton");

let pokemonInput = document.getElementById("pokemonName1"); // pokemon input

//laoding dots
let dots = "";
let loadingInterval;

const loadingMessage = document.getElementById("loadingMessage"); // laoding message


searchButton.addEventListener("click", async function () {

    content2.style.display = "none";

    // Reset Progress Bars

    hpFill.style.width = "0%";
    attackFill.style.width = "0%";
    defenseFill.style.width = "0%";
    speedFill.style.width = "0%";

    console.log(pokemonInput.value);

    let pokemon = pokemonInput.value.trim().toLowerCase();

    errorMessage.textContent = "";

    if (pokemon === "") {

        content2.style.display = "none";

        errorMessage.textContent = "Please enter a Pokémon name.";
        errorMessage.classList.add("shake");

        setTimeout(function () {
            errorMessage.classList.remove("shake");
        }, 300);
        return;

    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    try {

        loading.style.display = "flex";

        loadingInterval = setInterval(function () {
            if (dots.length === 3) {
                dots = "";
            }
            else {
                dots += ".";
            }
            loadingMessage.textContent = "Searching Pokémon" + dots;
        }, 400);


        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const data = await response.json();



        //design

        const allTypes = [
            "fire", "water", "grass", "electric", "poison",
            "ice", "ground", "rock", "flying", "psychic",
            "bug", "dragon", "ghost", "dark", "steel",
            "fairy", "normal"
        ];

        content2.classList.remove(...allTypes);

        // datas and values

        pokemonNameText.textContent =
            pokemon.charAt(0).toUpperCase() + pokemon.slice(1);

        // Image
        pokemonImage.src = data.sprites.front_default;

        // Type
        pokemonType.textContent = `Type: ${data.types.map(type => type.type.name).join(", ")}`;

        const mainType = data.types[0].type.name;

        content2.classList.add(mainType);

        // Stats
        // ================= OLD CODE =================

        // pokemonHP.textContent = `HP: ${data.stats[0].base_stat}`;
        // pokemonAttack.textContent = `Attack: ${data.stats[1].base_stat}`;
        // pokemonDefense.textContent = `Defense: ${data.stats[2].base_stat}`;
        // pokemonSpeed.textContent = `Speed: ${data.stats[5].base_stat}`;

        // ================= NEW CODE =================

        let hp = data.stats[0].base_stat;
        let attack = data.stats[1].base_stat;
        let defense = data.stats[2].base_stat;
        let speed = data.stats[5].base_stat;

        pokemonHP.textContent = hp;
        pokemonAttack.textContent = attack;
        pokemonDefense.textContent = defense;
        pokemonSpeed.textContent = speed;

        hpFill.style.width = `${(hp / 255) * 100}%`;
        attackFill.style.width = `${(attack / 255) * 100}%`;
        defenseFill.style.width = `${(defense / 255) * 100}%`;
        speedFill.style.width = `${(speed / 255) * 100}%`;

        //

        // Height & Weight
        // ================= OLD CODE =================

        // pokemonHeight.textContent = `Height: ${data.height}`;
        // pokemonWeight.textContent = `Weight: ${data.weight}`;

        // ================= NEW CODE =================

        pokemonHeight.textContent = `📏 Height: ${data.height / 10} m`;
        pokemonWeight.textContent = `⚖ Weight: ${data.weight / 10} kg`;

        // ID
        pokemonID.textContent = `Pokédex ID: #${data.id}`;

        loading.style.display = "none";

        clearInterval(loadingInterval);
        loadingMessage.textContent = ""; // Reset loading message
        dots = ""; // Reset dots

        content2.style.display = "flex";
    }
    catch (error) {
        // console.error("Error fetching Pokémon data:", error);



        clearInterval(loadingInterval);
        loadingMessage.textContent = ""; // Reset loading message
        dots = ""; // Reset dots

        loading.style.display = "none";

        content2.style.display = "none";


        errorMessage.textContent = "Pokémon not found. Please check the name and try again.";
        errorMessage.classList.add("shake");
        setTimeout(function () {
            errorMessage.classList.remove("shake");
        }, 300);
    }
});

pokemonInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchButton.click();
    }
});
