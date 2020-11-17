//* https://api.mapbox.com/{endpoint}?access_token={your_access_token}
//* https://api.mapbox.com/{f34q6vkgyfgvrjybjzngc87m}?access_token={pk.eyJ1IjoiZGF6cmluIiwiYSI6ImNraGZibnRyZjA2aG0ycmw0OTlid2dzMWMifQ.c_2k33rh7-VmXsF2PbFbWg}
//* Personal Mapbox API Key: pk.eyJ1IjoiZGF6cmluIiwiYSI6ImNraGZibnRyZjA2aG0ycmw0OTlid2dzMWMifQ.c_2k33rh7-VmXsF2PbFbWg
//* Default Mapbox API Key
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF6cmluIiwiYSI6ImNraGZia2txaDA2bDQyeG5tcnJuZ3VkMmUifQ.NUtgOZA8RiGDsB0evehxUg';

//* Stores a mapbox object within a variable called map
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11',
center: [-96, 37.8], // starting position
zoom: 3 // starting zoom
});
 
//* Add geolocate control to the map
map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
})
);


// This adds the map to your page

if ("geolocation" in navigator) { 
    navigator.geolocation.getCurrentPosition(position => { 
        var map = new mapboxgl.Map({
        // container id specified in the HTML
          container: 'map',

           // style URL
          style: 'mapbox://styles/mapbox/light-v10',

         // initial position in [lon, lat] format
          center: [position.coords.longitude, position.coords.latitude],

         // initial zoom

         zoom: 14
        });
    }); 
} else { /* geolocation IS NOT available, handle it */ }