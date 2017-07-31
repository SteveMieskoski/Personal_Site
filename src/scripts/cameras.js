//var THREE = require('three');

function Camera() {
}

Camera.prototype = {
    constructor: Camera,

    CSS: function (positionObject, fieldOfView, nearPlane, farPlane, aspectRatio, cameraOptions) {
        positionObject = positionObject ? positionObject : {x: 0, y: 0, z: 1000};
        cameraOptions = cameraOptions ? cameraOptions : undefined;
        if (!('z' in positionObject)) {
            {
                positionObject.z = 1000
            }
        }

        fieldOfView = fieldOfView ? fieldOfView : 40;
        nearPlane = nearPlane ? nearPlane : 1;
        farPlane = farPlane ? farPlane : 10000;
        aspectRatio = aspectRatio != undefined ? aspectRatio : window.innerWidth / window.innerHeight;
        var camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        camera.name = 'Top-Camera';
        camera.position.x = positionObject.x;
        camera.position.y = positionObject.y;
        camera.position.z = positionObject.z;

        return camera;
    },

    WebGl: function (fieldOfView, nearPlane, farPlane, HEIGHT, WIDTH, container, centerPosition, positionObject) {
        fieldOfView = fieldOfView ? fieldOfView : 2 * Math.atan(9 / ( 2 * 800 )) * ( 180 / Math.PI );
        var aspectRatio = (WIDTH && HEIGHT) ? WIDTH / HEIGHT : window.innerWidth / window.innerHeight;
        nearPlane = nearPlane ? nearPlane : 1;
        farPlane = farPlane ? farPlane : 10000;
        positionObject = positionObject ? positionObject : {x: 0, y: 0, z: 800};
        centerPosition = centerPosition ? centerPosition : {x: 0, y: 0, z: 0};
        if (!('z' in positionObject)) {
            {
                positionObject.z = 1000
            }
        }

        var camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        camera.name = 'Page-Camera';
        camera.position.z = positionObject.z ? positionObject.z : 1000;
        camera.lookAt(centerPosition.x, centerPosition.y, centerPosition.z);
        camera.focus = 1; //todo figure out why this value is ten when this literal setter is not present when it should be 1
        return camera;
    }

};


module.exports = new Camera;