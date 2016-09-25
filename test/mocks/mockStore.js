if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}


define([], function(){

    var variableStore = {};

    var Store =  function (variableObject){
        return variableStore = Object.assign({}, variableStore, variableObject);
    };


    function addRenderers(Store){
        var renderer = new THREE.CSS3DRenderer();
        var RendererP = new THREE.WebGLRenderer();
        Store({renderer: renderer, rendererP: RendererP})
    }

    function addSceneObjects(Store){
        var scene = new THREE.Scene();
        Store({scene: scene});
        for (var j = 0; j < 9; j++) {
            var mesh2 = new THREE.Object3D();
            Store().scene.add(mesh2);
        }
        var sceneP = new THREE.Scene();
        Store({sceneP: sceneP})
    }

    function addPlaneObjects(Store){
        var PlaneObjects = [];
        for (var j = 0; j < 9; j++) {
            this.mesh2 = new THREE.Object3D();
            for (var i = 0; i < 2; i++) {
                var geom = new THREE.PlaneGeometry(100, 100, 1, 1);
                var material = new THREE.MeshBasicMaterial({color: 0x3371FF});
                var plane = new THREE.Mesh(geom, material);
                plane.name = j;
                this.mesh2.add(plane);
            }
            PlaneObjects.push(this.mesh2);
        }
        return Store({pagePlane: PlaneObjects});
    }
    addPlaneObjects(Store);
    addSceneObjects(Store);
    addRenderers(Store);

    return function (variableObject){

        var store = {
            portrait: false,
            camera: new THREE.PerspectiveCamera(40, 1.7, 1, 10000 ),
            selectedList: '0',
            beginningLocation: false,
            objects: ['mock object1', 'mock object2'],
            targets: {table: ['mock table target'], sphere: ['mock sphere target'], helix: ['mock helix target'], grid: ['mock grid target']},
            renderer: Store().renderer,
            controls: 'mock controls',
            pagePlane: Store().pagePlane,
            cameraP: new THREE.PerspectiveCamera(40, 1.7, 1, 10000 ),
            sceneP: Store().sceneP,
            rendererP: Store().rendererP,
            scene: Store().scene,
            data: {
                    0: {
                        title: "Background",
                        loc: 'background',
                        icon: 'collections',
                        id: 0,
                        caption: 'Suspendisse commodo sem eget fermentum interdum.',
                        template: './src/page/templates/background.html',
                        col: 1,
                        row: 1
                    },

                    1: {
                        title: "About Me",
                        loc: 'aboutMe',
                        icon: 'perm_identity',
                        id: 2,
                        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        template: './src/page/templates/aboutMe.html',
                        col: 3,
                        row: 1
                    }
                },
            dataArray:  [
                    {
                        title: "Background",
                        loc: 'background',
                        icon: 'collections',
                        id: 0,
                        caption: 'Suspendisse commodo sem eget fermentum interdum.',
                        template: './src/page/templates/background.html',
                        col: 1,
                        row: 1
                    },
                    {
                        title: "Experience",
                        loc: 'experience',
                        icon: 'work',
                        id: 1,
                        caption: 'Integer a ante et justo varius lacinia.',
                        template: './src/page/templates/experience.html',
                        col: 2,
                        row: 3
                    }]

        };


          //  store = Object.assign({}, store, variableObject);

       return store;
    }
});
