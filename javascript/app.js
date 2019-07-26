var comedians = getComedians()
var favorites = getFavorites()

function saveComedians() {
  localStorage.removeItem('comedians')
  localStorage.setItem('comedians', JSON.stringify(comedians))
}

function getComedians() {
  comedians = JSON.parse(localStorage.getItem('comedians'))

  if (comedians) {
    return comedians
  } else {
    return comedians = ['Will Ferrell', 'Sarah Silverman', 'Chris Farley', 'Jim Carrey', 'Damon Waynes', 'Norm MacDonald', 'Wanda Sykes']
  }
}


function saveFavorites(response, dataNum) {
  favorites.push({
    gif: response.data[dataNum].images.original.url,
    still: response.data[dataNum].images.original_still.url,
    rating: response.data[dataNum].rating.toUpperCase()
  })
  
  localStorage.removeItem('favorites')
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

function getFavorites() {
  favorites = JSON.parse(localStorage.getItem('favorites'))

  if (favorites) {
    return favorites
  } else {
    return favorites = []
  }
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
        var num = $(this).attr('data-num')
        favorites.splice(num, 1)

        localStorage.removeItem('favorites')
        localStorage.setItem('favorites', JSON.stringify(favorites))

    })
  }

  function displayFavorites(favorites) {

    $('.gif-fav').empty()

    for (var i = 0; i < favorites.length; i++) {
      var gifBox = $('<div class="gif-box">')
      gifBox.attr('data-num', [i])
      gifBox.attr('data-state', 'still')
      

      var rating = $('<div class="rating">').text('Rated: ' + favorites[i].rating.toUpperCase())

      var plus = $('<div>').text('-Remove')
      plus.addClass('rmv-fav')
      plus.attr('data-num', [i])
      
      var gif = $('<img class="new-img-box">').attr('src', favorites[i].still)
      gif.attr('data-still', favorites[i].still)
      gif.attr('data-animate', favorites[i].gif)
      gif.attr('data-num', [i])
      gif.attr('data-state', 'still')
      gifBox.append(rating)
      gifBox.append(gif)
      gifBox.append(plus)
      $('.gif-fav').append(gifBox)
    }

    toggleFav()
    delGif()
  }

  function toggleFav() {
    $('.new-img-box').on('click', function() {
      var state = $(this).attr('data-state')
      var still = $(this).attr('data-still') 
      var animate = $(this).attr('data-animate')
      
      if (state === 'still') {
          $(this).attr('src', animate)
          $(this).attr('data-state', 'animate')
      } else {
          $(this).attr('src', still)
          $(this).attr('data-state', 'still')
      }

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
            saveFavorites(response, dataNum)
            displayFavorites(favorites)
        })   
    });

  }


$("#add-comedian").on("click", function(event) {
    event.preventDefault();
    
    comedian = $("#comedian-input").val().trim();

    document.getElementById('form').reset()

    if (comedian) {
        comedians.push(comedian)

        saveComedians()

        renderButtons();
    }

  });

  
  
  $(document).on("click", ".comedian-btn", display);
  renderButtons()
  displayFavorites(favorites)


  



  
  