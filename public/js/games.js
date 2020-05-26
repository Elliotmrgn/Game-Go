// import { response } from "express";

let singlePlayer = 0;
let multiPlayer = 0;
let controllerSupport = 0;
let greatSoundtrack = 0;
let coOp = 0;
let firstPerson = 0;
let pVe = 0;
let pVp = 0;
let newTags = 0;
let randGameID = 0;
let allTags = [];


//---------------------------RANDOM GAME SEARCH---------------------------//


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

//THESE ARE THE ACTUAL TAG CALLS TO BE USED WITH FRONT END
// if ($('#singlePlayer').attr('checked')) {
//     singlePlayer = 31;
//     allTags.push(singlePlayer);
// };

// if ($('#multiPlayer').attr('checked')) {
//     multiPlayer = 7;
//     allTags.push(multiPlayer);  
// };

// if ($('#contollerSupport').attr('checked')) {
//     controllerSupport = 40836;
//     allTags.push(controllerSupport);    
// };

// if ($('#greatSoundtrack').attr('checked')) {
//     greatSoundtrack = 42;
//     allTags.push(greatSoundtrack);
// };

// if ($('#coOp').attr('checked')) {
//     coOp = 18;
//     allTags.push(coOp);
// };

// if ($('#firstPerson').attr('checked')) {
//     firstPerson = 8;
//     allTags.push(firstPerson);
// };

// if ($('#PvE').attr('checked')) {
//     pVe = 171;
//     allTags.push(pVe);
// };

// if ($('#PvP').attr('checked')) {
//     pVp = 157;
//     allTags.push(pVp);
// };

//EXAMPLE TAGS USED FOR TESTING WITHOUT FRONT END
singlePlayer = 31;
allTags.push(singlePlayer);

multiPlayer = 7;
allTags.push(multiPlayer);

controllerSupport = 40836;
allTags.push(controllerSupport);

coOp = 18;
allTags.push(coOp);


newTags = allTags.toString();

console.log('newTags:', newTags);


const gameSearch = () => {
    const searchQuery = `platforms=187&genres=4&tags=${newTags}`;

    // const searchQuery = `platforms=${platformId}&genres=${genreId}&tags=${newTags}`;

    const queryUrl = `https://api.rawg.io/api/games?${searchQuery}`;

    $.ajax({
        url: queryUrl,
        type: "GET"
    })

    .then(response => {
        console.log(response);

        // Getting random number to select random game (maybe increase list size in first api call and then change '10')
        const randNumber = Math.floor(Math.random() * 10);
        console.log('number:', randNumber);

        const randGame = response.results[randNumber];
        console.log('randGame:', randGame);

        let randGameID = randGame.id;
        console.log('randGameID:', randGameID);
        
        //need to async await ajax call so that this can be its on function outside of the .then and just called here.
        
        //function getGameDetials() {

            const queryUrl2 = `https://api.rawg.io/api/games/${randGameID}`;
    
            $.ajax({
                url: queryUrl2,
                type: "GET"
            })
    
            .then(response => {
                console.log('GAME DETAILS!!!', response);
            })
        // }
    })
};

//Temporary call to start the function for API testing purposes
gameSearch();

//Kick off the search with the front end submit button
/* $('#searchGames').on('click', (event) => {
    event.preventDefault();
    gameSearch();
}); */










//---------------------------PREVIOUS LIKED GAME SEARCH---------------------------//

//need to get ID of game that was liked from the database

function getSavedGameDetails() {
    
    let savedGameID = "Replace with method to get ID from DB";

    const queryUrl = `https://api.rawg.io/api/games/${savedGameID}`;
    
            $.ajax({
                url: queryUrl,
                type: "GET"
            })
    
            .then(response => {
                console.log('SAVED GAME DETAILS!!!', response);
            })
}