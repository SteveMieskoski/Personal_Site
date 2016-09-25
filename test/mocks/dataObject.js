if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function() {


    return  {
        0:{
        title: "Background",
        loc: 'background',
        icon: 'collections',
        id: 0,
        caption: 'Suspendisse commodo sem eget fermentum interdum.',
        template: './src/page/templates/background.html',
        col: 1,
        row: 1
            },

        1:{
        title: "About Me",
        loc: 'aboutMe',
        icon: 'perm_identity',
        id: 2,
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        template: './src/page/templates/aboutMe.html',
        col: 3,
        row: 1
            }
        };

});