$(document).ready(function() {
  //click handler for all full details buttons on card
  $(".fullDetails").on("click", function() {
    const gameID = $(this).val();
    console.log("gameID", gameID);
    localStorage.setItem("gameID", gameID);
    window.location.href = "/homepage";
  });

  $(".back").on("click", "#delete", async function() {
    
    const userData = await $.get("/api/user_data");
    const gameId = $(this).val();
    deleteGame(userData.id, gameId);
  });

  async function deleteGame (UserId, gameId) {
    $.ajax({
      method: "DELETE",
      url: "/api/games/" + UserId + "/" + gameId,
    }).then(function() {
      location.reload(); 
    });
  }
});
