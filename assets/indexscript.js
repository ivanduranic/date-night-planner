$(document).ready(function () {
    localStorage.clear();
    var datepicker = $('.datepicker');
    var calenderBtn = $("#calendereBtn");

    var userLocation = $("#userLocation").on('click', getUserLocation());
    

    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(function(position) {
            if (position.coords) {
                localStorage.setItem("Geo Accuracy", position.coords.accuracy);
                localStorage.setItem("User Latitute", position.coords.latitude);
                localStorage.setItem("User Longitute", position.coords.longitude);
            } else {
                getUserLocation();
            }
        });
    }

    // Grabbing User Location Input 
    var calenderBtn = $("#locationBtn").on('click', function () {
        var desiredLocation = ($("#locationPicker").val());

        // Saving in local storage
        localStorage.setItem("Desired Location:", desiredLocation);

    });

    // Grabbing User Calender Input 
    var calenderBtn = $("#calendarBtn").on('click', function () {
        var desiredDate = ($("#datePicker").val());
        var desiredTime = ($("#timePicker").val());

        // Saving in local storage
        localStorage.setItem("Desired Date:", desiredDate);
        localStorage.setItem("Desired Time:", desiredTime);
    });


    // Grabbing User Range Input 
    var rangeBtn = $("#rangeBtn").on('click', function () {
        var desiredRange = ($("#rangePicker").val());

        // Saving in local storage
        localStorage.setItem("Desired Range:", desiredRange);
    });

});