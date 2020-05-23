let singlePlayer = 0;
let multiPlayer = 0;
let controllerSupport = 0;
let greatSoundtrack = 0;
let coOp = 0;

let allTags = "";


let platformId = $('#platformDrop').val();

switch (platformId) {
    case "PC":
        platformId = 4;
        break;

    case "Playstation 5":
        platformId = 187;
        break;

    case "Xbox One":
        platformId = 1;
        break;

    case "Playstation 4":
        platformId = 18;
        break;

    case "Xbox Series X":
        platformId = 186;
        break;

    case "Nintendo Switch":
        platformId = 7;
        break;

    case "Xbox 360":
        platformId = 14;
        break;

    case "Playstation 3":
        platformId = 16;
        break;

    case "Playstation 2":
        platformId = 15;
        break;

    case "Wii":
        platformId = 11;
        break;

    case "GameCube":
        platformId = 105;
        break;

    case "SNES":
        platformId = 79;
        break;
};

let genreId = $('#genreDrop').val();

switch (genreId) {
    case "Action":
        genreId = 4;
        break;

    case "Indie":
        genreId = 51;
        break;

    case "Adventure":
        genreId = 3;
        break;

    case "RPG":
        genreId = 5;
        break;

    case "Strategy":
        genreId = 10;
        break;

    case "Shooter":
        genreId = 2;
        break;

    case "Casual":
        genreId = 40;
        break;

    case "Simulation":
        genreId = 14;
        break;

    case "Puzzle":
        genreId = 2;
        break;

    case "Arcade":
        genreId = 11;
        break;

    case "Racing":
        genreId = 1;
        break;

    case "Sports":
        genreId = 15;
        break;

    case "Massively Multiplayer":
        genreId = 259;
        break;

    case "Fighting":
        genreId = 6;
        break;

    case "Board":
        genreId = 28;
        break;

    case "Card":
        genreId = 17;
        break;
};


if ($('#singlePlayer').attr('checked')) {
    singlePlayer = 31;
    allTags += `${singlePlayer}`;
};

if ($('#multiPlayer').attr('checked')) {
    multiPlayer = 7;
    allTags += `${multiPlayer}`;
};

if ($('#contollerSupport').attr('checked')) {
    controllerSupport = 40836;
    allTags += `${controllerSupport}`;
};

if ($('#greatSoundtrack').attr('checked')) {
    greatSoundtrack = 42;
    allTags += `${greatSoundtrack}`;
};

if ($('#coOp').attr('checked')) {
    coOp = 18;
    allTags += `${coOp}`
};




const gameSearch = () => {
    const searchQuery = `platforms=187&genres=4`;

    const searchQuery = `platforms=${platformId}&genres=${genreId}`;

    const queryUrl = `https://api.rawg.io/api/games?${searchQuery}`;

    $.ajax({
        url: queryUrl,
        type: "GET"
    })

    .then(response => {
        console.log(response);
    })
};

gameSearch();


/* $('#searchGames').on('click', (event) => {
    event.preventDefault();
    gameSearch();
}); */