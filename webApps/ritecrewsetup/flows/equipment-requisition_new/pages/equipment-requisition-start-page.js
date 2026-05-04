
define([], () => {
  'use strict';

  class PageModule {
    getDateDifference(startDate, endDate, cost, frequency) {
      // frequency includes Day, Week, Month
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end - start;
      // const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
      const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Round down
      return differenceInDays * (cost ? cost : 1);
    }


    marginFormula(billrate, costrate) {
      // Convert billrate and costrate to numbers
      billrate = Number(billrate);
      costrate = Number(costrate);

      // Check for valid billrate and costrate before proceeding with the calculation
      if (isNaN(billrate) || billrate <= 0) {
        return '0%';
      }

      if (costrate === 0 || isNaN(costrate)) {
        return 'N/A';
      }

      // Calculate margin
      let margin = ((billrate - costrate) / costrate) * 100;

      // Return margin as a rounded percentage string
      return `${(Math.round(margin * 100) / 100).toFixed(2)}%`;
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

    processFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const fileName = file.name;
          const fileType = file.type;
          resolve({
            fileName: fileName,
            fileType: fileType,
            fileContent: fileContent
          });
        };
        reader.onerror = function (error) {
          reject(error);
        };
      });
    }
    getDistanceBtwTwoLatitute(lat1, lon1, lat2, lon2) {
      if (lat1 && lon1 && lat2 && lon2) {
        const R = 6371;
        const toRad = (deg) => deg * (Math.PI / 180);
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const radLat1 = toRad(lat1);
        const radLat2 = toRad(lat2);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radLat1) * Math.cos(radLat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }
      else {
        return -1;
      }
    }
    formatDate(isoDate) {
      const date = new Date(isoDate);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = String(date.getDate()).padStart(2, '0');
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
    getPostPayload(data,user) {
      if (data) {
        let postObj = {
          "crew_id": data.crew_id,
          "crew_name": data.crewname,
          "equipment_id": data.equipment_id,
          "equipment_number": data.equipment_number,
          "equipment_name": data.equipment_name,
          "equipment_class": data.equipment_class,
          "equipment_type": data.equipment_type,
          "bill_rate": "",
          "project_id": data.project_id,
          "project_number": data.project_number,
          "project_name": data.project,
          "task_id": data.task_id,
          "task_number": data.task_number,
          "task_name": data.task,
          "utilization": data.utilization,
          "requestor_name": user,
          "created_by":user,
          "start_date": this.formatDate(data.startdate),
          "end_date":  this.formatDate(data.startdate),
          "efforts_per_day": data.totalEfforts,
          "rate_basis": "",
          "request_type": "",
          "customer_id": "",
          "customer": "",
          "customer_site": "",
          "customer_site_id": "",
          "location": data.location,
          "latitude":data.latitude,
          "longitude": data.longitude,
          "addressline1": data.addressline1,
          "addressline2": data.addressline2,
          "city": data.city,
          "country": data.country,
          "zipcode": data.zipcode,
          "file_content": "test",
          "file_name": "test.doc",
          "file_type": "doc",
          "equip_req_quantity": data.quantity,
          "eqp_request_number": ""
        };
        return postObj;
      }
    };

    

  }




  return PageModule;

});

