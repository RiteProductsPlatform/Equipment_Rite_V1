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

  class divClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.currindx = index;
      const locationDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#locationDialog',
        method: 'open',
      });
      document.getElementById('loc').innerText="";
      const callFunction = await this.showMap(context);
    }
    async showMap(context) {
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


           let placeName = "";
            let country = "";
            let postalCode = "";
             var city="";
            var address1=""; var address2="";
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

            if(isaddorplace){
            let locality = data.features[0].place_name.split(', '); 
            address1 = locality.slice(0, 2).join(', ') || locality[0] || "No address line 1";
            address2 = locality.slice(2).join(', ') || "No address line 2";
            let  district = data.features[0].context[4].text;            
            $variables.equpvariables.location=locality[0]?locality[0]:'';
            }
             $variables.equpvariables.longitude = coordinates.lng;
             $variables.equpvariables.latitude = coordinates.lat;
             $variables.equpvariables.addressline1 = address1;
             $variables.equpvariables.country = country;
             $variables.equpvariables.addressline2 =   address2;
             $variables.equpvariables.city = city;           
             $variables.equpvariables.zipcode=postalCode;
            document.getElementById('loc').innerText=locality;

            console.log('Address:', placeName);
            console.log(`Coordinates: ${coordinates.lat}, ${coordinates.lng}\nAddress: ${placeName}`);
          })
          .catch(err => console.error('Error with reverse geocoding:', err));



      });
    
    }
  }

  return divClickChain;
});
