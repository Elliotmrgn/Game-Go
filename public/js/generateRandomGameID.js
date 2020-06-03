const findRandomGameID = async queryUrl => {
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