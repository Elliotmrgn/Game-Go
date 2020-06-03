$(document).ready(function() {
    //click handler for all full details buttons on card
    $(".fullDetails").on("click", function()  {
        console.log(this)
        const gameID = $(this).val();
        console.log("gameID", gameID)
        localStorage.setItem('gameID', gameID);
        window.location.href = "/homepage"

    });

});