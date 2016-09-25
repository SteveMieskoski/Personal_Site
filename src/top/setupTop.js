if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {
    'use strict';

    function SetupTop() {
    }

    SetupTop.prototype = {
        constructor: SetupTop,


        createTopElements: function (dataArray, scene, createPanel) {
            var i, element, object, objects = [];

            for (i = 0; i < dataArray.length; i++) {

                element = createPanel.create(dataArray[i]);

                object = new THREE.CSS3DObject(element);
                object.position.x = Math.random() * 4000 - 2000;
                object.position.y = Math.random() * 4000 - 2000;
                object.position.z = Math.random() * 1000 + 3000;
                object.name = dataArray[i].id;
                scene.add(object);

                objects.push(object);
            }
            return objects;
        },

        topDesign: function (dataArray, tweenObjects) {
            var targets = {table: [], sphere: [], helix: [], grid: [], column: []};
            targets.table = tweenObjects.tableDesign(dataArray);
            targets.helix = tweenObjects.helixDesign(dataArray);
            targets.grid = tweenObjects.gridDesign(dataArray);
            targets.sphere = tweenObjects.sphereDesign(dataArray);
            targets.column = tweenObjects.columnDesign(dataArray);

            return targets;
        },

        createTopRenderer: function (appendingElement) {
            var renderer = new THREE.CSS3DRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.id = 'TopRendererDomEl';
            appendingElement.appendChild(renderer.domElement);
            return renderer;
        },

        createTopControls: function (scene, camera, renderer) {
            var controls = new THREE.TrackballControls(camera, renderer.domElement);
            controls.noRotate = true;
            controls.noPan = true;
            controls.noZoom = true;
            controls.minDistance = 500;
            controls.maxDistance = 6000;
            controls.addEventListener('change', function () {
                renderer.render(scene, camera);
            });
            return controls;
        },

        startTopAnimation: function (objects, targets, scene, camera, renderer, controls, tweenAnimate, windowResize) {

            function start(objects, targets, scene, camera, renderer, controls, tweenAnimate, windowResize) {
                var target;
                if (window.innerWidth < window.innerHeight) {
                    target = targets.column;
                } else {
                    target = targets.table;
                }

                function animate() {
                    requestAnimationFrame(animate);
                    TWEEN.update();
                    //controls.update();
                }

                tweenAnimate.Run(objects, target, scene, camera, renderer, 2000, [16, 16]);
                window.addEventListener('resize', windowResize, false);
                renderer.render(scene, camera);
                animate();
            }

            start(objects, targets, scene, camera, renderer, controls, tweenAnimate, windowResize);
        },


        render: function (varStore) {
            varStore.renderer.render(varStore.scene, varStore.camera);
            return varStore;
        }


    };


    return new SetupTop();
});