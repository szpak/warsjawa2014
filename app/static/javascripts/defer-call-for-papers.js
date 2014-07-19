(function loadDefferdJs() {
    yepnope({
        load: [
            'javascripts/vendor/jquery.js',
            'javascripts/foundation/foundation.js',
            'javascripts/foundation/foundation.accordion.js',
            'javascripts/google-analytics.js'
        ],
        callback: {
            'foundation.accordion.js':function() {
                $(document).foundation();
            }
        }
    });
})();


