
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

let genre = $('#genreDrop').val();





const gameSearch = () => {
    const searchQuery = "doom-eternal";

    const queryUrl = `https://api.rawg.io/api/games/${searchQuery}`;

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