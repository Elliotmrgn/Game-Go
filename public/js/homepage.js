$(document).ready(function() {
    $('#search').on('click', (event) => {
        event.preventDefault();
        let platform = $("input[name='platform']:checked").val();
        console.log("platform----", platform)
        let genre = $("input[name='genre']:checked").val();
        console.log("genre----", genre)
        let tags=$("input[name='tags']:checked").map(function(){
            return $(this).val();
          }).get();
        console.log("tags----", tags)
        let searchQuery = `platforms=${platform}&genres=${genre}&tags=${tags}`;
        console.log("searchQuery---", searchQuery);

        const queryUrl = `https://api.rawg.io/api/games?${searchQuery}`;

        $.ajax({
            url:queryUrl,
            type:"GET"
        }).then(result =>{
            console.log(result)
        })
    });

})