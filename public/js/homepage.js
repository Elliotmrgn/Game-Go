

$(document).ready(function () {
    $('#search').on('click', (event) => {
        event.preventDefault();
        $(".card").hide();
        //TODO CREATE INIT TO CLEAR ALL DATA
        init();
        //gets platform value
        let platform = $("input[name='platform']:checked").val();
        //gets genre value
        let genre = $("input[name='genre']:checked").val();
        //gets all tag values
        let tags = $("input[name='tags']:checked").map(function () {
            return $(this).val();
        }).get();
        //combines for search query
        //TODO ADD CASE FOR UNSELECTED PROMPTS
        let searchQuery = `platforms=${platform}&genres=${genre}&tags=${tags}`;

        let queryUrl = `https://api.rawg.io/api/games?${searchQuery}`;
        //first ajax call for all results
        $.ajax({
            url: queryUrl,
            type: "GET"
        }).then(result => {
            console.log(result)
            //picks a random game 1 - max
            //hack fix b/c api only lets 10k results
            let randGame = 10001;
            do {
                randGame = Math.ceil(Math.random() * result.count)
            } while (randGame > 10000);
            console.log("randGame", randGame)
            //finds what page a game is on
            const gamePage = Math.ceil(randGame / 20);
            console.log("gamePage", gamePage)
            //find what array slot its in
            let gameSlot = (randGame % 20) - 1;
            console.log("gameSlot", gameSlot)
            //case for last slot ****should be a better solution than this
            if (gameSlot === -1) { gameSlot = 19; }
            //new ajax call for that page
            queryUrl += `&page=${gamePage}`;
            console.log("queryUrl", queryUrl)
            $.ajax({
                url: queryUrl,
                type: "GET"
            }).then(results => {
                //new page results 
                console.log("RANDOM PAGE RESULTS", results)

                $.ajax({
                    url: `https://api.rawg.io/api/games/${results.results[gameSlot].id}`,
                    type: "GET"
                }).then(game => {
                    console.log("****GAME*****", game)
                    console.log("game", game.slug)
                    $.ajax({
                        url: `https://api.rawg.io/api/games/${game.slug}/screenshots`,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "GET"
                    }).then(screenshots => {
                        console.log("screenshots***********", screenshots)
                        screenshots.results.forEach((screenshot, i) => {
                            $(".carousel-indicators").append(`<li data-target="#screenshot-carousel" data-slide-to="${i}"></li>`)
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
                            `)
                            if (i === 0) {
                                $(".carousel-indicators").addClass("active")
                                $(".carousel-item").addClass("active")
                            }

                        })
                    })
                    //title update
                    $(".title").html(`<h1>${game.name}</h1>`)
                    //creates an array of all platforms for the game and updates
                    
                    game.platforms.forEach(platform => {
                        //allPlatforms.push(` ${platform.platform.name}`)
                        $(".platforms").append(`<li>${platform.platform.name}</li>`)
                    });
                    game.stores.forEach(store => {
                        //allPlatforms.push(` ${platform.platform.name}`)
                        $(".stores").append(`<li><a target="_blank" href="${store.url}">${store.store.name}</a></li>`)
                    });
                    let description
                    if (game.description){description = game.description}
                    else{description = game.description_raw}
                    $(".description").html(game.description)
                    if (game.metacritic) {
                        $(".side-card").append(`
                        <div class="side-card-box metacritic">
                            <h3>METASCORE</h3>
                            <span class="metascore">${game.metacritic}</span>
                        </div>`)
                    }
                    $(".card").show();
                })
            })
        })
    });
    const init = ()=>{
        $(".carousel-indicators").empty();
        $(".carousel-inner").empty();
        $(".title").empty();
        $(".description").empty();
        $(".platforms").empty();
        $(".stores").empty();
        $(".metacritic").remove();
    }
})

