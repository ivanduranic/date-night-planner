$(document).ready(function () {

  // Components
  $('.collapsible').collapsible();
  $('.scrollspy').scrollSpy();
  $('.carousel').carousel();

  // Useful Functions



  // Dom Selection

  var showTimes = document.getElementById(showTimes);


  // Test
  var getTheaterData = function () {
    // Api components

    // Start Date
    var startDate = "startDate=2020-11-14";
    // Radius and units of measurement mi=miles km=kilometers
    var radius = "&radius=20";
    var units = "&units=mi";
    // Longitude & Lagitude
    var lat = "&lat=40.116630";
    var lng = "&lng=-75.072852";

    /////////////////////////////////////
    // Api 
    var apiUrl = "https:data.tmsapi.com/v1.1/movies/showings?" + startDate + lat + lng + radius + units + "&api_key=fjq6dpfuv8sg5f66p8bmuyn2";
    console.log("http:data.tmsapi.com/v1.1/movies/showings?" + startDate + lat + lng + radius + units + "&api_key=ct3bfnvgcafwzwdvtp4khepg");
    http://data.tmsapi.com/v1.1/movies/showings?startDate=2020-11-14&zip=78701&api_key=bnzzjka7zekrh9tyqd6xxgrf
    // Data Request
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            
            // Unique Theater List Array
            var theaters = [];
            for (var i = 0; i < data.length; i++) {
              if (data[i].showtimes[i] !== undefined) {
                theaters.push(data[i].showtimes[i].theatre.name);
              };
            };

            // Filter Duplicate theater names (data is ordered movie's>higher order>theater)
            var uniquetheaters = theaters.filter(function (i, index) {
              return theaters.indexOf(i) === index;
            });
            //////////
            // Print To Screen
            console.log(uniquetheaters);
            theaterChoice.innerHTML = uniquetheaters;



            ///////////////////////////////////////////////////////////////////////////////////            
            // Unique Movie List Array
            var movies = [];
            for (var i = 0; i < data.length; i++) {
              if (data[i].title !== undefined) {
                movies.push(data[i].title);
              };
            };

            // Filter Duplicate movie names 
            var uniquemovies = movies.filter(function (i, index) {
              return movies.indexOf(i) === index;
            });
            /////////////////////////
            // Print To Screen
            // var movieChoice = document.getElementById(movieChoice);
            console.log(data);
            console.log(uniquemovies);
            movieChoice.innerText = uniquemovies;
          });

          //////////////////////////////////////////////////////////////////////////
          // Function to filter movies by theater



        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Theater API');
      });
  };

  getTheaterData();
});


