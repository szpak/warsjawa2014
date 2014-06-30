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

    getScript('static/javascripts/vendor/require.js', function () {
        require(['static/javascripts/defer'], function () {
            require(['static/javascripts/vendor/jquery'], function () {
                require(['static/javascripts/foundation/foundation'], function () {
                    require(['static/javascripts/foundation/foundation.accordion'], function () {
                    });
                });
            });
        });
    });
})();


