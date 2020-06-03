$(document).ready(function() {
  const randomizedGame = [];
  $("#search").on("click", (event) => {
    event.preventDefault();
    $(".card").hide();
    //TODO CREATE INIT TO CLEAR ALL DATA
    init();
    //Sets save button to be hidden before a game is found.
    $("#save").attr("hidden", "hidden");
    //gets platform value
    let platform = $("input[name='platform']:checked").val();
    //gets genre value
    let genre = $("input[name='genre']:checked").val();
    //gets all tag values
    let tags = $("input[name='tags']:checked")
      .map(function() {
        return $(this).val();
      })
      .get();
    //combines for search query
    //TODO ADD CASE FOR UNSELECTED PROMPTS
    let searchQuery = `platforms=${platform}&genres=${genre}&tags=${tags}`;

    let queryUrl = `https://api.rawg.io/api/games?${searchQuery}`;
    //first ajax call for all results
    $.ajax({
      url: queryUrl,
      type: "GET",
    }).then((result) => {
      console.log(result);
      //picks a random game 1 - max
      //hack fix b/c api only lets 10k results
      let randGame = 10001;
      do {
        randGame = Math.ceil(Math.random() * result.count);
      } while (randGame > 10000);
      console.log("randGame", randGame);
      //finds what page a game is on
      const gamePage = Math.ceil(randGame / 20);
      console.log("gamePage", gamePage);
      //find what array slot its in
      let gameSlot = (randGame % 20) - 1;
      console.log("gameSlot", gameSlot);
      //case for last slot ****should be a better solution than this
      if (gameSlot === -1) {
        gameSlot = 19;
      }

      //new ajax call for that page
      queryUrl += `&page=${gamePage}`;
      console.log("queryUrl", queryUrl);
      $.ajax({
        url: queryUrl,
        type: "GET",
      }).then((results) => {
        //new page results
        console.log("RANDOM PAGE RESULTS", results);

        $.ajax({
          url: `https://api.rawg.io/api/games/${results.results[gameSlot].id}`,
          type: "GET",
        }).then((game) => {
          randomizedGame.pop();
          randomizedGame.push(game);
          console.log("randomizedGame", randomizedGame);

          console.log("****GAME*****", game);
          console.log("game", game.slug);
          $.ajax({
            url: `https://api.rawg.io/api/games/${game.slug}/screenshots`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "GET",
          }).then((screenshots) => {
            console.log("screenshots***********", screenshots);
            screenshots.results.forEach((screenshot, i) => {
              $(".carousel-indicators").append(
                `<li data-target="#screenshot-carousel" data-slide-to="${i}"></li>`
              );
              $(".carousel-inner").append(`
                            <div class="carousel-item">
                                <div class="view">
                                    <img class="d-block w-100"
                                        src="${screenshot.image}"
                                        alt="First slide">
                                    <div class="mask rgba-black-slight">
                                    </div>
                                </div>
                            </div>
                            `);
              if (i === 0) {
                $(".carousel-indicators").addClass("active");
                $(".carousel-item").addClass("active");
              }
            });
          });
          //added following line that enables the save button when a game is found.
          $("#save").removeAttr("hidden");
          //added following line that shows returned game data when a game is found.
          $("#gameData").removeAttr("hidden");
          //title update
          $(".title").html(`<h1>${game.name}</h1>`);
          //creates an array of all platforms for the game and updates
          $(".release-date").text(game.released);
          game.platforms.forEach((platform) => {
            //allPlatforms.push(` ${platform.platform.name}`)
            $(".platforms").append(`<li>${platform.platform.name}</li>`);
          });
          game.stores.forEach((store) => {
            //allPlatforms.push(` ${platform.platform.name}`)
            $(".stores").append(
              `<li><a target="_blank" href="${store.url}">${store.store.name}</a></li>`
            );
          });
          game.developers.forEach((dev) => {
            $(".developers").append(`<li>${dev.name}</li>`);
          });
          game.genres.forEach((genre) => {
            $(".genres").append(`<li>${genre.name}</li>`);
          });
          game.tags.forEach((tag) => {
            $(".tags").append(`<li>${tag.name}</li>`);
          });
          let description;
          if (game.description) {
            description = game.description;
          } else {
            description = game.description_raw;
          }
          $(".description").html(description);
          if (game.metacritic) {
            $(".side-card").append(`
                        <div class="side-card-box metacritic">
                            <h3>METASCORE</h3>
                            <span class="metascore">${game.metacritic}</span>
                        </div>`);
          }
          $(".card").show();
        });
      });
    });
  });
  const init = () => {
    $(".carousel-indicators").empty();
    $(".carousel-inner").empty();
    $(".title").empty();
    $(".description").empty();
    $(".platforms").empty();
    $(".stores").empty();
    $(".metacritic").remove();
  };

  $("#save").on("click", async (event) => {
    event.preventDefault();
    console.log(randomizedGame);
    const userData = await $.get("/api/user_data");
    console.log("userData", userData.id);

    console.log("game", randomizedGame[0].name);
    saveGame(
      userData.id,
      randomizedGame[0].name,
      randomizedGame[0].id,
      randomizedGame[0].slug,
      randomizedGame[0].metacritic,
      randomizedGame[0].released,
      randomizedGame[0].background_image,
      randomizedGame[0].website,
      randomizedGame[0].description_raw
    );
  });

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
