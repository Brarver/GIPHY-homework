var comedians = ['Will Ferrell', 'Sarah Silverman', 'Chris Farley', 'Jim Carrey', 'Damon Waynes', 'Norm MacDonald', 'Wanda Sykes']
var comedian
var favorites = getFavorites()


function saveFavorites(response, dataNum) {
  favorites.push({
    gif: response.data[dataNum].images.original.url,
    still: response.data[dataNum].images.original_still.url
  })
  
  console.log(favorites)
  localStorage.clear()
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

function getFavorites() {
  favorites = JSON.parse(localStorage.getItem('favorites'))

  if (favorites) {
    return favorites
  } else {
    return favorites = []
  }
  

  // for (var i = 0; i < favorites.length; i++) {
  //   $('.gifs').append(favorites[i])
  // }
}

function renderButtons() {

    $(".buttons").empty()

    for (var i = 0; i < comedians.length; i++) {

      var a = $("<button>")
      a.addClass("comedian-btn")
      a.attr("data-name", comedians[i])
      a.text(comedians[i])
      $(".buttons").append(a)
    }
  }

  function delGif() {
    $('.rmv-fav').click(function () {
        $(this).siblings().remove()
        $(this).remove()
    })
  }


  function display() {

    $('.gifs').empty()
    $('.gif-fav').css('display', 'block')

    var comedian = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LhxwYFwsHo6Oph8eIbyKlGIctBkkB6sn&q=" + comedian + "&limit=10&offset=0&lang=en"
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)

        for (var i = 0; i < response.data.length; i++) {
            
            var stillUrl = response.data[i].images.original_still.url

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

            if (state === 'still') {
                
                $(this).attr('data-state', 'animate')
                $(this).attr('src', response.data[dataNum].images.original.url)
                
                
            } else {
                
                $(this).attr('src', response.data[dataNum].images.original_still.url)
                $(this).attr('data-state', 'still')   
            }    
        })

        $('.add-fav').on("click", function () {
            var dataNum = $(this).attr('data-num')

            $(this).text('-Remove')
            $(this).removeClass('add-fav')
            $(this).addClass('rmv-fav')

            $('.read').text('')

            // favorites.push({
            //   gif: response.data[dataNum].images.original.url,
            //   still: response.data[dataNum].images.original_still.url
            // })
            
            
            
            $('.gif-fav').append($(this).parent())
            $($(this).siblings()).attr('data-still', response.data[dataNum].images.fixed_width_still.url)
            $($(this).siblings()).attr('data-animate', response.data[dataNum].images.fixed_width.url)
            $($(this).siblings()).removeClass('img-box')
            $($(this).siblings()).addClass('new-img-box')
            toggleFavGif()
            delGif()
            saveFavorites(response, dataNum)
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
  // getFavorites()

  console.log(favorites)


  //lines 6-11 and 101


  



  
  