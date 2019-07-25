var comedians = ['Will Ferrell', 'Chris Farley', 'Jim Carrey', 'Damon Waynes', 'Norm MacDonald', 'Wanda Sykes']
var comedian
var favorites = []

function renderButtons() {

    $(".buttons").empty();

    for (var i = 0; i < comedians.length; i++) {

      var a = $("<button>");
      a.addClass("comedian-btn");
      a.attr("data-name", comedians[i]);
      a.text(comedians[i]);
      $(".buttons").append(a);

    }
  }

  function delGif() {
    $('.rmv-fav').click(function (e) {
        $(this).siblings().remove()
        $(this).remove()
    })
  }


  function display() {

    $('.gifs').empty()

    var comedian = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LhxwYFwsHo6Oph8eIbyKlGIctBkkB6sn&q=" + comedian + "&limit=10&offset=0&lang=en"
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LhxwYFwsHo6Oph8eIbyKlGIctBkkB6sn&q=" + comedian + "&limit=10&offset=0&rating=G&lang=en"
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)

        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[0].images)

            var stillUrl = response.data[i].images.fixed_width_still.url
            var gifUrl = response.data[i].images.fixed_width.url

            var gifBox = $('<div class="gif-box">')
            gifBox.attr('data-num', [i])
            gifBox.attr('data-state', 'still')

            var rating = $('<div class="rating">').text('Rated: ' + response.data[i].rating.toUpperCase())

            var plus = $('<div>').text('+Add Favorite')
            plus.addClass('add-fav')
            plus.attr('data-num', [i])
            
            var gif = $('<img class="img-box">').attr('src', stillUrl)
            gif.attr('data-num', [i])
            gif.attr('data-state', 'still')
            gifBox.append(rating)
            gifBox.append(gif)
            gifBox.append(plus)
            $('.gifs').append(gifBox)
            
            
        }

        $('.img-box').on("click", function () {
            var dataNum = $(this).attr('data-num')
            var state = $(this).attr('data-state')
            // $(this).prev().remove()
            console.log(this)

            if (state === 'still') {
                
                $(this).attr('data-state', 'animate')
                $(this).attr('src', response.data[dataNum].images.fixed_width.url)
                
                
            } else {
                
                $(this).attr('src', response.data[dataNum].images.fixed_width_still.url)
                $(this).attr('data-state', 'still')
                
                
                
            }    
        })

        $('.add-fav').on("click", function (e) {
            var dataNum = $(this).attr('data-num')

            $(this).text('-Remove')
            $(this).removeClass('add-fav')
            $(this).addClass('rmv-fav')
            
            $('.gif-fav').append($(this).parent())
            $($(this).siblings()).attr('data-still', response.data[dataNum].images.fixed_width_still.url)
            $($(this).siblings()).attr('data-animate', response.data[dataNum].images.fixed_width.url)
            $($(this).siblings()).removeClass('img-box')
            $($(this).siblings()).addClass('new-img-box')
            toggleFavGif()
            delGif()
        })

        
    });

  }

  function toggleFavGif() {
      $('.new-img-box').on('click', function() {
        var state = $(this).attr('data-state')
        var still = $(this).attr('data-still') 
        var animate = $(this).attr('data-animate')
        
        if (state === 'still') {
            $(this).children().first().attr('src', animate)
            $(this).children().first().attr('data-state', 'animate')
        } else {
            $(this).children().first().attr('src', still)
            $(this).children().first().attr('data-state', 'still')
        }

      })
}

$("#add-comedian").on("click", function(event) {
    event.preventDefault();
    
    comedian = $("#comedian-input").val().trim();

    document.getElementById('form').reset()

    if (comedian) {
        comedians.push(comedian);

        renderButtons();
    }


  });

  $(document).on("click", ".comedian-btn", display);

  renderButtons()

  //create clickable button for each added
  