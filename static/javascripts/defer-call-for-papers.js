(function loadDefferdJs() {
    yepnope({
        load: [
            'static/javascripts/vendor/jquery.js',
            'static/javascripts/foundation/foundation.js',
            'static/javascripts/foundation/foundation.accordion.js',
            'static/javascripts/google-analytics.js'
        ],
        callback: {
            'foundation.accordion.js':function() {
                $(document).foundation();
            }
        }
    });
})();


