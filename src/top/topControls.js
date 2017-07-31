"use strict";

var THREE = require('three');

module.exports = function () {

    return function (scene, camera, renderer) {


        var controls = new THREE.TrackballControls(camera, renderer.domElement);

        controls.noRotate = true;
        controls.noPan = false;
        controls.noZoom = true;
        controls.minDistance = 500;
        controls.maxDistance = 6000;
        controls.addEventListener('change', function () {
            renderer.render(scene, camera);
        });
    };
};