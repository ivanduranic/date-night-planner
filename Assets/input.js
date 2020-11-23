$(document).ready(function () {
    // Index Page
    // ////////////////////////////////////////////////////////////////////////

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

    });

});