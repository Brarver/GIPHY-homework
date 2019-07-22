var comedians = ['Will Ferrell', 'Chris Farley', 'Jim Carrey', 'Damon Waynes', 'Norm MacDonald', 'Wanda Sykes']

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

  $("#add-comedian").on("click", function(event) {
    event.preventDefault();
    
    var comedian = $("#comedian-input").val().trim();

    document.getElementById('form').reset()

    if (comedian) {
        comedians.push(comedian);

    
        renderButtons();
    }


  });

  renderButtons()


  function display() {

    $('.gifs').empty()

    var comedian = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LhxwYFwsHo6Oph8eIbyKlGIctBkkB6sn&q=" + comedian + "&limit=10&offset=0&rating=G&lang=en"
    
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response.data[0].images)

       

        for (var i = 0; i < 10; i++) {

            var stillUrl = response.data[i].images.fixed_height_still.url
            var gifUrl = response.data[i].images.fixed_height.url

            var gifBox = $('<div class="gif-box">')
            gifBox.attr('data-num', [i])
            gifBox.attr('data-state', 'still')
            var gif = $('<img>').attr('src', stillUrl)
            gifBox.append(gif)
            $('.gifs').append(gifBox)

            
        }

        $('.gif-box').on("click", function () {
            var dataNum = $(this).attr('data-num')
            var state = $(this).attr('data-state')
            console.log($(this).attr('data-state'))

            if (state === 'still') {
                // $(this).empty()
                gif = $('<img>').attr('src', response.data[dataNum].images.fixed_height.url)
                $(this).attr('data-state', 'animate')
                $(this).empty()
                $(this).append(gif)
                
            } else {
                // $(this).empty()
                gif = $('<img>').attr('src', response.data[dataNum].images.fixed_height_still.url)
                $(this).attr('data-state', 'still')
                $(this).empty()
                $(this).append(gif)
                
            }
            
            
        })

        $('.gifs').append()
    });

  }

  $(document).on("click", ".comedian-btn", display);

  