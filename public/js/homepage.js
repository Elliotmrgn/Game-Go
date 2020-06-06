$(document).ready(function () {
  let Game = {};
  const userInput = () => {
    //gets platform value
    let platform = $("input[name='platform']:checked").val();
    //gets genre value
    let genre = $("input[name='genre']:checked").val();
    //gets all tag values
    let tags = $("input[name='tags']:checked")
      .map(function () {
        return $(this).val();
      })
      .get();
    //combines for search query
    //TODO ADD CASE FOR UNSELECTED PROMPTS
    let searchQuery = `platforms=${platform}&genres=${genre}&tags=${tags}`;
    return `https://api.rawg.io/api/games?${searchQuery}`;
  };
  window.onload = async () => {
    init();
    let lastID = localStorage.getItem("gameID");
    if (lastID) {
      $("#cardCol").append(`<div class="loader"></div>`);
      Game = await getGameData(lastID);
      generateHTML(Game);
    }
  };

  $("#search").on("click", async (event) => {
    event.preventDefault();
    console.log(Game);
    init();
    $("#cardCol").append(`<div class="loader"></div>`);
    let queryUrl = userInput();
    console.log("queryUrl", queryUrl);
    const gameID = await generateRandomGameID(queryUrl);
    console.log("gameID", gameID);
    Game = await getGameData(gameID);
    console.log("*******", Game);
    generateHTML(Game);
  });

  $("#searchAgain").on("click", async (event) => {
    event.preventDefault();
    console.log(Game);
    init();
    $("#cardCol").append(`<div class="loader"></div>`);
    let queryUrl = userInput();
    console.log("queryUrl", queryUrl);
    const gameID = await generateRandomGameID(queryUrl);
    console.log("gameID", gameID);
    Game = await getGameData(gameID);
    console.log("*******", Game);
    generateHTML(Game);
  });

  $("#save").on("click", async (event) => {
    event.preventDefault();
    const userData = await $.get("/api/user_data");
    console.log("userData", userData.id);

    saveGame(
      userData.id,
      Game.name,
      Game.id,
      Game.slug,
      Game.metacritic,
      Game.released,
      Game.background_image,
      Game.website,
      Game.description_raw
    );
  });

  $(".description").on("click", "#show-more", () => {
    console.log("click")
    $("#ellipse").remove()
    $("#show-more").remove()
    $(".description").html(`${Game.description} <button id="show-less">Show Less</button>`)
  })

  $(".description").on("click", "#show-less", () => {

    const description_short = Game.description.substring(0, 999)
    $(".description").html(`${description_short} <span id="ellipse"> . . . </span> <button id="show-more">Read More</button>`)
  })

  function saveGame(
    UserId,
    name,
    gameId,
    slug,
    metacritic,
    released,
    background_image,
    website,
    description_raw
  ) {
    try {
      $.post("/api/saveGame", {
        UserId,
        name,
        gameId,
        slug,
        metacritic,
        released,
        background_image,
        website,
        description_raw,
      });
    } catch (err) {
      console.log(err);
    }
  }
});
