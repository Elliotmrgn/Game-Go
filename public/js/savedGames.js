$(document).ready(function() {
  //click handler for all full details buttons on card
  $(".fullDetails").on("click", function() {
    console.log(this);
    const gameID = $(this).val();
    console.log("gameID", gameID);
    localStorage.setItem("gameID", gameID);
    window.location.href = "/homepage";
  });

  $("#back").on("click", "#delete", async function() {
    const userData = await $.get("/api/user_data");
    console.log("userData", userData.id);

    const gameId = $(this).val();

    console.log("gameId", gameId);

    deleteGame(userData.id, gameId);
  });

  function deleteGame(UserId, gameId) {
    $.ajax({
      method: "DELETE",
      url: "/api/games/" + UserId + "/" + gameId,
    }).then(function() {
      window.reload();
    });
  }
});
