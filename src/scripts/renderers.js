define(function (require) {

    'use strict';
    function Renderers() {
    }

    Renderers.prototype = {
        constructor: Renderers,

        CSS: function (attachTo) {
            var renderer;
            renderer = new THREE.CSS3DRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.id = 'TopRendererDomEl';
            attachTo.appendChild(renderer.domElement);
            return renderer;
        },

        WebGl: function () {
            var renderer = new THREE.WebGLRenderer({alpha: true});
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.id = 'WebGlRenderer';
            renderer.shadowMap.enabled = true;
            return renderer;
        }

    };

    return new Renderers();
});