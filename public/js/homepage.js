$(document).ready(function () {
    $('#search').on('click', (event) => {
        event.preventDefault();
        //gets platform value
        let platform = $("input[name='platform']:checked").val();
        //gets genre value
        let genre = $("input[name='genre']:checked").val();
        //gets all tag values
        let tags = $("input[name='tags']:checked").map(function () {
            return $(this).val();
        }).get();
        //combines for search query
        let searchQuery = `platforms=${platform}&genres=${genre}&tags=${tags}`;

        let queryUrl = `https://api.rawg.io/api/games?${searchQuery}`;
        //first ajax call for all results
        $.ajax({
            url: queryUrl,
            type: "GET"
        }).then(result => {
            console.log(result)
            //picks a random game 1 - max
            const randGame = Math.ceil(Math.random() * result.count)
            console.log("randGame", randGame)
            //finds what page a game is on
            const gamePage = Math.ceil(randGame / 20);
            console.log("gamePage", gamePage)
            //find what array slot its in
            let gameSlot = (randGame % 20) - 1;
            //case for last slot ****should be a better solution than this
            if (gameSlot === -1) { gameSlot = 19; }
            console.log("gameSlot", gameSlot)
            //new ajax call for that page
            queryUrl += `&page=${gamePage}`;
            $.ajax({
                url: queryUrl,
                type: "GET"
            }).then(results => {
                //new page results 
                console.log("RANDOM PAGE RESULTS", results)
                //destructuring results to game
                const { game } = { game: results.results[gameSlot] }
                console.log(game)
                //title update
                $(".title").text(game.name)
                //screenshot update
                $(".screenshot").attr("src", game.background_image)
                //creates an array of all platforms for the game and updates
                const allPlatforms = []
                game.platforms.forEach(platform => {
                    allPlatforms.push(` ${platform.platform.name}`)
                });
                $(".platforms").text(allPlatforms)
                
            })
        })
    });

})