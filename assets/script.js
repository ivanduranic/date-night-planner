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

                        /////////////////////////
                        // Print To Screen



                        for (var i = 0; i < uniquetheaters.length; i++) {
                            console.log(uniquetheaters[i]);
                            // var theaterList = document.getElementById("theaterList");
                            var theaterContainer = document.getElementById("theaterContainer");
                            var theaterEl = document.getElementById("theaterEl");

                            $("#theaterContainer").append($("#theaterList").clone(true));
                            $(theaterEl).text(uniquetheaters[i]).addClass("theaterClick");
                            $(theaterEl).data('theater', uniquetheaters[i]);


                        };


                        $('a.btn').click(function (e) {
                            $('.collapsible').collapsible('close', 0)
                            var theater = e.target.innerHTML;
                            localStorage.setItem("Theater:", theater);
                            movieShow();
                        });



                        // Movie on theater CHoice
                        function movieShow() {

                            var theaterChoice = localStorage.getItem("Theater:");
                            var movies = [];
                            var genres = [];
                            for (var j = 0; j < data.length; j++) {
                                for (var i = 0; i < data[j].showtimes.length; i++) {

                                    if (data[j].showtimes[i].theatre.name !== theaterChoice) {
                                        movies.push(data[j]);
                                    };
                                };

                            };
                            var uniquemovies = movies.filter(function (i, index) {
                                return movies.indexOf(i) === index;
                            });

                            var uniquemovies = uniquemovies.filter(function (i, index) {
                                return i !== "No Films Showing Today";
                            });

                            console.log(uniquemovies);
                            var movieContainer = document.getElementById("movieBoard");
                            var movieEl = document.getElementById("moviePoster");

                            for (var i = 0; i < uniquemovies.length; i++) {

                                var clone = $(movieEl).clone().addClass("hello" + i).appendTo(movieContainer);
                                $(".hello" + i + "> section.col.s8 > div > div > h3").text(uniquemovies[i].title);
                                $(".hello" + i + "> section.col.s8 > div > div > h4").text(uniquemovies[i].genres);
                                $(".hello" + i + "> section.col.s8 > div > div > h6").text(uniquemovies[i].shortDescription);
                                $(".hello" + i + "> section.col.s8 > div > div > p").text(uniquemovies[i].shortDescription);
                                $(".hello" + i + "> section.col.s8 > div > div > h5").text(uniquemovies[i].runTime);
                                
                            //     movieUrl = uniquemovies[i].replace(/\s/g, '+');
                            //     var imgApi = "https://api.themoviedb.org/3/search/movie?api_key=ff1a39513c89e4f235c5038be3d731a4&query=" + movieUrl;
                                
                            //     fetch(imgApi)
                            //         .then(function (response) {
                            //             if (response.ok) {
                            //                 response.json().then(function (data) {

                            //                     console.log(data);

                                                


                            //                 });
                            //             } else {
                            //                 alert('Error: ' + response.statusText);
                            //             }
                            //         })
                            //         .catch(function (error) {
                            //             alert('Unable to connect to Theater API');
                            //         });
                            };

                        };




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


