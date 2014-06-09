(function loadDefferdJs() {
    function getScript(url, success) {
        var script = document.createElement('script');
        script.src = url;
        var head = document.getElementsByTagName('head')[0],
            done = false;
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                success();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            }
        };
        head.appendChild(script);
    }

    getScript('javascripts/vendor/require.js', function () {
        require(['javascripts/vendor/jquery'], function () {
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

                        var mapOptions = {
                            center: new google.maps.LatLng(52.21176169999991, 20.982062799999987),
                            zoom: 14,
                            maxZoom: 14,
                            minZoom: 11,
                            zoomControl: false,
                            zoomControlOptions: {
                                style: google.maps.ZoomControlStyle.LARGE,
                                position: google.maps.ControlPosition.LEFT_CENTER
                            },
                            draggable: false,
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
                                map.panTo(marker.getPosition());
                            }, 500);
                        });
                    };

                    getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBBULW4_iHzfOEKOjvU1bBr248i0HCsVRw&callback=initializeMap', function () {
                        mapSection.addClass('opened');
                    });
                }
            }

            function loadMapIfNeeded() {
                var currentScreenSize = $('#media-query-breakpoints div:visible').first().data('size');
                if (currentScreenSize === 'medium' || currentScreenSize === 'large') {
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
        });

        require(['javascripts/vendor/jquery', 'javascripts/foundation/foundation', 'javascripts/foundation/foundation.tooltip'], function () {
            $(document).foundation();
        });
    });

    (function () {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-44336202-1', 'warsjawa.pl');
        ga('send', 'pageview');
    })();
})();


