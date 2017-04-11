var store = require("../store");
var $ = require("../lib/jquery.min.js");

// todo look into the apparent flash resize after the screen orientation changes
var finalizeBackground = function () {

    if (window.innerHeight > window.innerWidth) {
        var portrait = true;
    }
    store({portrait: portrait});
    store().cameraP.aspect = window.innerWidth / window.innerHeight;
    store().cameraP.updateProjectionMatrix();
    store().rendererP.setSize(window.innerWidth, window.innerHeight);

    if ($('canvas').hasClass('currentPageDisplay')) {
        if (window.innerHeight > window.innerWidth) {
            $('span.better-view-message').detach();

            $('div.page').addClass('page-vertical').removeClass('page-horizontal');
            $('canvas').addClass('canvasVertical');
            //  $('div.page').removeClass('page-horizontal');
            store().camera.aspect = window.innerHeight / window.innerWidth;
            store().renderer.setSize(window.innerHeight, window.innerWidth, true);
        }
        else {

            $('div.page').removeClass('page-vertical').addClass('page-horizontal');
            $('canvas').removeClass('canvasVertical');
            //   $('div.page').addClass('page-horizontal');
            store().camera.aspect = window.innerWidth / window.innerHeight;
            store().renderer.setSize(window.innerWidth, window.innerHeight, true);
        }
        store().camera.position.z = 1000;
        store().camera.updateProjectionMatrix();
        store().rendererP.render(store().sceneP, store().camera);
    } else {
        store().camera.updateProjectionMatrix();
        store().rendererP.render(store().sceneP, store().camera);
    }


    if ($('canvas').hasClass('currentPageDisplay')) {
        store().camera.position.z = 1000;
    } else {
        // todo remove this extra block that is empty
    }


    store().camera.aspect = window.innerWidth / window.innerHeight;
    store().camera.updateProjectionMatrix();
    store().renderer.setSize(window.innerWidth, window.innerHeight, true);
    store().renderer.render(store().scene, store().camera);
};


module.exports = finalizeBackground;

