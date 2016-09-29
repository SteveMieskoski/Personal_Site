define(['jquery', 'store'], function ($, store) {
    'use strict';
    function removePage() {
    }

    removePage.prototype = {
        constructor: removePage,

        Objects: function () {
            var i;
            for (i = store().sceneP.children.length - 1; i >= 0; i--) {
                store().sceneP.remove(store().sceneP.children[i]);
            }

            $('span.page-title-name').removeClass('hide-element');
            $("canvas").remove();
            store().rendererP.render(store().sceneP, store().camera);
        },

        RebuildMainPage: function (store) {
            var i,
                replaceObject = Object.assign({}, store().objects);

            $('div.primary-view').removeClass('primary-view');
            $('div.navItems >  button.togglePage').remove();
            for (i = store().scene.children.length - 1; i >= 0; i--) {
                store().scene.remove(store().scene.children[i]);
            }

            for (i = 0; i < store().objects.length; i++) {
               // replaceObject[i].position.x = Math.random() * 4000 - 2000;
                replaceObject[i].position.x = -1800;
                replaceObject[i].position.y = Math.random() * 50 - 425;
               // replaceObject[i].position.z = Math.random() * -4000 - 3000;
                replaceObject[i].position.z =  - 3300;

                store().scene.add(replaceObject[i]);
            }
            store().camera.position.z = 1000;
        }


    };

    return new removePage;

});