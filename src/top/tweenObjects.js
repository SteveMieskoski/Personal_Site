define([], function () {

    "use strict";
    function TweenObjects() {
    }

    TweenObjects.prototype = {
        constructor: TweenObjects,
        targets: {table: [], sphere: [], helix: [], grid: [], column: []},

        tableDesign: function (data) {
            var i, object;

            for (i = 0; i < data.length; i++) {
                object = new THREE.Object3D();
                object.position.x = (data[i].col * 220) - 380;
                object.position.y = -(data[i].row * 176) + 360;
                this.targets.table.push(object);
            }
            return this.targets.table;
        },

        sphereDesign: function (data) {
            var i, l, phi, theta, object, vector;

            vector = new THREE.Vector3();

            for (i = 0, l = data.length; i < l; i++) {
                phi = Math.acos(-1 + (2 * i) / l);
                theta = Math.sqrt(l * Math.PI) * phi;
                object = new THREE.Object3D();
                object.position.x = 300 * Math.cos(theta) * Math.sin(phi);
                object.position.y = 300 * Math.sin(theta) * Math.sin(phi);
                object.position.z = 300 * Math.cos(phi);
                vector.copy(object.position).multiplyScalar(50);
                object.lookAt(vector);
                this.targets.sphere.push(object);
            }
            return this.targets.sphere;
        },

        helixDesign: function (data) {
            var i, l, phi, object, vector;

            vector = new THREE.Vector3();

            for (i = 0, l = data.length; i < l; i++) {
                phi = i * 0.8 + Math.PI;  // controls spacing between elements
                object = new THREE.Object3D();
                object.position.x = 450 * Math.sin(phi);
                object.position.y = -(i * 100) + 450;  // use i multiple to control height along helix
                object.position.z = 450 * Math.cos(phi);
                vector.x = object.position.x * 2;
                vector.y = object.position.y;
                vector.z = object.position.z * 2;
                object.lookAt(vector);
                this.targets.helix.push(object);

            }
            return this.targets.helix;
        },

        gridDesign: function (data) {
            var i, modNum, object;

            for (i = 0; i < data.length; i++) {
                object = new THREE.Object3D();
                object.position.x = ((i % 3) * 350) - 300;
                object.position.y = ( -(Math.floor(i / 3) % 3) * 300) + 225;
                object.position.z = (Math.floor(i / 4)) * -1200;
                this.targets.grid.push(object);
            }
            return this.targets.grid;
        },

        columnDesign: function (data) {
            var i, modNum, object;

            for (i = 0; i < data.length; i++) {
                object = new THREE.Object3D();
                object.position.x = 0;
                object.position.y = i * 200 - 1000;
                object.position.z = -2000;
                this.targets.column.push(object);
            }
            return this.targets.column;
        }
    };

    return new TweenObjects();
});