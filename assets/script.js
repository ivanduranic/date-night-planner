$(document).ready(function () {
    // Index Page
    // ////////////////////////////////////////////////////////////////////////
    // Clear Local Storage
localStorage.clear();

    // Declare Variables To Store Input Variable

    var datepicker = $('#datePicker').val();
    var calenderBtn = $("#calendereBtn")
    var userLocationSelect = $("#userLocation").val();
    var rangePicker = $("#rangepicker").val();
    // var m = moment()format();
    // console.log(m);

    // User Location GPS
    //////////////////////
    var userLocation = $("#userLocation").on('click', getUserLocation());

    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            if (position.coords) {
                localStorage.setItem("Geo Accuracy", position.coords.accuracy);
                localStorage.setItem("User Latitute", position.coords.latitude);
                localStorage.setItem("User Longitute", position.coords.longitude);
            } else {
                getUserLocation();
            }
        });
    };

    // Grabbing User Location Input 
    //////////////////////////////
    var locationBtn = $("#locationBtn").on('click', function () {
        var desiredLocation = ($("#userLocation").val());

        // Saving in local storage
        localStorage.setItem("Desired Location:", desiredLocation);

        // Close after select
        $('.collapsible').collapsible('close', 0)

    });


    // Grabbing User Calender Input 
    ///////////////////////////////
    var calenderBtn = $("#dateBtn").on('click', function () {
        var desiredDate1 = ($("#datePicker").val());
        var desiredDate = moment(desiredDate1).format('YYYY-MM-DD');
        console.log(desiredDate);
        console.log(desiredDate1);
        var desiredTime = ($("#timePicker").val());

        // Saving in local storage
        localStorage.setItem("Desired Date:", desiredDate);
        localStorage.setItem("Desired Time:", desiredTime);
        // Close after select
        $('.collapsible').collapsible('close', 1)
    });


    // Grabbing User Range Input 
    /////////////////////////////
    var rangeBtn = $("#rangeBtn").on('click', function () {
        var desiredRange = ($("#rangePicker").val());

        // Saving in local storage
        localStorage.setItem("Desired Range:", desiredRange);
        // Close after select
        $('.collapsible').collapsible('close', 2)
        getTheaterData();
    });




    // Page 2
    /////////////////////////
    // Main Function
    ///////////////////////
    var getTheaterData = function () {
        // Api components

        var desiredRange = localStorage.getItem("Desired Range:");
        var desiredDate = localStorage.getItem("Desired Date:");
        var desiredLocation = localStorage.getItem("Desired Location:");

        // Start Date
        // m = moment().format('YYYY-MM-DD')
        // console.log(m);

        var startDate = "startDate="+desiredDate;
        // Radius and units of measurement mi=miles km=kilometers
        var radius = "&radius=" + desiredRange;
        var units = "&units=mi";
        // Longitude & Lagitude
        var lat = "&lat=40.116630";
        var lng = "&lng=-75.072852";
        var zip = "&zip=" + desiredLocation;

        /////////////////////////////////////
        // Api 
        var apiUrl = "https://data.tmsapi.com/v1.1/movies/showings?" + startDate + zip + radius + units + "&api_key=hs2hujn89q6qvq5bp8d9mnxg";
        console.log(apiUrl);

        // Data Request
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);


                        //////////////////////
                        // Unique Theater List Array
                        ////////////////////////////////////////
                        var theaters = [];
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].showtimes[i] !== undefined) {
                                theaters.push(data[i].showtimes[i].theatre.name);
                            };
                        };

                        // Filter Duplicate theater names 
                        /////////////////////////////////
                        var uniquetheaters = theaters.filter(function (i, index) {
                            return theaters.indexOf(i) === index;
                        });

                        /////////////////////////
                        // Print To Screen
                        //////////////////
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

                        //////////////////////////////
                        // Movie Selection Based on Theater Choice
                        /////////////////////////////
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
                            ///////////////////
                            //Filter
                            ///////////////////
                            var uniquemovies = movies.filter(function (i, index) {
                                return movies.indexOf(i) === index;
                            });


                            var movieContainer = document.getElementById("movieBoard");
                            var movieEl = document.getElementById("moviePoster");

                            var elements = document.getElementsByClassName("clone");
                            while (elements.length > 0) elements[0].remove();

                            for (var i = 1; i < uniquemovies.length; i++) {
                                // var runTime = uniquemovies[i].runTime;

                                var clone = $(movieEl).clone().addClass("clone hello" + i).appendTo(movieContainer);
                                $(".hello" + i + "> section.col.s8 > div > div > h3").text(uniquemovies[i].title)
                                $(".hello" + i + "> section.col.s8 > div > div > h3").addClass("title");
                                $(".hello" + i + "> section.col.s8 > div > div > h4").text(uniquemovies[i].genres);
                                $(".hello" + i + "> section.col.s8 > div > div > p").text(uniquemovies[i].shortDescription);
                                $(".hello" + i + "> section.col.s8 > div > div > h5 ").text(uniquemovies[i].runTime);
                                $(".hello" + i + " > section.col.s8 > div > div > button").addClass("movie" + i);
                                console.log(typeof (uniquemovies[i].title));
                                if (uniquemovies[i].title == "Tenet") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "/assets/images/tenet.jpg");
                                };
                                // $(".hello" + 2 + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "/assets/images/freaky.jpg");
                                // $(".hello" + 3 + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "/assets/images/comeplay.jpg");



                                console.log(uniquemovies[i]);

                                // Poster Image Api 

                                // var movieUrl = uniquemovies[i].title.split(" ").join("+");
                                // var imgApi = "https://api.themoviedb.org/3/search/movie?api_key=ff1a39513c89e4f235c5038be3d731a4&query=" + movieUrl;
                                // // var posterlink = [];

                                // fetch(imgApi)
                                //     .then(function (response) {
                                //         if (response.ok) {
                                //             response.json().then(function (posterData) {

                                //                 var posterpath = posterData.results[0].poster_path;

                                //                 var posterlink = ("https://image.tmdb.org/t/p/w342" + posterpath);

                                //                 return posterlink;

                                //             });
                                //         } else {
                                //             // alert('Error: ' + response.statusText);
                                //         }
                                //     })
                                //     .catch(function (error) {
                                //         alert('Unable to connect to Theater API');
                                //     });
                                posterlink = localStorage.getItem("Poster:");
                                $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", posterlink);
                                if (uniquemovies[i].title == "Tenet") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "assets/images/tenet.jpg");
                                };
                                if (uniquemovies[i].title == "Freaky") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "assets/images/freaky.jpg");
                                };
                                if (uniquemovies[i].title == "Come Play") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "assets/images/comeplay.jpg");
                                };
                                if (uniquemovies[i].title == "Vanguard") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "assets/images/vanguard.jpg");
                                };
                                if (uniquemovies[i].title == "Let Him Go") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "assets/images/lethimgo.jpg");
                                };
                                if (uniquemovies[i].title == "Guardians of the Galaxy") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "assets/images/gotg.jpg");
                                };
                                if (uniquemovies[i].title == "The Climb") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "assets/images/theclimb.jpg");
                                };
                                if (uniquemovies[i].title == "Mank") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "assets/images/Mank.png");
                                };
                                if (uniquemovies[i].title == "Buddy Games") {
                                    $(".hello" + i + "> section.col.s4 > div.material-placeholder > img.materialboxed.z-depth-4.img").attr("src", "assets/images/BuddyGames.jpg");
                                };
                            };

                            // Save Chosen Movie to Local Storage
                            // 
                            $('.moviebtn').click(function (e) {

                                if (uniquemovies)
                                    $('.collapsible').collapsible('close', 1);
                                var chosenMovie = $(e.target).siblings("h3").text();
                                localStorage.setItem("Movie:", chosenMovie);
                                showTimes(chosenMovie, uniquemovies, theaterChoice);
                            });




                            function showTimes(chosenMovie, uniquemovies, theaterChoice) {
                                var dateTimes = []
                                for (var i = 0; i < uniquemovies.length; i++) {
                                    if (chosenMovie === uniquemovies[i].title) {

                                        if (uniquemovies[i].showtimes.length) {
                                            for (var j = 0; j < uniquemovies[i].showtimes.length; j++) {

                                                var theaterList = uniquemovies[i].showtimes[j];
                                                if (theaterList.theatre.name === theaterChoice) {
                                                    dateTimes.push(uniquemovies[i].showtimes[j].dateTime);
                                                };
                                            };
                                        }
                                        else {
                                            alert("No showtimes for this showing on this date")
                                        };

                                    }
                                };
                                console.log(dateTimes);


                                // initialize
                                $('.materialSelect').formSelect();

                                // setup listener for custom event to re-initialize on change
                                $('.materialSelect').on('contentChanged', function () {
                                    $(this).formSelect();
                                });




                                // add new value
                                for (var i = 0; i < dateTimes.length; i++) {
                                    var newValue = dateTimes[i];

                                    var $newOpt = $("<option>").addClass("option").text(newValue);
                                    $("#myDropdown").append($newOpt);
                                };
                                // fire custom event anytime you've updated select
                                $("#myDropdown").trigger('contentChanged');




                                $("#myDropdown").change(function (e) {
                                    var chosenShowTime = ($('select#myDropdown').val());
                                    localStorage.setItem("Showtime:", chosenShowTime);
                                });



                                var movie = localStorage.getItem("Movie:");
                                var theater = localStorage.getItem("Theater:");
                                var showtimes = localStorage.getItem("Showtime:");

                                $("#movie").text("Movie:" + '\xa0\xa0' + movie);
                                $("#theater").text("Theater:" + '\xa0\xa0' + theater);
                                $("#movie").text("Movie:" + '\xa0\xa0' + showtimes);


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



    



});







