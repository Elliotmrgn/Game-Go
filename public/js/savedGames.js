$(document).ready(function() {
    //click handler for all full details buttons on card
    $(".fullDetails").on("click", (event) => {
        event.preventDefault();
        const gameID = $(".fullDetails").val();
        localStorage.setItem('gameID', gameID);
        window.location.href = "/homepage"

    });

});