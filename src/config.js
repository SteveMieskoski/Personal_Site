(function () {
    console.log('begin config file'); // todo remove debug item
    // This is ultimately fed to require.config().
    // paths relative to location of index.html entry
    var Config = {
        'paths': {
            'main': 'main',

            // src
            'setup': 'app/setup',

            "urlHandler": "urlHandler",
            "store": "store",
            "initialValues": "initialValues",

            // top (i.e MainPage) directory (handles setup and much of the MainPage)
            "top/windowResize": "top/windowResize",
            "top/tweenObjects": "top/tweenObjects",
            "top/topControls": "top/topControls",
            "top/createPanel": "top/createPanel",
            "top/data": "top/data",
            "top/displayFrame": "top/displayFrame",
            "top/jqueryTop": "top/jqueryTop",
            "top/setupTop": "top/setupTop",


            // scripts directory (more generally or dispersed usage)
            "scripts/runCreateOrDestroy": "scripts/runCreateOrDestroy",
            "runCreateOrDestroy": "scripts/runCreateOrDestroy",
            "scripts/buttonControl": "scripts/buttonControl",
            "scripts/createNewPage": "scripts/createNewPage",
            "scripts/createPageContent": "scripts/createPageContent",
            "scripts/download": "scripts/download",
            "scripts/print": "scripts/print",
            "scripts/removePage": "scripts/removePage",
            "scripts/tweenAnimate": "scripts/tweenAnimate",
            "scripts/cameras": "scripts/cameras",
            "scripts/renderers": "scripts/renderers",
            'scripts/lights': 'scripts/lights',
            'scripts/createPagePortrait': 'scripts/createPagePortrait',
            'scripts/background_placer': 'scripts/background_placer',

            // page directory (handles setup and tear down of content pages)
            "page/createPageObjects": "page/createPageObjects",
            "page/handleMouse": "page/handleMouse",
            "page/initialPageValues": "page/initialPageValues",
            "page/setupPage": "page/setupPage",

            // libraries
            "jquery": "lib/jquery.min",
            "TWEEN": "lib/Tween",
            "TweenJS": "lib/TweenJS",

            // "sinon" : "test/vendor/sinon-1.17.5"

            // testing libraries
            "Squire": "test/vendor/Squire",
            //"sinon": "test/vendor/sinon",
            sinon: "test/vendor/sinon-1.17.5",
            // testing mocks
            "mocks/dataObject": "test/mocks/dataObject",
            "mocks/dataReverseLookup": "test/mocks/dataReverseLookup",
            "mocks/mockRunCreateOrDestroy": "test/mocks/mockRunCreateOrDestroy",
            "mocks/noFunction": "test/mocks/noFunction",
            "mocks/protoNoFunction": "test/mocks/protoNoFunction",
            "mocks/returnNoFunction": "test/mocks/returnNoFunction",
            "mocks/store": "test/mocks/store",
            "mocks/window": "test/mocks/window"
        },
        'map': {
            '*': {'jQuery': 'jquery'},
            'jQuery': {'jquery': 'jQuery'}
        }
    };

    // If _TEST_MODE, configre to '../' since our tests are stored in './test/'.
    if (typeof _TEST_MODE !== 'undefined' && _TEST_MODE === true) {
        Config.baseUrl = '../';
        require.config(Config);
        return true;
    }

    // If 'define' exists as a function, run main.
    if (typeof define === 'function') {
        require.config(Config);
        require(['main'], function (Main) {
            Main.main();
        });
        return true;
    }
    // If exports exists as an object, CommonJS.
    if (typeof module === 'object') {
        module.exports = Config;
    }
    // If module exists as an object, use CommonJS-like module exports for node.
    if (typeof exports === 'object') {
        exports.RJSConfig = Config;
    }

    return Config;
})();