define([], () => {
  'use strict';

  class PageModule {

    alterResp(resp) {
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let obj1 = {};
        let obj2 = {
            address: {}
        };
        let obj3 = {};
        let i = 0;
        if (resp.length > 0) {
            resp.forEach(item => {
                let start_date = item.effective_start_date.split('T')[0];
                let end_date = item.effective_end_date.split('T')[0];
                // if(i===0){
                obj1.id = item.crewsetup_eqp_header_id;
                obj1.name = item.equipment_name;
                obj1.eventColor = "orange";
                obj1.projectName = item.project_number;
                obj1.taskName = item.task_name;
                i = 1;
                arr1.push(obj1);
                // }

                obj2.id = item.equipment_id;
                obj2.resourceId = item.crewsetup_eqp_header_id;
                obj2.name = item.equipment_name;
                obj2.shortAddress = 'New York County';
                obj2.startDate = item.effective_start_date.split('Z')[0];
                obj2.duration = this.daysBetween(start_date, end_date),
                obj2.address.place_id = Math.floor(Math.random() * 1_000_000_000);
                obj2.address.display_name = 'Brooklyn Bridge, Dover Street, Financial District, Manhattan Community Board 1, Manhattan, New York County, New York, 10038, United States of America';
                obj2.address.lat = 40.7061;
                obj2.address.lon = -73.9969;
                obj2.preamble = "24h";
                obj2.postamble = "24h";
                obj3.startDate = new Date(item.effective_start_date);
                obj3.endDate = new Date(item.effective_end_date);
                arr2.push(obj2);
                i = 1;

            });


            const DH = schedulerPro.DateHelper;
            const today = DH.clearTime(new Date());
            class Address extends schedulerPro.Model {
                static idField = 'place_id'; // The identifier Mapbox uses for its places
                static fields = [
                    'display_name',
                    'lat',
                    'lon'
                ];
            }

            // A custom remote search field, querying OpenStreetMap for addresses.
            class AddressSearchField extends schedulerPro.Combo {
                // Factoryable type name
                static type = 'addresssearchfield';

                static $name = 'AddressSearchField';

                static configurable = {
                    clearWhenInputEmpty: true,
                    clearable: true,
                    displayField: 'display_name',
                    // Setting the value field to null indicates we want the Combo to get/set address *records* as opposed to the
                    // id of an address record.
                    valueField: null,
                    filterOnEnter: true,
                    filterParamName: 'q',
                    store: {
                        modelClass: Address,
                        readUrl: 'https://nominatim.openstreetmap.org/search',
                        encodeFilterParams(filters) {
                            return filters[0].value;
                        },
                        params: {
                            format: 'json'
                        },
                        fetchOptions: {
                            // Please see MDN for fetch options: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
                            credentials: 'omit'
                        }
                    },
                    // Addresses can be long
                    pickerWidth: 450,
                    validateFilter: false,
                    listCls: 'address-results',
                    // Custom list item template to show a map icon with lat + lon
                    listItemTpl: address => `<i class="b-fa b-fa-map-marker-alt"></i>
              <div class="address-container">
                  <span class="address-name">${address.display_name}</span>
                  <span class="lat-long">${address.lat}°, ${address.lon}°</span>
              </div>
          `
                };
            };

            AddressSearchField.initClass();

            /* global mapboxgl */

            // NOTE: You must use your own Mapbox access token
            // mapboxgl.accessToken = '';

            // A simple class containing a MapboxGL JS map instance
            class MapPanel extends schedulerPro.Panel {
                // Factoryable type name
                static type = 'mappanel';

                // Required to store class name for IdHelper and bryntum.query in IE11
                static $name = 'MapPanel';

                static configurable = {
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
                        {
                            type: 'buttonGroup',
                            ref: 'themeGroup',
                            toggleGroup: true,
                            items: ['Stockholm', 'Classic-Dark'].map(name => {
                                const isLight = name.toLowerCase() === 'stockholm',
                                    themeIsLight = !schedulerPro.DomHelper.themeInfo.name.toLowerCase().match('dark');

                                return {
                                    id: name.toLowerCase(),
                                    text: isLight ? 'Light' : 'Dark',
                                    pressed: isLight ? themeIsLight : !themeIsLight
                                };
                            }),
                            onAction({
                                source: button
                            }) {
                                schedulerPro.DomHelper.setTheme(button.id);
                            }
                        },
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
                        var coordinates = e.lngLat;
                        console.log('Coordinates:', coordinates);

                        // Call the reverse geocoding API
                        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`)
                            .then(response => response.json())
                            .then(data => {
                                var placeName = data.features[0]?.place_name || "No address found";
                                console.log('Address:', placeName);
                                // alert(`Coordinates: ${coordinates.lat}, ${coordinates.lng}\nAddress: ${placeName}`);
                            })
                            .catch(err => console.error('Error with reverse geocoding:', err));
                    });
                    search.addEventListener('retrieve', (e) => {
                        const feature = e.detail.features;
                        console.log(feature) // geojson object representing the selected item
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
            };

            // Register this widget type with its Factory
            MapPanel.initClass();

            class Schedule extends schedulerPro.SchedulerPro {
                // Factoryable type name
                static get type() {
                    return 'schedule';
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
            };

            Schedule.initClass();

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
                rowHeight: 80,
                barMargin: 4,
                eventColor: null,
                eventStyle: null,
                features: {
                    filterBar: true,
                    cellMenu: false
                },
                columns: [{
                        type: 'resourceInfo',
                        text: 'Equipment Name',
                        width: 200,
                        showEventCount: false,
                        showRole: true
                    }

                ],

                // Custom view preset with header configuration
                viewPreset: 'weekAndDay',

                resourceImagePath: 'resources/images/users/',

                tbar: [{
                        type: 'widget',
                        cls: 'widget-title',
                        html: 'Schedule View',
                        flex: 1
                    },
                    {
                        text: 'New Assign',
                        icon: 'b-fa b-fa-plus',
                        color: 'b-green b-raised',
                        onClick: ''
                    },
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
                            userAction && schedule.setTimeSpan(schedulerPro.DateHelper.add(value, 8, 'hour'), schedulerPro.DateHelper.add(value, 20, 'hour'));
                        }



                    },
                    {
                        type: 'textfield',
                        ref: 'filterByName',
                        placeholder: 'Filter tasks',
                        clearable: true,
                        keyStrokeChangeDelay: 100,
                        triggers: {
                            filter: {
                                align: 'start',
                                cls: 'b-fa b-fa-filter'
                            }
                        },

                        onChange({
                            value
                        }) {
                            value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                            // Replace all previous filters and set a new filter
                            schedule.eventStore.filter({
                                filters: event => event.name.match(new RegExp(value, 'i')),
                                replace: true
                            });
                        }


                    }
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
                            mapPanel?.showTooltip(eventRecord, true);
                        }
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


    // weekDaysCount(startDay,endDay){
    //   const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    //   const startIndex = weekdays.indexOf(startDay);
    //   const endIndex = weekdays.indexOf(endDay);
    //   console.log('----------');
    //   console.log(startDay);
    //    console.log(endDay);
    //    console.log(startIndex);
    //    console.log(endIndex);
    //    let diff=0;
    //    diff = endIndex - startIndex;
    //   console.log(diff);
    // if (diff < 0) {
    //     diff += 7; 
    // }
    // if (diff === 0) {
    //     return 1;
    // }
    
    // if (diff > 0) {
    //     return diff + 1;
    // }
    
    // console.log('=========');
    // console.log(diff);

    // return diff;

    // }

  }

  return PageModule;
});
