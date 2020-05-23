
const gameSearch = () => {
    const searchQuery = $('#searchBar').val();

    const queryUrl = `https://api.rawg.io/api/games/${searchQuery}`;

    $.ajax({
        url: queryUrl,
        type: "GET"
    })

    .then(response => {
        console.log(response);
    })
};


$('#searchGames').on('click', (event) => {
    event.preventDefault();
    gameSearch();
});