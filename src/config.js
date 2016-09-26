(function () {
    console.log('begin config file'); // todo remove debug item
    // This is ultimately fed to require.config().
    // paths relative to location of index.html entry
    var Config = {
        'paths': {
            'main': 'src/main',

            // src
            'setup': 'src/app/setup',

            "urlHandler": "src/urlHandler",
            "store": "src/store",
            "initialValues": "src/initialValues",

            // top (i.e MainPage) directory (handles setup and much of the MainPage)
            "top/windowResize": "src/top/windowResize",
            "top/tweenObjects": "src/top/tweenObjects",
            "top/topControls": "src/top/topControls",
            "top/createPanel": "src/top/createPanel",
            "top/data": "src/top/data",
            "top/displayFrame": "src/top/displayFrame",
            "top/jqueryTop": "src/top/jqueryTop",
            "top/setupTop": "src/top/setupTop",


            // scripts directory (more generally or dispersed usage)
            "scripts/runCreateOrDestroy": "src/scripts/runCreateOrDestroy",
            "runCreateOrDestroy": "src/scripts/runCreateOrDestroy",
            "scripts/buttonControl": "src/scripts/buttonControl",
            "scripts/createNewPage": "src/scripts/createNewPage",
            "scripts/createPageContent": "src/scripts/createPageContent",
            "scripts/download": "src/scripts/download",
            "scripts/print": "src/scripts/print",
            "scripts/removePage": "src/scripts/removePage",
            "scripts/tweenAnimate": "src/scripts/tweenAnimate",
            "scripts/cameras": "src/scripts/cameras",
            "scripts/renderers": "src/scripts/renderers",
            'scripts/lights': 'src/scripts/lights',
            'scripts/createPagePortrait': 'src/scripts/createPagePortrait',
            'scripts/background_placer': 'src/scripts/background_placer',

            // page directory (handles setup and tear down of content pages)
            "page/createPageObjects": "src/page/createPageObjects",
            "page/handleMouse": "src/page/handleMouse",
            "page/initialPageValues": "src/page/initialPageValues",
            "page/setupPage": "src/page/setupPage",

            // libraries
            "jquery": "src/lib/jquery.min",
            "TWEEN": "src/lib/Tween",
            "TweenJS": "src/lib/TweenJS",

            // "sinon" : "test/vendor/sinon-1.17.5"

            // testing libraries
            "Squire": "src/test/vendor/Squire",
            //"sinon": "test/vendor/sinon",
            sinon: "src/test/vendor/sinon-1.17.5",
            // testing mocks
            "mocks/dataObject": "src/test/mocks/dataObject",
            "mocks/dataReverseLookup": "src/test/mocks/dataReverseLookup",
            "mocks/mockRunCreateOrDestroy": "src/test/mocks/mockRunCreateOrDestroy",
            "mocks/noFunction": "src/test/mocks/noFunction",
            "mocks/protoNoFunction": "src/test/mocks/protoNoFunction",
            "mocks/returnNoFunction": "src/test/mocks/returnNoFunction",
            "mocks/store": "src/test/mocks/store",
            "mocks/window": "src/test/mocks/window"
        },
        'map': {
            '*': {'jQuery': 'jquery'},
            'jQuery': {'jquery': 'jQuery'}
        }
    };

    // If _TEST_MODE, configre to '../' since our tests are stored in './test/'.
    if (typeof _TEST_MODE !== 'undefined' && _TEST_MODE === true) {
        Config.baseUrl = '../src/';
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