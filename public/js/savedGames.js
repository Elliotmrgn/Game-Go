$(document).ready(function() {

    // define function to get the details for the specific game clicked 
    async function getSavedGameDetails() {
        const gameId = $(".fullDetails").val();
        console.log('gameId:', gameId);

        const queryUrl = `https://api.rawg.io/api/games/${gameId}`;
    
        const response = await $.ajax({
            url: queryUrl,
            type: "GET"
        })

        console.log(response);
    };

    //click handler for all full details buttons on card
    $(".fullDetails").on("click", (event) => {
        event.preventDefault();
        console.log("click");
        
        getSavedGameDetails();

    });

});