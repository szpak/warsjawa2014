(function loadDefferdJs() {
    yepnope([
        {
            load: 'static/javascripts/vendor/jquery.js',
            complete: function () {
                function diplayBiggerThanSmall() {
                    var currentScreenSize = $('#media-query-breakpoints div:visible').first().data('size');
                    return currentScreenSize === 'medium' || currentScreenSize === 'large';
                }

                function loadMap() {
                    var mapSection = $('section#map');
                    if (!mapSection.hasClass('opened')) {
                        window.initializeMap = function () {
                            var styles = [
                                {
                                    featureType: "poi",
                                    stylers: [
                                        { visibility: "off" }
                                    ]
                                }
                            ];

                            var draggable = diplayBiggerThanSmall();

                            var mapOptions = {
                                center: new google.maps.LatLng(52.21176169999991, 20.982062799999987),
                                zoom: 14,
                                maxZoom: 14,
                                minZoom: 11,
                                zoomControl: draggable,
                                zoomControlOptions: {
                                    style: google.maps.ZoomControlStyle.LARGE,
                                    position: google.maps.ControlPosition.LEFT_CENTER
                                },
                                draggable: draggable,
                                scrollwheel: false,
                                streetViewControl: false,
                                disableDefaultUI: true,
                                disableDoubleClickZoom: true,
                                styles: styles
                            };
                            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

                            var marker = new google.maps.Marker({
                                position: new google.maps.LatLng(52.21176169999991, 20.982062799999987),
                                map: map
                            });

                            google.maps.event.addListener(map, 'center_changed', function () {
                                window.setTimeout(function () {
                                    if (!diplayBiggerThanSmall()) {
                                        map.panTo(marker.getPosition());
                                    }
                                }, 500);
                            });
                        };

                        yepnope({
                            load: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBBULW4_iHzfOEKOjvU1bBr248i0HCsVRw&callback=initializeMap',
                            complete: function () {
                                mapSection.addClass('opened');
                            }
                        });
                    }
                }

                function loadMapIfNeeded() {
                    if (diplayBiggerThanSmall()) {
                        loadMap();
                    }
                }

                loadMapIfNeeded();
                $(window).resize(function () {
                    loadMapIfNeeded();
                });

                $('section#header .place').click(function (event) {
                    event.preventDefault();
                    var mapSection = $('section#map');
                    if (mapSection.find('iframe').length === 0) {
                        loadMap();
                    }
                });
            }
        },
        {
            load: 'static/javascripts/google-analytics.js'
        }
    ]);
})();


