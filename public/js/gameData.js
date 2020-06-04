const generateRandomGameID = async queryUrl => {
    let randomGameID;
    await $.ajax({
      url: queryUrl,
      type: "GET",
    }).then(async allGames => {

      //picks a random game 1 - max (caps at 10k??)
      let randGame = 10001;
      //hack fix b/c api only lets 10k results
      do {
        randGame = Math.ceil(Math.random() * allGames.count);
      } while (randGame > 10000);

      //page the game is on
      const gamePage = Math.ceil(randGame / 20);
      //exact array slot for chosen game
      let gameSlot = (randGame % 20) - 1;
      //case for last slot ****should be a better solution than this
      if (gameSlot === -1) {
        gameSlot = 19;
      }
      //adds the correct page to the queryUrl
      queryUrl += `&page=${gamePage}`;
      //makes another call to get the chosen games specific id
      await $.ajax({
        url: queryUrl,
        type: "GET",
      }).then((chosenPage) => {
        randomGameID = chosenPage.results[gameSlot].id;
      })
    })
    return randomGameID;
  }
const getGameData = async id => {
    let Game = {};
    await $.ajax({
        url: `https://api.rawg.io/api/games/${id}`,
        type: "GET",
    }).then(async game => {
        console.log("game", game)
        //add in release to save memory
        Game.name = game.name;
        Game.id = game.id;
        Game.slug = game.slug;
        Game.metacritic = game.metacritic;
        Game.released = game.released;
        Game.background_image = game.background_image;
        Game.website = game.website;
        Game.description = game.description;
        Game.description_raw = game.description_raw;
        Game.platforms = [];
        game.platforms.forEach(platform => {
            Game.platforms.push(platform.platform.name);
        })
        Game.stores = [];
        game.stores.forEach(store => {
            Game.stores.push({ name: store.store.name, url: store.url });
        })
        Game.genres = [];
        game.genres.forEach(genre => {
            Game.genres.push(genre.name);
        })
        Game.tags = [];
        game.tags.forEach(tag => {
            Game.tags.push(tag.name);
        })
        Game.developers = [];
        game.developers.forEach(dev => {
            Game.developers.push(dev.name);
        })
        Game.screenshots = [];
        localStorage.setItem('gameID', game.id);
        await $.ajax({
            url: `https://api.rawg.io/api/games/${game.slug}/screenshots`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "GET",
        }).then((screenshots) => {
            screenshots.results.forEach((screenshot, i) => {
                Game.screenshots.push(screenshot.image)
            })
        })
    })
    return Game;
}

const init = () => {
    $("#gameData").hide();
    $(".loader").remove();
    $("#save").hide();
    $(".carousel-indicators").empty();
    $(".carousel-inner").empty();
    $(".title").empty();
    $(".developers").empty();
    $(".description").empty();
    $(".platforms").empty();
    $(".stores").empty();
    $(".genres").empty();
    $(".tags").empty();
    $(".metacritic").remove();
  };

const generateHTML = (Game) => {
    //builds screen shot carousel
    
    Game.screenshots.forEach((screenshot, i) => {
      $(".carousel-indicators").append(
        `<li data-target="#screenshot-carousel" data-slide-to="${i}"></li>`
      );
      $(".carousel-inner").append(`
                    <div class="carousel-item">
                        <div class="view">
                            <img class="d-block w-100"
                                src="${screenshot}"
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
    })
    $(".title").html(`<h1>${Game.name}</h1>`);
    $(".release-date").text(Game.released);
    Game.platforms.forEach((platform) => {
      //allPlatforms.push(` ${platform.platform.name}`)
      $(".platforms").append(`<li>${platform}</li>`);
    });
    Game.stores.forEach((store) => {
      //allPlatforms.push(` ${platform.platform.name}`)
      $(".stores").append(
        `<li><a target="_blank" href="${store.url}">${store.name}</a></li>`
      );
    });
    Game.developers.forEach((dev) => {
      $(".developers").append(`<li>${dev}</li>`);
    });
    Game.genres.forEach((genre) => {
      $(".genres").append(`<li>${genre}</li>`);
    });
    Game.tags.forEach((tag) => {
      $(".tags").append(`<li>${tag}</li>`);
    });
    let description;
    if (Game.description) {
      description = Game.description;
    } else {
      description = Game.description_raw;
    }
    $(".description").html(description);
    if (Game.metacritic) {
      $(".side-card").append(`
        <div class="side-card-box metacritic">
          <h3>METASCORE</h3>
          <span class="metascore">${Game.metacritic}</span>
        </div>`);
    }
    $("#search-params").removeClass("show");
    $("#save").show();
    $(".loader").hide();
    $("#gameData").show();
  }