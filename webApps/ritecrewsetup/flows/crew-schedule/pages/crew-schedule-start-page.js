define(['schedulerPro'], (schedulerPro) => {
    'use strict';
    //  const mapboxgl = window.mapboxgl;
     // const MapboxSearchBox = window.MapboxSearchBox;

    class PageModule {

        daysBetween(date1, date2) {
            const oneDay = 24 * 60 * 60 * 1000; // Hours * minutes * seconds * milliseconds
            const date1InMs = new Date(date1).getTime();
            const date2InMs = new Date(date2).getTime();
            const differenceInMs = Math.abs(date2InMs - date1InMs);
            return Math.round(differenceInMs / oneDay);
        }
        showSchedular() {

        }

        setDateFormate(eqpdate) {
            const date = new Date(eqpdate);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const day = String(date.getDate()).padStart(2, '0');
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        fetchDatesOnDrag(obj) {
            console.log('KKKK', obj);
            sessionStorage.setItem('parameters', JSON.stringify(obj));
            return obj;
        }

        alterResp(resp) {
            document.getElementById('main').innerHTML = "";
            let widgetId = Math.floor(Math.random() * 1000);
            document.getElementById('viewFlag').innerText = widgetId;

            //       document.getElementById('main').style.display = 'none';
            // document.getElementById('main').style.display = 'block';
            let uniqEquipment = [];
            let selectedCrewId = '';
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            let obj3 = {};
            let i = 0;
            // debugger;
            if (resp.length > 0) {
                resp.forEach((item, indx) => {
                    if (uniqEquipment.indexOf(item.equipment_number) == -1) {
                        uniqEquipment.push(item.equipment_number);
                        let start_date = item.equipment_start_date ? item.equipment_start_date.split('T')[0] : null;
                        let end_date = item.equipment_end_date ? item.equipment_end_date.split('T')[0] : null;


                        let obj1 = {
                            id: indx + 1,
                            name: item.equipment_number,
                            projectName: item.project_name,
                            taskName: item.task_name,
                            cost: item.cost_rate,
                            equipStartDate: start_date,
                            equipEndDate: end_date,
                            latitude: item.latitude,
                            longitude: item.longitude
                        };
                        arr1.push(obj1);
                    }
                    obj3.startDate = new Date(item.crew_start_date);
                    obj3.endDate = new Date(item.crew_end_date);
                });
                if (arr1) {
                    arr1.forEach((aritm, inx) => {
                        resp.forEach((item, indx) => {
                            if (aritm.name == item.equipment_number) {

                                let start_date;
                                let end_date;
                                let eventColor = '';
                                let taskname = '';
                                // if (item.type == 'occupied' || item.type == null) {
                                //   eventColor = '#0000FF';
                                //    start_date = item.equipment_start_date.split('T')[0];
                                //    end_date = item.equipment_end_date.split('T')[0];
                                //    //taskname = 'Occupied';
                                // }
                                // else if (item.type == 'maintenance') {
                                //   eventColor = '#A9A9A9';
                                //    start_date = item.maintenance_start_date.split('T')[0];
                                //   end_date = item.maintenance_end_date.split('T')[0];
                                //   //taskname = "Maintenance";
                                // }

                                if (item.type == 'Booked') {
                                    eventColor = '#0000FF';
                                    start_date = item.equipment_start_date ? item.equipment_start_date.split('T')[0] : null;
                                    end_date = item.equipment_end_date ? item.equipment_end_date.split('T')[0] : null;
                                } else if (item.type == 'maintenance') {
                                    eventColor = '#A9A9A9';
                                    start_date = item.equipment_start_date ? item.equipment_start_date.split('T')[0] : null;
                                    end_date = item.equipment_end_date ? item.equipment_end_date.split('T')[0] : null;
                                } else if (item.type == 'Reserved') {
                                    eventColor = '#FFA500';
                                    start_date = item.equipment_start_date ? item.equipment_start_date.split('T')[0] : null;
                                    end_date = item.equipment_end_date ? item.equipment_end_date.split('T')[0] : null;
                                } else if (item.type == 'Available') {
                                    eventColor = '#A9A9A9';
                                    start_date = item.equipment_start_date ? item.equipment_start_date.split('T')[0] : null;
                                    end_date = item.equipment_end_date ? item.equipment_end_date.split('T')[0] : null;
                                } else if (item.type == 'Mobilization') {
                                    eventColor = '#00FF00';
                                    start_date = item.equipment_start_date ? item.equipment_start_date.split('T')[0] : null;
                                    end_date = item.equipment_end_date ? item.equipment_end_date.split('T')[0] : null;
                                }
                                taskname = item.type;

                                // let obj2 = {
                                //   id: indx + 1,
                                //   resourceId: aritm.id,
                                //   name: taskname,
                                //   crewsetup_id: item.crewsetup_id,
                                //   projectName: item.project_number,
                                //   taskName: item.task_name,
                                //   shortAddress: item.city,
                                //   equipStartDate: start_date,
                                //   equipEndDate: end_date,
                                //   startDate: start_date,
                                //   duration: this.daysBetween(start_date, end_date) + 1,
                                //   preamble: "24h",
                                //   eventColor : eventColor,
                                //   postamble: "24h",
                                //   address: {
                                //     place_id: Math.floor(Math.random() * 1_000_000_000),
                                //     display_name: 'Brooklyn Bridge, Dover Street, Financial District, Manhattan Community Board 1, Manhattan, New York County, New York, 10038, United States of America',
                                //     lat: item.latitude ? parseFloat(item.latitude.split('° N')[0]) : 29.7601,
                                //     lon: item.longitude ? parseFloat(item.longitude.split('° W')[0]) : -95.3701
                                //   }
                                // };
                                let obj2 = {
                                    id: indx + 1,
                                    resourceId: aritm.id,
                                    name: taskname,
                                    crewsetup_id: item.crewsetup_id,
                                    projectName: item.project_name,
                                    taskName: item.task_name,
                                    shortAddress: item.city ? item.city : 'Houston',
                                    equipmentName: item.equipment_name,
                                    equipStartDate: start_date,
                                    lblStartDate: this.setDateFormate(start_date),
                                    lblEndDate: this.setDateFormate(end_date),
                                    cost: item.cost_rate,
                                    billRate: item.bill_rate,
                                    equipEndDate: end_date,
                                    startDate: start_date,
                                    duration: this.daysBetween(start_date, end_date) + 1,
                                    preamble: "24h",
                                    eventColor: eventColor,
                                    postamble: "24h",
                                    address: {
                                        place_id: Math.floor(Math.random() * 1_000_000_000),
                                        display_name: 'Brooklyn Bridge, Dover Street, Financial District, Manhattan Community Board 1, Manhattan, New York County, New York, 10038, United States of America',
                                        lat: item.latitude ? parseFloat(item.latitude.split('° N')[0]) : 29.7601,
                                        lon: item.longitude ? parseFloat(item.longitude.split('° W')[0]) : -95.3701
                                    }
                                };
                                arr2.push(obj2);
                            }

                        });
                    });

                }
                console.log(arr1);
                console.log(arr2);
                console.log(obj3);


                const DH = schedulerPro.DateHelper;
                const today = DH.clearTime(new Date());
                class Address extends schedulerPro.Model {

                    static get idField() {
                        return 'place_id';
                    }

                    static get fields() {
                        return ['display_name', 'lat', 'lon'];
                    }
                }
                // The identifier Mapbox uses for its places



                // A custom remote search field, querying OpenStreetMap for addresses.
                // class AddressSearchField extends schedulerPro.Combo {
                //   // Factoryable type name
                //   static type = 'addresssearchfield';

                //   static $name = 'AddressSearchField';

                //   static configurable = {
                //     clearWhenInputEmpty: true,
                //     clearable: true,
                //     displayField: 'display_name',
                //     // Setting the value field to null indicates we want the Combo to get/set address *records* as opposed to the
                //     // id of an address record.
                //     valueField: null,
                //     filterOnEnter: true,
                //     filterParamName: 'q',
                //     store: {
                //       modelClass: Address,
                //       readUrl: 'https://nominatim.openstreetmap.org/search',
                //       encodeFilterParams(filters) {
                //         return filters[0].value;
                //       },
                //       params: {
                //         format: 'json'
                //       },
                //       fetchOptions: {
                //         // Please see MDN for fetch options: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
                //         credentials: 'omit'
                //       }
                //     },
                //     // Addresses can be long
                //     pickerWidth: 450,
                //     validateFilter: false,
                //     listCls: 'address-results',
                //     // Custom list item template to show a map icon with lat + lon
                //     listItemTpl: address => `<i class="b-fa b-fa-map-marker-alt"></i>
                //         <div class="address-container">
                //             <span class="address-name">${address.display_name}</span>
                //             <span class="lat-long">${address.lat}°, ${address.lon}°</span>
                //         </div>
                //     `
                //   };
                // };

                // AddressSearchField.initClass();

                /* global mapboxgl */

                // NOTE: You must use your own Mapbox access token
                // mapboxgl.accessToken = '';
                /* global MapboxSearchBox */
                class MapPanel extends schedulerPro.Panel {
                    // Required to store class name for IdHelper and bryntum.query in IE11
                    static get type() {
                        return 'mappanel' + widgetId;
                    }

                    static get $name() {
                        return 'MapPanel';
                    }

                    static get configurable() {
                        return {
                            monitorResize: true,

                            // Some defaults of the initial map display
                            zoom: 11,
                            lat: 40.7128,
                            lon: -74.0060,
                            textContent: false,

                            // Toolbar buttons
                            tbar: [{
                                    type: 'widget',
                                    cls: 'widget-title',
                                    html: 'Map View',
                                    flex: 1
                                },
                                // {
                                //   type: 'buttonGroup',
                                //   ref: 'themeGroup',
                                //   toggleGroup: true,
                                //   items: ['Stockholm', 'Classic-Dark'].map(name => {
                                //     const isLight = name.toLowerCase() === 'stockholm',
                                //           themeIsLight = !schedulerPro.DomHelper.themeInfo.name.toLowerCase().match('dark');

                                //     return {
                                //       id: name.toLowerCase(),
                                //       text: isLight ? 'Light' : 'Dark',
                                //       pressed: isLight ? themeIsLight : !themeIsLight
                                //     };
                                //   }),
                                //   onAction({ source: button }) {
                                //     schedulerPro.DomHelper.setTheme(button.id);
                                //   }
                                // },
                                {
                                    type: 'buttongroup',
                                    items: [{
                                            icon: 'b-fa b-fa-plus',
                                            onClick: 'up.onZoomIn'
                                        },
                                        {
                                            icon: 'b-fa b-fa-minus',
                                            onClick: 'up.onZoomOut'
                                        }
                                    ]
                                }
                            ]
                        };
                    }




                    onZoomIn() {
                        this.map.zoomIn();
                    }

                    onZoomOut() {
                        this.map.zoomOut();
                    }

                    composeBody() {
                        const result = super.composeBody();

                        result.listeners = {
                            click: 'onMapClick',
                            delegate: '.mapboxgl-marker'
                        };

                        return result;
                    }

                    construct() {
                        const me = this;

                        super.construct(...arguments);

                        const mapContainerEl = me.contentElement;
                        // mapboxgl.accessToken = '';
                        // NOTE: You must use your own Mapbox access token
                        me.map = new mapboxgl.Map({
                            container: mapContainerEl,
                            style: 'mapbox://styles/mapbox/streets-v11',
                            center: [me.lon, me.lat],
                            zoom: me.zoom

                        });
                        // me.map.addControl(new mapboxgl.NavigationControl());


                        const search = new MapboxSearchBox();
                        search.accessToken = '';
                        me.map.addControl(search);


                        me.map.on('click', (e) => {
                            let coordinates = e.lngLat;
                            console.log('Coordinates:', coordinates);

                            // Call the reverse geocoding API
                            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${search.accessToken}`)
                                .then(response => response.json())
                                .then(data => {
                                    let placeName = data.features[0]?.place_name || "No address found";
                                    console.log('Address:', placeName);
                                    // alert(`Coordinates: ${coordinates.lat}, ${coordinates.lng}\nAddress: ${placeName}`);
                                })
                                .catch(err => console.error('Error with reverse geocoding:', err));
                        });
                        search.addEventListener('retrieve', (e) => {
                            const feature = e.detail.features;
                            console.log(feature); // geojson object representing the selected item
                        });


                        // First load the map and then set up our event listeners for store CRUD and time axis changes
                        me.map.on('load', async () => {
                            // Demo code editor destroys created Widgets on editing code
                            if (me.isDestroying) {
                                return;
                            }

                            mapContainerEl.classList.add('maploaded');

                            // await for the project commit to complete to have all data normalized before adding the markers
                            // otherwise the `this.timeAxis.isTimeSpanInAxis(eventRecord)` check may fail in the
                            // `addEventMarker()` method, because of the missing end date in the record
                            await me.eventStore.project.commitAsync();

                            me.onStoreChange({
                                action: 'dataset',
                                records: me.eventStore.records
                            });
                        });

                        me.eventStore.on('change', me.onStoreChange, me);
                        me.timeAxis.on('reconfigure', me.onTimeAxisReconfigure, me);

                        // Switch to dark maps for dark theme
                        schedulerPro.GlobalEvents.on({
                            theme: 'onThemeChange',
                            thisObj: me
                        });
                    }

                    setMapStyle() {
                        const isDark = schedulerPro.DomHelper.themeInfo.name.toLowerCase().includes('dark'),
                            mapStyle = isDark ? 'dark-v10' : 'streets-v11';

                        this.map.setStyle('mapbox://styles/mapbox/' + mapStyle);
                    }

                    // When data changes in the eventStore, update the map markers accordingly
                    async onStoreChange(event) {
                        // await for the project commit to complete to have all data normalized before adding the markers
                        await this.eventStore.project.commitAsync();

                        switch (event.action) {
                            case 'add':
                            case 'dataset':
                                if (event.action === 'dataset') {
                                    this.removeAllMarkers();
                                }
                                event.records.forEach(eventRecord => this.addEventMarker(eventRecord));
                                break;

                            case 'remove':
                                event.records.forEach(event => this.removeEventMarker(event));
                                break;

                            case 'update': {
                                const eventRecord = event.record;

                                this.removeEventMarker(eventRecord);
                                this.addEventMarker(eventRecord);

                                break;
                            }

                            case 'filter': {
                                const renderedMarkers = [];

                                this.eventStore.query(rec => rec.marker, true).forEach(eventRecord => {
                                    if (!event.records.includes(eventRecord)) {
                                        this.removeEventMarker(eventRecord);
                                    } else {
                                        renderedMarkers.push(eventRecord);
                                    }
                                });

                                event.records.forEach(eventRecord => {
                                    if (!renderedMarkers.includes(eventRecord)) {
                                        this.addEventMarker(eventRecord);
                                    }
                                });

                                break;
                            }
                        }
                    }

                    // Only show markers for events inside currently viewed time axis
                    onTimeAxisReconfigure({
                        source: timeAxis
                    }) {
                        this.eventStore.forEach(eventRecord => {
                            this.removeEventMarker(eventRecord);
                            this.addEventMarker(eventRecord);
                        });
                    }

                    // Puts a marker on the map, if it has lat/lon specified + the timespan intersects the time axis
                    addEventMarker(eventRecord) {
                        if (!eventRecord.address) return;

                        const {
                            lat,
                            lon
                        } = eventRecord.address;

                        if (lat && lon && this.timeAxis.isTimeSpanInAxis(eventRecord)) {
                            const color = eventRecord.eventColor || eventRecord.resource?.eventColor || '#f0f0f0',
                                marker = new mapboxgl.Marker({
                                    color
                                }).setLngLat([lon, lat]);

                            marker.getElement().id = eventRecord.id;

                            eventRecord.marker = marker;
                            marker.eventRecord = eventRecord;
                            marker.addTo(this.map);
                        }
                    }

                    removeEventMarker(eventRecord) {
                        const marker = eventRecord.marker;

                        if (marker) {
                            marker.popup && marker.popup.remove();
                            marker.popup = null;
                            marker.remove();
                        }
                        eventRecord.marker = null;
                    }

                    removeAllMarkers() {
                        this.eventStore.forEach(eventRecord => this.removeEventMarker(eventRecord));
                    }

                    scrollMarkerIntoView(eventRecord) {
                        const marker = eventRecord.marker;

                        this.map.easeTo({
                            center: marker.getLngLat()
                        });
                    }

                    showTooltip(eventRecord, centerAtMarker) {
                        const me = this,
                            marker = eventRecord.marker;

                        me.popup && me.popup.remove();

                        if (centerAtMarker) {
                            me.scrollMarkerIntoView(eventRecord);
                        }

                        const popup = me.popup = marker.popup = new mapboxgl.Popup({
                            offset: [0, -21]
                        });

                        popup.setLngLat(marker.getLngLat());
                        popup.setHTML(schedulerPro.StringHelper.xss`<span class="event-name">${eventRecord.name}</span><span class="location"><i class="b-fa b-fa-map-marker-alt"></i>${eventRecord.shortAddress}<span>`);
                        popup.addTo(me.map);
                    }

                    onMapClick({
                        target
                    }) {
                        const markerEl = target.closest('.mapboxgl-marker');

                        if (markerEl) {
                            const eventRecord = this.eventStore.getById(markerEl.id);

                            this.showTooltip(eventRecord);
                            this.trigger('markerclick', {
                                marker: eventRecord.marker,
                                eventRecord
                            });
                        }
                    }

                    onResize() {
                        // This widget was resized, so refresh the Mapbox map
                        this.map?.resize();
                    }

                    onThemeChange({
                        theme
                    }) {
                        const buttonIndex = theme.toLowerCase().match('dark') ? 1 : 0;

                        this.setMapStyle(theme);

                        this.tbar.widgetMap.themeGroup.items[buttonIndex].pressed = true;
                    }
                }
                // Register this widget type with its Factory


                class Schedule extends schedulerPro.SchedulerPro {
                    // Factoryable type name
                    static get type() {
                        return 'schedule' + widgetId;
                    }

                    static get $name() {
                        return 'Schedule';
                    }

                    construct() {
                        super.construct(...arguments);

                        this.widgetMap.dateField.value = this.startDate;

                    }

                    onPrevious() {
                        this.shiftPrevious();
                    }

                    onNext() {
                        this.shiftNext();
                    }

                    // Custom event renderer showing the task name + location icon with a shortened address text
                    eventRenderer({
                        eventRecord
                    }) {
                        return [{
                                tag: 'span',
                                className: 'event-name',
                                html: schedulerPro.StringHelper.encodeHtml(eventRecord.name)
                            },
                            {
                                tag: 'span',
                                className: 'location',
                                children: [
                                    eventRecord.shortAddress ? {
                                        tag: 'i',
                                        className: 'b-fa b-fa-map-marker-alt'
                                    } : null,
                                    eventRecord.shortAddress || '⠀'
                                ]
                            }
                        ];
                    }
                }


                //    if(document.getElementById('viewFlag').innerText == "TRUE"){
                //     MapPanel.initClass();
                //     Schedule.initClass();
                //     document.getElementById('viewFlag').innerText = "FALSE";
                //  }


                MapPanel.initClass();
                Schedule.initClass();
                document.getElementById('viewFlag').innerText = widgetId + 1;

                // Simple task class with an extra address field (which can be edited with the AddressSearchField)
                class Task extends schedulerPro.EventModel {
                    static get fields() {
                        return [{
                                name: 'address'
                            },
                            // in this demo, default duration for tasks will be 1 hour (instead of days)
                            {
                                name: 'duration',
                                defaultValue: 1
                            },
                            {
                                name: 'durationUnit',
                                defaultValue: 'h'
                            }
                        ];
                    }

                    get shortAddress() {
                        return (this.address?.display_name || '').split(',')[0];
                    }
                }

                const detectWebGL = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        document.body.appendChild(canvas);
                        const supported = Boolean(canvas.getContext('webgl'));
                        canvas.remove();
                        return supported;
                    } catch (e) {
                        return false;
                    }
                };

                let mapPanel;
                // This simple demo consists of two main classes, a schedule and a map. Open the 'lib' folder to see the application
                // classes used.
                const schedule = new schedulerPro.Scheduler({
                    ref: 'schedule',
                    insertFirst: 'main',
                    startDate: obj3.startDate,
                    endDate: obj3.endDate,
                    flex: 5,
                    rowHeight: 50,
                    barMargin: 5,
                    eventColor: null,
                    eventStyle: null,
                    features: {
                        filterBar: true,
                        eventEdit: false,
                        eventMenu: {
                            items: {
                                deleteEvent: false,
                                editEvent: false,
                                copyEvent: false,
                                cutEvent: false,
                                splitEvent: false
                            }
                        },
                        //  Start Date: ${data.eventRecord.data.lblStartDate}
                        //                                 <br><br>
                        //                                 End Date: ${data.eventRecord.data.lblEndDate}
                        //                                 <br><br>
                        eventTooltip: {

                            template: data => `Project: ${data.eventRecord.resource.projectName ? data.eventRecord.resource.projectName : 'Unassigned'}
                                        <br>
                                        Task: ${data.eventRecord.data.taskName ? data.eventRecord.data.taskName : 'Unassigned'}
                                         <br>
                                        Cost: ${data.eventRecord.data.cost ? data.eventRecord.data.cost : 'Unassigned'}
                                          <br>     
                                        Bill Rate: ${data.eventRecord.data.billRate ? data.eventRecord.data.billRate : 'Unassigned'}
                    `
                        }
                    },
                    columns: [{
                            type: 'resourceInfo',
                            text: 'Equipment Number',
                            width: 200,
                            showEventCount: false,
                            showRole: true

                        }

                    ],

                    // Custom view preset with header configuration
                    // viewPreset: 'weekAndDay',
                    viewPreset: {
                        base: 'dayAndMonth', // Base view preset
                        tickWidth: 25 // Decrease the cell width
                    },
                    resourceImagePath: 'resources/images/users/',

                    tbar: [{
                            type: 'widget',
                            cls: 'widget-title',
                            html: 'Schedule View',
                            flex: 1
                        },
                        // {
                        //   text: 'New Assign',
                        //   icon: 'b-fa b-fa-plus',
                        //   color: 'b-green b-raised',
                        //   onClick: ''
                        // },
                        {
                            type: 'datefield',
                            ref: 'dateField',
                            width: 190,
                            editable: false,
                            value: today,
                            step: 1,
                            onChange({
                                value,
                                userAction
                            }) {
                                schedule.scrollToDate(DH.set(value, 'hour', 12), {
                                    block: 'center',
                                    animate: 500
                                });
                            }



                        }
                        // {
                        //   type: 'textfield',
                        //   ref: 'filterByName',
                        //   placeholder: 'Filter tasks',
                        //   clearable: true,
                        //   keyStrokeChangeDelay: 100,
                        //   triggers: {
                        //     filter: {
                        //       align: 'start',
                        //       cls: 'b-fa b-fa-filter'
                        //     }
                        //   },

                        //   onChange({
                        //     value
                        //   }) {
                        //     value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                        //     // Replace all previous filters and set a new filter
                        //     schedule.eventStore.filter({
                        //       filters: event => event.name.match(new RegExp(value, 'i')),
                        //       replace: true
                        //     });
                        //   }


                        // }
                    ],
                    // Configure the Project with a path, and the Store or Model to use for the loaded data.

                    // resources: schJson.resources.rows,
                    //events: schJson.events.rows,
                    // viewPreset: 'weekAndDay',
                    // resourceImagePath: 'resources/images/users/',
                    project: {
                        resourcesData: arr1,
                        eventsData: arr2
                    },

                    listeners: {
                        eventClick: ({
                            eventRecord
                        }) => {
                            // When an event bar is clicked, bring the marker into view and show a tooltip
                            if (eventRecord.marker) {
                                //Navigate to New Assignment
                                // console.log("currentData",eventRecord.data.crewsetup_id);
                                // selectedCrewId = eventRecord.data.crewsetup_id;
                                //document.getElementById('oj-dialog-navigate').open();
                                // alert('navigation')
                                // document.getElementById('viewFlag').click();
                                mapPanel?.showTooltip(eventRecord, true);
                            }
                        },
                        cellClick: ({
                            record
                        }) => {
                            // alert('navigation')
                            // mapPanel?.showTooltip(eventRecord, true);
                            // When an event bar is clicked, bring the marker into view and show a tooltip

                            // mapPanel?.showTooltip(true);


                        },
                        eventDblClick: ({
                            eventRecord
                        }) => {
                            // debugger;
                            let dateObj = {};
                            dateObj.varStartDate = eventRecord.startDate;
                            dateObj.varEndDate = eventRecord.endDate;
                            dateObj.equpName = eventRecord.resource.data.name;
                            dateObj.cost = eventRecord.resource.data.cost;
                            dateObj.latitude = eventRecord.resource.data.latitude;
                            dateObj.longitude = eventRecord.resource.data.longitude;
                            console.log("KKKK", eventRecord.startDate, eventRecord.endDate);
                            this.fetchDatesOnDrag(dateObj);
                            document.getElementById('viewFlag').click();
                        },
                        cellDblClick: ({
                            record
                        }) => {
                            console.log(record);
                            document.getElementById('viewFlag').click();

                        },
                        afterDragCreate: ({
                            eventRecord
                        }) => {
                            console.log("AfterDrag", eventRecord.data);
                        },


                        afterEventSave: ({
                            eventRecord
                        }) => {
                            if (eventRecord.marker) {
                                mapPanel?.scrollMarkerIntoView(eventRecord);
                            }
                        }
                    }
                });

                // A draggable splitter between the two main widgets
                new schedulerPro.Splitter({
                    appendTo: 'main'
                });

                if (detectWebGL()) {
                    // A custom MapPanel wrapping the MapboxGL JS map. We provide it with the timeAxis and the eventStore
                    // So the map can show the same data as seen in the schedule
                    mapPanel = new MapPanel({
                        ref: 'map',
                        appendTo: 'main',
                        flex: 2,
                        eventStore: schedule.eventStore,
                        timeAxis: schedule.timeAxis,
                        listeners: {
                            // When a map marker is clicked, scroll the event bar into view and highlight it
                            markerclick: async ({
                                eventRecord
                            }) => {
                                await schedule.scrollEventIntoView(eventRecord, {
                                    animate: true,
                                    highlight: true
                                });
                                schedule.selectedEvents = [eventRecord];
                            }
                        }
                    });

                } else {
                    schedulerPro.Toast.show({
                        html: `ERROR! Can not show show maps. WebGL is not supported!`,
                        color: 'b-red',
                        style: 'color:white',
                        timeout: 0
                    });
                }

            }
        }


    }



    return PageModule;
});