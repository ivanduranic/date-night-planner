var config = {
  apiKey: "AIzaSyDMZw6o6gX-PQ0xKe9Ez2lcEqNBV7mVDYM",
  authDomain: "project-1-93527.firebaseapp.com",
  databaseURL: "https://project-1-93527.firebaseio.com",
  projectId: "project-1-93527",
  storageBucket: "project-1-93527.appspot.com",
  messagingSenderId: "946238864249",
  appId: "1:946238864249:web:7f317c2cb92915072a8da8",
  measurementId: "G-TX4T77L3T1"
};
firebase.initializeApp(config);
var database = firebase.database();
var user = firebase.auth().currentUser;
console.log(user);

//===============================================================================================================
// sign up new user
$(document).on("click", "#signUp", function(e) {
  e.preventDefault();
  var data = {
    email: $("#registerEmail").val(), //get the email from Form
    password: $("#registerPassword").val() //get the pass from Form
  };
  firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(function(user) {
      $("#signUpSuccess").html(`
			<p>You are now signed up!</p>
			`);
      console.log("Successfully created user account with uid:", user.uid);
      $("#errorFrame").hide();
      $("#registerEmail").val("");
      $("#registerPassword").val("");
      $("#noBtn").hide();
      $("#signUp").hide();
      var done;
      done = sessionStorage.getItem("done");
      if (done === "done") {
        var user = firebase.auth().currentUser;
        database.ref("users/" + user.uid).push({
          event: sessionStorage.getItem("event"),
          time: sessionStorage.getItem("time"),
          date: sessionStorage.getItem("date"),
          link: sessionStorage.getItem("link"),
          food: sessionStorage.getItem("yName"),
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      }
    })
    .catch(function(error) {
      console.log("Error creating user:", error);
      $("#errorFrame").html(`
			<p>An error has occured, "${error.message}"</p>
			`);
    });
});
//===================================================================================================================
//login if already a user
//===========================================================
$(document).on("click", "#login", function(e) {
  e.preventDefault();
  var data = {
    email: $("#loginEmail").val(),
    password: $("#loginPassword").val()
  };
  firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(function() {
      $("#loginSuccess").html(`
				<p>You have logged in</p>
				`);
      $("#loginFail").hide();
      $("#loginEmail").val("");
      $("#loginPassword").val("");
      $("#login").hide();
      var done;
      done = sessionStorage.getItem("done");
      if (done === "done") {
        var user = firebase.auth().currentUser;
        database.ref("users/" + user.uid).push({
          event: sessionStorage.getItem("event"),
          time: sessionStorage.getItem("time"),
          date: sessionStorage.getItem("date"),
          link: sessionStorage.getItem("link"),
          food: sessionStorage.getItem("yName"),
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      }
    })
    .catch(function(err) {
      console.error(err);
      $("#loginFail").html(`
				<p>An error has occured, "${err.message}"</p>
				`);
    });
});
//===========================================================
//================================
//sign out
$(document).on("click", "#logOutBtn", function(e) {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("sign out successful");
      $("#logOutSuccess").text("You have been signed out");
    })
    .catch(function(error) {
      console.log("an error occured:", error);
    });
});
//================================
// show appropriate buttons based on if user is logged in or not
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("a user is signed in");
    $("#signUpBtn").hide();
    $("#logInBtn").hide();
    $("#logOutBtn").show();
    $("#eventBtn").show();
  } else {
    console.log("no user is signed in");
    $("#signUpBtn").show();
    $("#logInBtn").show();
    $("#logOutBtn").hide();
    $("#eventBtn").hide();
  }
});

//===================================================================

var date = moment().format("YYYY-MM-DD");
var end = moment()
  .add(14, "days")
  .format("YYYY-MM-DD");
console.log(end);
var count = 0;
var page = 0;
var miles;
var address;
var dollarSign;
var food;
var yPageCount = 1;
$("#results").html("");

//Makes the window load to the top of the page when you refresh it.
$(document).ready(function() {
  window.scrollTo(0, 0);
});

//Makes it so clicking Enter on the Yelp page doesn't refresh the page and start over.
$(function() {
  $("form").submit(function() {
    return false;
  });
});

//Searches for theatre Results (uses ticketmaster for the time being)
$(document).on("click", "#add-params", function() {
  $("#home-Submit").html(`
	<div class='col-md-5'></div>
    <div class="col-md-2" id="user-login-interface">
      <button type="button" class="btn btn-primary btn-lg" id="add-params">Submit</button>
    </div>
  <div class='col-md-5'></div>
	`);
  city = $("#city-input").val();
  sessionStorage.setItem("city", city);
  miles = $("#miles-input").val();
  state = $("#select-state option:selected").attr("value");
  var category = "";
  category = $("#search-input").val();
  var keyword = "";
  if (category !== "") {
    keyword = `&keyword=${category}`;
  }
  sessionStorage.setItem("state", state);
  console.log(state);
  // "https:data.tmsapi.com/v1.1/movies/showings?" + startDate + lat + lng + radius + units + "&api_key=hs2hujn89q6qvq5bp8d9mnxg" -> Mike's API url
  var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&stateCode=${state}&startDateTime=${date}T14:00:00Z&endDateTime=${end}T14:00:00Z&radius=${miles}&unit=miles&size=10&page=${page}${keyword}&apikey=VVhqdJgL8bOLqDeCOvQzEaDiHBKw5xvC`;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(
      "#instructions"
    ).html(`<p>Browse the list of events over the next 2 weeks below and click the "Select" button next to your choice.</p>
    <p>You can click the "Link to Details" to view in TicketMaster more details on it.</p>`);
    $("#options").html(``);
    $("#options").append(response._embedded.events.map(show));
    $("#next").html(makePages(response.page.totalPages));
    $(document).scrollTop(400);
    count = 0;
  });
});

//Creates the pages buttons at the bottom of the Ticket Master results.
function makePages(p) {
  var pages = [];
  for (var i = 0; i < p; i++) {
    pages.push(`<span class="page" data-page="${i}"> ${i + 1}</span>`);
  }
  pages = "Pages:  " + pages.join();
  return pages;
}

//Shows a new page when a page is clicked at the bottom of the Ticket Master results.
$(document).on("click", ".page", function() {
  page = $(this).attr("data-page");
  console.log(this);
  $("#options").html("");
  var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&stateCode=${state}&startDateTime=${date}T14:00:00Z&endDateTime=${end}T14:00:00Z&radius=${miles}&unit=miles&size=10&page=${page}&apikey=VVhqdJgL8bOLqDeCOvQzEaDiHBKw5xvC`;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(
      "#instructions"
    ).html(`<p>Browse the list of events over the next 2 weeks below and click the "Select" button next to your choice.</p>
      <p>You can click the "Link to Details" to view in TicketMaster more details on it.</p>`);
    $("#options").append(response._embedded.events.map(show));
    $(document).scrollTop(400);
    count = 0;
  });
});

//Saves the info from the chosen Ticket Master option and displays the Yelp search.
$(document).on("click", ".select", function() {
  $(document).scrollTop(0);
  sessionStorage.setItem("event", $(this).attr("event"));
  sessionStorage.setItem("time", $(this).attr("time"));
  sessionStorage.setItem("date", $(this).attr("date"));
  sessionStorage.setItem("link", $(this).attr("link"));
  sessionStorage.setItem("tmAddress", $(this).attr("address"));
  $("#home-Submit").html(``);
  $("#options").html(``);
  $("#instructions").html(``);
  $("#next").html(``);
  $("#find").html(`
    <th>
                <div class="form-group">
                    <label for="name-input">Food Type</label>
                    <input class="form-control" id="food-input" type="text">
                </div>
            </th>
            <th id=dollar-data class=rounded-pill>
            $: <input type="checkbox" name="price" class="myCheck"  value="1">
            $$: <input type="checkbox" name="price2" class="myCheck"  value="2">
            $$$: <input type="checkbox" name="price3" class="myCheck"  value="3">
            $$$$: <input type="checkbox" name="price4" class="myCheck"  value="4">
           </th>
            <br>
            <th>
                <button type="button" class="btn btn-primary btn-lg" id="new-params">Submit</button>
            </th>
    `);
  $("#next").html("");
});

//Displays and formats the Ticket Master search results.
function show(r) {
  var i = count;
  var back = "";
  if (i === 0 || i % 2 === 0) {
    back = "dark";
  } else {
    back = "light";
  }
  address =
    r._embedded.venues[0].address.line1 +
    ", " +
    r._embedded.venues[0].city.name +
    ", " +
    r._embedded.venues[0].state.name;
  var time = moment(r.dates.start.localTime, "HH:mm").format("hh:mm a");
  count++;
  return `
  <div class="row eachResult ${back}">
    <div class="col-md-6 info">
      <div class="d-flex flex-column info">
        <div class="p-2"><p>Date: ${r.dates.start.localDate}</p></div>
        <div class="p-2"><h5>${r.name}</h5></div>
        <div class="p-2"><p>${address} ${time}</p></div>
        <div class="p-2"><a href="${
          r.url
        }" target="_blank">Link to Details</a></div>
      </div>   
    </div>
      <div class="col-md-2"></div>
      <div class="col-md-4">
        <div class="p-2"><img alt="Venue Image" src="${r.images[0].url}"/></div>
        <div class="p-2"><button type="button" class="btn btn-primary select" backColor="${back}" value="${i}" event="${
    r.name
  }" time="${time}" date="${r.dates.start.localDate}" link="${
    r.url
  }" address="${address}">select</button></div>
      </div>
    </div> 
  </div>
  `;
}

//Searches for the Yelp results using the parameters entered.
$(document).on("click", "#new-params", function() {
  food = $("#food-input").val();
  var city = sessionStorage.getItem("city");
  var dollars = $("input[name='price']:checked").val();
  var dollars2 = $("input[name='price2']:checked").val();
  var dollars3 = $("input[name='price3']:checked").val();
  var dollars4 = $("input[name='price4']:checked").val();
  dollarSign = isChecked(dollars, dollars2, dollars3, dollars4);

  function isChecked(dollars, dollars2, dollars3, dollars4) {
    var dollarSign = "";
    if (dollars !== undefined) {
      dollarSign = dollars;
    }
    if (dollars2 !== undefined) {
      if (dollarSign === "") {
        dollarSign = dollars2;
      } else {
        dollarSign = dollarSign + "," + dollars2;
      }
    }
    if (dollars3 !== undefined) {
      if (dollarSign === "") {
        dollarSign = dollars3;
      } else {
        dollarSign = dollarSign + "," + dollars3;
      }
    }
    if (dollars4 !== undefined) {
      if (dollarSign === "") {
        dollarSign = dollars4;
      } else {
        dollarSign = dollarSign + "," + dollars4;
      }
    }
    if (dollarSign === "") {
      return dollarSign;
    }
    dollarSign = "&price=" + dollarSign;
    return dollarSign;
  }

  var eventTime = sessionStorage.getItem("time");
  var isOpen = moment(eventTime, "hh:mm a")
    .subtract(3, "hours")
    .format("X");
  console.log(yPageCount);
  var newURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${food}&location=${city}${dollarSign}&limit=10&open_at=${isOpen}&offset=${yPageCount}`;

  $.ajax({
    url: newURL,
    headers: {
      Authorization:
        "Bearer 1CVYoXqsRViH_HtqoMSa7s5kkNBOA8qLuUeqLM2TAaekisIeSLsahjgzH7hcRCbXF7ltlBapaeEBqTm8ojpZB9xPcCuiyUzjMQw9NaxwlPrkF_QJZQgQiFmSsnu2XHYx"
    },
    method: "GET",
    dataType: "json",
    success: function(data) {
      console.log(data);
      $("#instructions")
        .html(`<p>Browse the list of restaurants in your area,</p>
          <p>and then select the one you want to go to.</p>`);
      $("#choices").html(``);
      $("#choices").append(data.businesses.map(display));
      $("#next").html(yelpPages(data));
      $(document).scrollTop(400);
    }
  });
});

//Creates pages at the bottom of the Yelp results to view more results.
function yelpPages(p) {
  var pages = [];

  count = p.total / 10;
  if (count > 10) {
    count = 10;
  }
  for (var i = 0; i < count; i++) {
    console.log(i * 10 + 1);
    pages.push(
      `<span class="yPage" data-page="${i * 10 + 1}"> ${i + 1}</span>`
    );
  }
  pages = "Pages:  " + pages.join();
  return pages;
}

//Goes to the page of Yelp results selected.
$(document).on("click", ".yPage", function() {
  var eventTime = sessionStorage.getItem("time");
  var isOpen = moment(eventTime, "hh:mm a")
    .subtract(3, "hours")
    .format("X");
  yPageCount = $(this).attr("data-page");
  var newURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${food}&location=${city}${dollarSign}&limit=10&open_at=${isOpen}&offset=${yPageCount}`;

  $.ajax({
    url: newURL,
    headers: {
      Authorization:
        "Bearer 1CVYoXqsRViH_HtqoMSa7s5kkNBOA8qLuUeqLM2TAaekisIeSLsahjgzH7hcRCbXF7ltlBapaeEBqTm8ojpZB9xPcCuiyUzjMQw9NaxwlPrkF_QJZQgQiFmSsnu2XHYx"
    },
    method: "GET",
    dataType: "json",
    success: function(data) {
      $("#instructions")
        .html(`<p>Browse the list of restaurants in your area,</p>
           <p>and then select the one you want to go to.</p>`);
      $("#choices").html(``);
      $("#choices").append(data.businesses.map(display));
      $(document).scrollTop(400);
    }
  });
});

//Displays and formats the Yelp search results.
function display(r) {
  var yAddress = r.location.display_address.join(" ");
  var i = count;
  var back = "";
  count++;
  if (i === 0 || i % 2 === 0) {
    back = "even";
  } else {
    back = "odd";
  }
  return `
  <div class="row yResults ${back}">
    <div class="col-md-6 left">
      <div class="d-flex flex-column">
        <div class="p-2"><h5>${r.name}  Price: ${r.price}</h5></div>
        <div class="p-2"> Phone Number: ${r.display_phone}</div>
        <div class="p-2"> Address: ${yAddress}</div>
        <div class="p-2"> <a href="${
          r.url
        }" target="_blank">Link to Details on Yelp</a> </div>
      </div> 
    </div> 
    <div class="col-md-2"></div>  
    <div class="col-md-4 right">
      <div class="p-2"><img alt="Venue Image" src="${r.image_url}"/></div>
      <div class="p-2"><button type="button" class="btn btn-primary newSelect" value="${i}" name="${
    r.name
  }" address="${yAddress}">select</button></div>
    </div>
  </div>  
		`;
}

//Displays your itinerary when you have selected your Yelp choice.
$(document).on("click", ".newSelect", function() {
  sessionStorage.setItem("done", "done");
  sessionStorage.setItem("yAddress", $(this).attr("address"));
  sessionStorage.setItem("yName", $(this).attr("name"));
  $(document).scrollTop(400);
  var user = firebase.auth().currentUser;
  $("#home-Submit").html(`
	<div class='col-md-5'></div>
    <div class="col-md-2" id="user-login-interface">
      <button type="button" class="btn btn-secondary btn-sm btn-block" data-toggle="modal" data-target="#signUpModal" id="signUpBtn">Sign up here!</button>
      <button type="button" class="btn btn-secondary btn-sm btn-block" data-toggle="modal" data-target="#loginModal" id="logInBtn">Log In</button>
      <button type="button" class="btn btn-secondary btn-sm btn-block" data-toggle="modal" data-target="#logOutModal" id=logOutBtn>Log Out</button>
    </div>
  <div class='col-md-5'></div>
	`);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("a user is signed in");
      $("#signUpBtn").hide();
      $("#logInBtn").hide();
      $("#logOutBtn").show();
			$("#eventBtn").show();
    } else {
      console.log("no user is signed in");
      $("#signUpBtn").show();
      $("#logInBtn").show();
      $("#logOutBtn").hide();
			$("#eventBtn").hide();
      $("#instructions")
        .html(`<p>If you log in you can view your itineraries anytime you revisit</p>
			<h4>Date Night Planner</h4>`);
    }
  });
  $("#options").html(``);
  $("#instructions").html(``);
  $("#find").html(``);
  $("#choices").html(``);
	$("#next").html(``);
	$("#restart").html(`<button type="button" class="btn btn-primary btn-lg" id="again">Try Again?</button>`);
  document.getElementById("results").style.backgroundColor =
    "rgba(66, 66, 66, .7)";
  $("#results").html(`
    <h2 >You are going to eat at ${$(this).attr("name")},</h2>
    <h2 >and then going to ${sessionStorage.getItem(
      "event"
    )} at ${sessionStorage.getItem("time")} on ${sessionStorage.getItem("date")}</h2>
    <a href="${sessionStorage.getItem(
      "link"
    )}" target="_blank">Purchase Tickets</a>
		`);
  var user = firebase.auth().currentUser;
  if (user) {
    database.ref("users/" + user.uid).push({
      event: sessionStorage.getItem("event"),
      time: sessionStorage.getItem("time"),
      date: sessionStorage.getItem("date"),
      link: sessionStorage.getItem("link"),
      food: sessionStorage.getItem("yName"),
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  }
  mapIt();
});

$(document).on("click", "#eventBtn", function() {
  var user = firebase.auth().currentUser;
  if (user) {
    var userRef = user.uid;
    database.ref(`users/${userRef}`).on(
      "value",
      function(snapshot) {
        var key = snapshot.key;
        var snap = snapshot.val();
        $("#yourEventFrame").html("");
        var userKeys = Object.keys(snap);
        userKeys.forEach(function(key) {
          $("#yourEventFrame").append(`
				<a href="${snap[key].link}" target="_blank"><h3>${snap[key].event}<h3></a>
				<h3>${snap[key].date} at ${snap[key].time}</h3>
				<h3>${snap[key].food}</h3>
				<div><i class="fas fa-trash" value="${key}"></i></div>
				<hr>
				`);
        });
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }
});
//clears the modal so it will not append multiple times
$(document).on("click", "#closeOne", "#closeTwo", function() {
  $("#yourEventFrame").empty();
});


$(document).on("click", ".fa-trash", function(){
	var user = firebase.auth().currentUser;
	var userRef = user.uid;
	var key = $(this).attr("value");
	database.ref("users/" + user.uid + "/" + key).remove();
	database.ref(`users/${userRef}`).on("value", function(snapshot){
		var snap = snapshot.val();
		var userKeys = Object.keys(snap);
		$("#yourEventFrame").html(``);
		userKeys.forEach(function(key) {
			$("#yourEventFrame").append(`
				<a href="${snap[key].link}" target="_blank"><h3>${snap[key].event}<h3></a>
				<h3>${snap[key].date} at ${snap[key].time}</h3>
				<h3>${snap[key].food}</h3>
				<i class="fas fa-trash" value="${key}"></i>
				<hr>
				`);
			});
	});
});

function mapIt() {
	var startPoint = sessionStorage.getItem("tmAddress");
  var destination = sessionStorage.getItem("yAddress");
  var city = sessionStorage.getItem("city");
  console.log("destination " + destination);
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZnJlZDFuIiwiYSI6ImNqdW5ibmkyMjBpMnc0MHBuZXlxc3dkcHgifQ.O_czpPEJoyLfkymB0dicCQ";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-97.73675, 30.28608],
    zoom: 13
  });
  map.on("load", function() {
    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      // UI controls
      controls: {
        inputs: true,
        instructions: false
      }
    });
    map.addControl(directions, "top-left");

    // Paramaters that pass starting point and Destination
    directions.setOrigin(startPoint);
    directions.setDestination(destination);
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
  });
}

//-------------Function that makes modal buttons on homepage responsive for small screens------------------
$(window).resize(function() {
  if ($(window).width() <= 600)
    $("#add-params")
      .addClass("btn-block", "btn-sm")
      .removeClass("btn-lg");
  else
    $("#add-params")
      .removeClass("btn-block", "btn-sm")
      .addClass("btn-lg");
});

//Refresh the page to try again.
$(document).on("click", "#again", function(){
	location.reload(true);
});
