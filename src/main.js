

define([], function() {
    var Main = {};

    // This is your main function. After configuration in config.js, it is called.
    Main.main = function() {
        require([
            'src/app/setup'
        ], function(setup) {
            console.log('setup loaded/ing');
        });
    };

    return Main;
});










/*
//Test(ing) require.config setup
requirejs.config({
    baseUrl: 'src',
    paths: {
        'jquery': './lib/jquery.min',
        'TWEEN' : './lib/Tween',
       // 'three' : './lib/three',
       // 'css3dRenderer': './lib/CSS3DRenderer',
        'setup':'./app/setup'
    },
    shim: {
        'TWEEN': {deps: [], exports: ['TWEEN']}
    },
    map: {
        '*': {jQuery: 'jquery'},
        'jQuery': { 'jquery': 'jQuery' }
    }
});

require(['jQuery', 'store', 'setup' ], function($, store) {

});

*/

/*
//Original For Use require.config setup
requirejs.config({
    baseUrl: 'src',
    paths: {
        'jquery': './lib/jquery.min',
        'TWEEN' : './lib/Tween',
        'THREE' : './lib/three',
        'setup':'./app/setup'
    },
    shim: {
        'TWEEN': {deps: [], exports: ['TWEEN']},
    },
    map: {
        '*': {jQuery: 'jquery'},
        'jQuery': { 'jquery': 'jQuery' }
    }
});

require(['jQuery', 'store', 'setup' ], function($, store) {

});
*/
