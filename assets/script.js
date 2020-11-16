$(document).ready(function () {



    // Dom Selection

    // var theaterChoice = document.getElementById(theaterChoice);
    // var movieChoice = document.getElementById(movieChoice);


    // Test
    var getTheaterData = function () {
        // Api components

        // Start Date
        // m = moment().format('YYYY-MM-DD')
        // console.log(m);
        var startDate = "startDate=2020-11-17";
        // Radius and units of measurement mi=miles km=kilometers
        var radius = "&radius=20";
        var units = "&units=mi";
        // Longitude & Lagitude
        var lat = "&lat=40.116630";
        var lng = "&lng=-75.072852";

        /////////////////////////////////////
        // Api 
        var apiUrl = "https:data.tmsapi.com/v1.1/movies/showings?" + startDate + lat + lng + radius + units + "&api_key=hs2hujn89q6qvq5bp8d9mnxg";
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

                        /////////////////////////
                        // Print To Screen
                        // var br = $("<br>")


                        for (var i = 0; i < uniquetheaters.length; i++) {
                            console.log(uniquetheaters[i]);
                            // var theaterList = document.getElementById("theaterList");
                            var theaterContainer = document.getElementById("theaterContainer");
                            var theaterEl = document.getElementById("theaterEl");

                            $("#theaterContainer").append($("#theaterList").clone(true));
                            $(theaterEl).text(uniquetheaters[i]);


                        };




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
                        console.log(uniquemovies);

                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to Theater API');
            });
    };
    console.log("hello");
    getTheaterData();
});
console.log("hello");

