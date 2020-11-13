

function mapIt() {
	var startPoint = sessionStorage.getItem("postalCode"); //user location
  var destination = sessionStorage.getItem("yAddress");    //theatre location
  var city = sessionStorage.getItem("city");               //get city location        

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZGF6cmluIiwiYSI6ImNraGZibnRyZjA2aG0ycmw0OTlid2dzMWMifQ.c_2k33rh7-VmXsF2PbFbWg"; 
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