require.paths.jquery = './src/lib/jquery.min';
require.paths.TWEEN = './src/lib/Tween';
require.nodeRequire = require;

/*
require.paths.mockbrowser = '../../node_modules/mock-browser/lib/MockBrowser';
require.paths.lodash = '../../node_modules/lodash/lodash';
require.shim = {
    mockbrowser : deps['lodash']
}
*/
    //['../../node_modules/mock-browser', '../../node_modules/lodash'];
//require.paths.MockBrowser = './test/unit/unit-frameStructure';

// change to the above because I wanted to make sure I was not overriding the entire require config.

/*
 //require.baseUrl = '../../src';
 //require.paths.tests = '../test/demo';

requirejs.config({
    paths: {
        'require': './src/lib/require',
        'jquery': './src/lib/jquery.min',
        'TWEEN' : './src/lib/Tween',
        'THREE' : './src/lib/three'
    },
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});
    */