$(document).ready(function () {

  // Components
  $('.collapsible').collapsible();
  $('.scrollspy').scrollSpy();
  $('.carousel').carousel();

  // Useful Functions



  // Dom Selection
  var movieChoice = document.getElementById(movieChoice);
  var showTimes = document.getElementById(showTimes);


  // Test
  var getTheaterData = function () {
    // Api components

    // Start Date
    var startDate = "startDate=2020-11-13";
    // Radius and units of measurement mi=miles km=kilometers
    var radius = "&radius=20";
    var units = "&units=mi";
    // Longitude & Lagitude
    var lat = "&lat=43.592725";
    var lng = "&lng=-79.542039";

    // Api 
    var apiUrl = "https:data.tmsapi.com/v1.1/movies/showings?" + startDate + lat + lng + radius + units + "&api_key=7dzhsf6hjxyc3vk9pabnbjmu";
    console.log("http:data.tmsapi.com/v1.1/movies/showings?" + startDate + lat + lng + radius + units + "&api_key=ct3bfnvgcafwzwdvtp4khepg");

    // Data Request
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            console.log(data.length);

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

            console.log(uniquetheaters);

            for ( var i = 0; i<uniquetheaters.length; i++){}
            theaterChoice.innerHTML = uniquetheaters;
          });


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


