
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