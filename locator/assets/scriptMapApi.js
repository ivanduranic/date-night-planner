
$(document).ready(function () {




    // Fetch theater data based on user location
    var uniquetheaters;
    var getTheaterData = function () {
        // Api components

        // Start Date
        var startDate = "startDate=2020-11-14";
        // Radius and units of measurement mi=miles km=kilometers
        var radius = "&radius=20";
        var units = "&units=mi";
        // Longitude & Lagitude
        var lat = "&lat=40.116630";
        var lng = "&lng=-75.072852";

        /////////////////////////////////////
        // Api 
        var apiUrl = "https:data.tmsapi.com/v1.1/movies/showings?" + startDate + lat + lng + radius + units + "&api_key=pmnxpwkh9u33qf3b9crf2jab";
        console.log(apiUrl);
        
        // Data Request
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);

                        ///////////////////////////
                        // Unique Theater List Array
                        var theaters = [];
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].showtimes[i] !== undefined) {
                                theaters.push(data[i].showtimes[i].theatre.name);
                            };
                        };

                        // Filter Duplicate theater names (data is ordered movie's>higher order>theater)
                        uniquetheaters = theaters.filter(function (i, index) {
                            return theaters.indexOf(i) === index;
                        });
                        //////////
                        // Print To Screen
                        console.log(uniquetheaters);
                        return uniquetheaters;
                    });
                };
            });
    };
    getTheaterData();
   

    


    // This will let you use the .remove() function later on
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF6cmluIiwiYSI6ImNraGZia2txaDA2bDQyeG5tcnJuZ3VkMmUifQ.NUtgOZA8RiGDsB0evehxUg';
    /**
     * Add the map to the page
    */
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-77.034084142948, 38.909671288923],
        zoom: 13,
        scrollZoom: false
    });



    var stores = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -77.034084142948,
                        38.909671288923
                    ]
                },
                "properties": {
                    "phoneFormatted": "(202) 234-7336",
                    "phone": "2022347336",
                    "address": "1471 P St NW",
                    "city": "Washington DC",
                    "country": "United States",
                    "crossStreet": "at 15th St NW",
                    "postalCode": "20005",
                    "state": "D.C."
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -77.049766,
                        38.900772
                    ]
                },
                "properties": {
                    "phoneFormatted": "(202) 507-8357",
                    "phone": "2025078357",
                    "address": "2221 I St NW",
                    "city": "Washington DC",
                    "country": "United States",
                    "crossStreet": "at 22nd St NW",
                    "postalCode": "20037",
                    "state": "D.C."
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -77.043929,
                        38.910525
                    ]
                },
                "properties": {
                    "phoneFormatted": "(202) 387-9338",
                    "phone": "2023879338",
                    "address": "1512 Connecticut Ave NW",
                    "city": "Washington DC",
                    "country": "United States",
                    "crossStreet": "at Dupont Circle",
                    "postalCode": "20036",
                    "state": "D.C."
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -77.0672,
                        38.90516896
                    ]
                },
                "properties": {
                    "phoneFormatted": "(202) 337-9338",
                    "phone": "2023379338",
                    "address": "3333 M St NW",
                    "city": "Washington DC",
                    "country": "United States",
                    "crossStreet": "at 34th St NW",
                    "postalCode": "20007",
                    "state": "D.C."
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -77.002583742142,
                        38.887041080933
                    ]
                },
                "properties": {
                    "phoneFormatted": "(202) 547-9338",
                    "phone": "2025479338",
                    "address": "221 Pennsylvania Ave SE",
                    "city": "Washington DC",
                    "country": "United States",
                    "crossStreet": "btwn 2nd & 3rd Sts. SE",
                    "postalCode": "20003",
                    "state": "D.C."
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -76.933492720127,
                        38.99225245786
                    ]
                },
                "properties": {
                    "address": "8204 Baltimore Ave",
                    "city": "College Park",
                    "country": "United States",
                    "postalCode": "20740",
                    "state": "MD"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -77.097083330154,
                        38.980979
                    ]
                },
                "properties": {
                    "phoneFormatted": "(301) 654-7336",
                    "phone": "3016547336",
                    "address": "4831 Bethesda Ave",
                    "cc": "US",
                    "city": "Bethesda",
                    "country": "United States",
                    "postalCode": "20814",
                    "state": "MD"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -77.359425054188,
                        38.958058116661
                    ]
                },
                "properties": {
                    "phoneFormatted": "(571) 203-0082",
                    "phone": "5712030082",
                    "address": "11935 Democracy Dr",
                    "city": "Reston",
                    "country": "United States",
                    "crossStreet": "btw Explorer & Library",
                    "postalCode": "20190",
                    "state": "VA"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -77.10853099823,
                        38.880100922392
                    ]
                },
                "properties": {
                    "phoneFormatted": "(703) 522-2016",
                    "phone": "7035222016",
                    "address": "4075 Wilson Blvd",
                    "city": "Arlington",
                    "country": "United States",
                    "crossStreet": "at N Randolph St.",
                    "postalCode": "22203",
                    "state": "VA"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -75.28784,
                        40.008008
                    ]
                },
                "properties": {
                    "phoneFormatted": "(610) 642-9400",
                    "phone": "6106429400",
                    "address": "68 Coulter Ave",
                    "city": "Ardmore",
                    "country": "United States",
                    "postalCode": "19003",
                    "state": "PA"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -75.20121216774,
                        39.954030175164
                    ]
                },
                "properties": {
                    "phoneFormatted": "(215) 386-1365",
                    "phone": "2153861365",
                    "address": "3925 Walnut St",
                    "city": "Philadelphia",
                    "country": "United States",
                    "postalCode": "19104",
                    "state": "PA"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -77.043959498405,
                        38.903883387232
                    ]
                },
                "properties": {
                    "phoneFormatted": "(202) 331-3355",
                    "phone": "2023313355",
                    "address": "1901 L St. NW",
                    "city": "Washington DC",
                    "country": "United States",
                    "crossStreet": "at 19th St",
                    "postalCode": "20036",
                    "state": "D.C."
                }
            }
        ]
    };

    /**
     * Assign a unique id to each store. You'll use this `id`
     * later to associate each point on the map with a listing
     * in the sidebar.
    */
    stores.features.forEach(function (store, i) {
        store.properties.id = i;
    });

    /**
     * Wait until the map loads to make changes to the map.
    */
    map.on('load', function (e) {
        /**
         * This is where your '.addLayer()' used to be, instead
         * add only the source without styling a layer
        */
        map.addSource("places", {
            "type": "geojson",
            "data": stores
        });

        /**
         * Add all the things to the page:
         * - The location listings on the side of the page
         * - The markers onto the map
        */
        buildLocationList(stores);
        addMarkers();
    });

    /**
     * Add a marker to the map for every store listing.
    **/
    function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        stores.features.forEach(function (marker) {
            /* Create a div element for the marker. */
            var el = document.createElement('div');
            /* Assign a unique `id` to the marker. */
            el.id = "marker-" + marker.properties.id;
            /* Assign the `marker` class to each marker for styling. */
            el.className = 'marker';

            /**
             * Create a marker using the div element
             * defined above and add it to the map.
            **/
            new mapboxgl.Marker(el, { offset: [0, -23] })
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);

            /**
             * Listen to the element and when it is clicked, do three things:
             * 1. Fly to the point
             * 2. Close all other popups and display popup for clicked store
             * 3. Highlight listing in sidebar (and remove highlight for all other listings)
            **/
            el.addEventListener('click', function (e) {
                /* Fly to the point */
                flyToStore(marker);
                /* Close all other popups and display popup for clicked store */
                createPopUp(marker);
                /* Highlight listing in sidebar */
                var activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                var listing = document.getElementById('listing-' + marker.properties.id);
                listing.classList.add('active');
            });
        });
    }

    /**
     * Add a listing for each store to the sidebar.
    **/
    function buildLocationList(data) {
        data.features.forEach(function (store, i) {
            /**
             * Create a shortcut for `store.properties`,
             * which will be used several times below.
            **/
            var prop = store.properties;

            /* Add a new listing section to the sidebar. */
            var listings = document.getElementById('listings');
            var listing = listings.appendChild(document.createElement('div'));
            /* Assign a unique `id` to the listing. */
            listing.id = "listing-" + prop.id;
            /* Assign the `item` class to each listing for styling. */
            listing.className = 'item';

            /* Add the link to the individual listing created above. */
            var link = listing.appendChild(document.createElement('a'));
            link.href = '#';
            link.className = 'title';
            link.id = "link-" + prop.id;
            link.innerHTML = prop.address;

            /* Add details to the individual listing. */
            var details = listing.appendChild(document.createElement('div'));
            details.innerHTML = prop.city;
            if (prop.phone) {
                details.innerHTML += ' · ' + prop.phoneFormatted;
            }

            /**
             * Listen to the element and when it is clicked, do four things:
             * 1. Update the `currentFeature` to the store associated with the clicked link
             * 2. Fly to the point
             * 3. Close all other popups and display popup for clicked store
             * 4. Highlight listing in sidebar (and remove highlight for all other listings)
            **/
            link.addEventListener('click', function (e) {
                for (var i = 0; i < data.features.length; i++) {
                    if (this.id === "link-" + data.features[i].properties.id) {
                        var clickedListing = data.features[i];
                        flyToStore(clickedListing);
                        createPopUp(clickedListing);
                    }
                }
                var activeItem = document.getElementsByClassName('active');
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                this.parentNode.classList.add('active');
            });
        });
    }

    /**
     * Use Mapbox GL JS's `flyTo` to move the camera smoothly
     * a given center point.
    **/
    function flyToStore(currentFeature) {
        map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
        });
    }

    /**
     * Create a Mapbox GL JS `Popup`.
    **/
    function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        var popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML('<h3>Sweetgreen</h3>' +
                '<h4>' + currentFeature.properties.address + '</h4>')
            .addTo(map);
    }

});