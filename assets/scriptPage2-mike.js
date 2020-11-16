$(document).ready(function () {

  // Components
  $('.parallax').parallax();
  $('.scrollspy').scrollSpy();
  $('.carousel').carousel();
  $('.collapsible').collapsible();



  // Dom Selection

  // var theaterChoice = document.getElementById(theaterChoice);
  // var movieChoice = document.getElementById(movieChoice);


  // Test
  var getTheaterData = function () {
    // Api components

    // Start Date
    m = moment().format("YYYY-MM-DD");
    var startDate = "startDate=" + m;
    // Radius and units of measurement mi=miles km=kilometers
    var radius = "&radius=20";
    var units = "&units=mi";
    // Longitude & Lagitude
    var lat = "&lat=40.116630";
    var lng = "&lng=-75.072852";


    /////////////////////////////////////
    // Api 
    var apiUrl = "https:data.tmsapi.com/v1.1/movies/showings?" + startDate + lat + lng + radius + units + "&api_key=7k9ngeqqrjwx2zadh4a6yp8q";
    console.log(apiUrl);

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
            var theaterChoice = document.getElementById("theaterChoice");
            console.log(uniquetheaters);
            theaterChoice.innerHTML = uniquetheaters;



            ///////////////////////////////////////////////////////////////////////////////////            
            // Unique Movie List Array
            // 
            /////////////////////////////////

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
            console.log(data);
            console.log(uniquemovies);
            $(movieChoice).text(uniquemovies[0]);



            // //////////////
            ///Movie based on Theater Choice
            var theaterChoice;
            var movieChoice;
            var theaterList = [];
            for (var j = 0; j < data.length; j++) {
              
              for (var i = 0; i < data[j].showtimes.length; i++) {
                
                for (var m = 0; m < data[j].showtimes[i].theatre.length; m++) {
                  
                  if (data[j].showtimes[i].theatre[m].name){
                    console.log(data[j].showtimes[i].theatre[m].name)
                  };
                  // // theaterList.push(data[j].showtimes[i].theatre[m].name);
                  // console.log(x);
                  // // console.log(showtimes[i].theatre[m].name);
                  // // if(theaterList == )
                };
              };
            };


















            // /////////////////////////
            // // Showtimes
            // showTimes = [];
            // for (var j = 0; j < data.length; j++) {
            //   for (var i = 0; i < data[j].showtimes.length; i++) {
            //     for (var m = 0; m < data[j].showtimes[i].dateTime.length; m++) {
            //       showTimes.push(data[j].showtimes[i].dateTime);
            //       console.log(showTimes);
            //     };
            //   };
            // };










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

