

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
