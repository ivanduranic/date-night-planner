$(document).ready(function () {
    localStorage.clear();
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