"use strict";



function Lights() {
}

Lights.prototype = {
    constructor: Lights,

    defaultLightVars: {
        hemisphereLight: {
            skyColor: 0xffffff,
            groundColor: 0xffffff,
            intensity: 0.5
        },
        directionalLight: {
            color: 0xffffff,
            intensity: 0.5,
            position: {x: -4050, y: 2000, z: 3000},
            shadow: {
                castShadow: true,
                left: -400,
                right: 400,
                top: 400,
                bottom: -400,
                near: 1,
                far: 1000,
                mapWidth: 2048,
                mapHeight: 2048
            }
        }
    },

    HemisphereLight: function (pageLightValues) {
        var hemisphereLight, pageLightVars;

        pageLightVars = pageLightValues || this.defaultLightVars;

        if (pageLightVars.hasOwnProperty('hemisphereLight')) {
            hemisphereLight = pageLightVars.hemisphereLight;
        }

        return new THREE.HemisphereLight(
            hemisphereLight.skyColor,
            hemisphereLight.groundColor,
            hemisphereLight.intensity
        );
    },

    DirectionalLight: function (pageLightValues) {
        var pageLightVars, directionalLight, shadowLight;

        pageLightVars = pageLightValues || this.defaultLightVars;

        if (pageLightVars.hasOwnProperty('directionalLight')) {
            directionalLight = pageLightVars.directionalLight;
        }

        shadowLight = new THREE.DirectionalLight(
            directionalLight.color,
            directionalLight.intensity
        );
        shadowLight.position.set(
            directionalLight.position.x,
            directionalLight.position.y,
            directionalLight.position.z
        );
        shadowLight.castShadow = directionalLight.shadow.castShadow;
        shadowLight.shadow.camera.left = directionalLight.shadow.left;
        shadowLight.shadow.camera.right = directionalLight.shadow.right;
        shadowLight.shadow.camera.top = directionalLight.shadow.top;
        shadowLight.shadow.camera.bottom = directionalLight.shadow.bottom;
        shadowLight.shadow.camera.near = directionalLight.shadow.near;
        shadowLight.shadow.camera.far = directionalLight.shadow.far;
        shadowLight.shadow.mapSize.width = directionalLight.shadow.mapWidth;
        shadowLight.shadow.mapSize.height = directionalLight.shadow.mapHeight;

        return shadowLight;
    }
};


module.exports = new Lights;