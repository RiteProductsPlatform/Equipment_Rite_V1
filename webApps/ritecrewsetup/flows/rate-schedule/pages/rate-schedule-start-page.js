
define([], () => {
  'use strict';

  class PageModule {
    filterhourtype(mycurrentArray, myallarray, currentlabel) {
      let currentArray = JSON.parse(mycurrentArray);
      let allarray = JSON.parse(myallarray);
      let final = [];

      if (currentlabel) {
        // Find the object in allarray that matches currentlabel
        const matched = allarray.find(item => item.hrsType === currentlabel);
        if (matched) {
          final = currentArray;
          final.push(matched);
        }
      } else {
        if (currentArray.length > 0) {
          final = currentArray;
        } else {
          final = allarray;
        }
      }

      return final;
    }


    hourTyperemover(mycurrentArray, myallarray, currentlabel) {
      let currentArray = JSON.parse(mycurrentArray);
      let allarray = JSON.parse(myallarray);
      let final = [];

      if (currentlabel) {
        // Remove the object that matches currentlabel
        final = currentArray.filter(item => item.hrsType !== currentlabel);
      } else {
        // If no currentlabel is provided, just return the original array
        final = currentArray;
      }

      return final;
    }


    openDailog() {
      // mapboxgl.accessToken = '';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-73.99209, 40.68933],
        zoom: 8.8
      });
      const geocoder = new MapboxGeocoder();
      // geocoder.accessToken = '';
      geocoder.options = {
        proximity: [-73.99209, 40.68933]
      };
      geocoder.marker = true;
      geocoder.mapboxgl = mapboxgl;
      map.addControl(geocoder);
      map.on('click', (e) => {
        var coordinates = e.lngLat;
        // Call the reverse geocoding API
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`)
          .then(response => response.json())
          .then(data => {
            var placeName = data.features[0]?.place_name || "No address found";
            console.log('Address:', placeName);
            console.log(`Coordinates: ${coordinates.lat}, ${coordinates.lng}\nAddress: ${placeName}`);
          })
          .catch(err => console.error('Error with reverse geocoding:', err));
      });
    }



  }

  return PageModule;
});
