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
                var mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.740577996301!2d20.982062799999987!3d52.21176169999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471eccba6c9e2719%3A0xa614e74a0b76eff1!2sStefana+Banacha+2!5e0!3m2!1spl!2spl!4v1398360409911';
                mapSection.append('<iframe src="' + mapUrl + '"></iframe>');
                mapSection.addClass('opened');
            }

            function loadMapIfNeeded() {
                var mapSection = $('section#map');
                if (mapSection.find('iframe').length === 0) {
                    var currentScreenSize = $('#media-query-breakpoints div:visible').first().data('size');
                    if (currentScreenSize === 'medium' || currentScreenSize === 'large') {
                        loadMap();
                    }
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

    (function() {
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


