define(['store', 'scripts/runCreateOrDestroy'], function (store, runCreateOrDestroy) {
    'use strict';

// todo look into the apparent flash resize after the screen orientation changes
    var onWindowResize = function () {
        var portrait;

        if (window.innerHeight > window.innerWidth) {
            portrait = true;
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
            } else {

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
        }

        store().camera.aspect = window.innerWidth / window.innerHeight;
        store().camera.updateProjectionMatrix();
        store().renderer.setSize(window.innerWidth, window.innerHeight, true);
        store().renderer.render(store().scene, store().camera);
        // tweenAnimate.Run(objects, targets, scene, camera, renderer, duration, tweenRate, keepId, incrementStop, cb)
        if (window.innerHeight > window.innerWidth) {
            runCreateOrDestroy.AnimateAddPageObjectsVertical(store, store().selectedList, true);
        } else {
            runCreateOrDestroy.AnimateAddPageObjects(store, store().selectedList, true);
        }


    };

    return onWindowResize;
});

