$(document).ready(function () {

    var movie = localStorage.getItem("Movie:");
    var theater = localStorage.getItem("Theater:");
    var showtimes = localStorage.getItem("Showtime:");

    $("#movie").text("Movie:" + movie);
    $("#theater").text("Theater:" + theater);
    $("#showTime").text("Movie:" + showtimes);

});