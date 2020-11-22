$(document).ready(function () {

    var movie = localStorage.getItem("Movie:");
    var theater = localStorage.getItem("Theater:");
    var showtimes = localStorage.getItem("Showtime:");

    $("#movie").text("Movie: " +'\xa0' + movie);
    $("#theater").text("Theater:" +'\xa0\xa0' + theater);
    $("#showTime").text("Movie:" +'\xa0\xa0' + showtimes);

});
