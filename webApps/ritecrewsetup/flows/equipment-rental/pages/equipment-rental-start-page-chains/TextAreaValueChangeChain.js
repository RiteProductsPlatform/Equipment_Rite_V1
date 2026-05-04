define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils'
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class TextAreaValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const ojDialog12393698203Open = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--1239369820-3',
        method: 'open',
      });

      await this.opemapdialog(context);
    }


    /**
     * @param {Object} context
     */
    async opemapdialog(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

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


            var placeName = "";
            var country = "";
            var postalCode = "";
            var city = "";
            var address1 = ""; var address2 = "";
            var isaddorplace = false;
            if (data.features) {
              data.features.forEach((itm) => {
                if (itm.id.includes('postcode')) {
                  postalCode = itm.text;
                }
                if (itm.id.includes('region')) {
                  placeName = itm.text;
                }
                if (itm.id.includes('country')) {
                  country = itm.text;
                }
                if (itm.id.includes('place')) {
                  city = itm.text;
                  address2 = itm.place_name;
                }
                if (itm.id.includes('locality')) {
                  address1 = itm.place_name;
                }
                if (itm.id.includes('address')) {
                  isaddorplace = true;
                }
              })
            }

            if (isaddorplace) {
              var locality = data.features[0].place_name.split(', ');
              address1 = locality.slice(0, 2).join(', ') || locality[0] || "No address line 1";
              address2 = locality.slice(2).join(', ') || "No address line 2";
              var district = data.features[0].context[4].text;
            }

            $variables.locationDetails.p_zipcode = postalCode;
            $variables.locationDetails.location = placeName;
            $variables.locationDetails.p_longitude = coordinates.lng;
            $variables.locationDetails.p_latitude = coordinates.lat;
            $variables.locationDetails.p_addressline1 = address1;
            $variables.locationDetails.p_country = country;
            debugger;
            $variables.locationDetails.p_addressline2 = address2;
            $variables.locationDetails.p_city = city;
            $flow.variables.headerobj.location = $variables.locationDetails.p_city;
            console.log('Address:', placeName);
            console.log(`Coordinates: ${coordinates.lat}, ${coordinates.lng}\nAddress: ${placeName}`);
            if (coordinates.lat && coordinates.lng) {
              const getDistance = $page.functions.getDistanceBtwTwoLatitute($variables.equplatitude, $variables.equplongitude, coordinates.lat, coordinates.lng);
              if (getDistance == -1) {
                $variables.Distaince = "Selected Equipment does not have Latitude and Longitude";
              }
              else {
                $variables.Distaince = `Distance : ${getDistance.toFixed(2)} km  ${(getDistance * 0.621371).toFixed(2)} miles `;
              }
            }

          })
          .catch(err => console.error('Error with reverse geocoding:', err));



      });




    }

  }

  return TextAreaValueChangeChain;
});
