
'use strict';

var $ = require("../lib/jquery.min.js");
var rsvp = require('rsvp');

var data = require("../top/data");
var setupTop = require("../top/setupTop");
var runCreateOrDestroy = require("../scripts/runCreateOrDestroy");
var buttonControl = require("../scripts/buttonControl");
var jqueryTop = require("../top/jqueryTop");
var urlHandler = require("../urlHandler");
var store = require("../store");
var Cameras = require("../scripts/cameras");
var tweenAnimate = require("../scripts/tweenAnimate");
var windowResize = require("../top/windowResize");
var tweenObjects = require("../top/tweenObjects");
var createPanel = require("../top/createPanel");
var createPageObjects = require("../page/createPageObjects");
var renderers = require("../scripts/renderers");
var lights = require("../scripts/lights");
var createNewPage = require("../scripts/createNewPage");
var removePage = require("../scripts/removePage");
//var THREE = require('three');

var portrait;

//todo consolidate data items that are not strictly internal into a config object

function MainPageSetup(data, storeCallback) {
    var storeObjects,
        camera = Cameras.CSS(),
        scene = new THREE.Scene(),
        objects = setupTop.createTopElements(data.dataArray, scene, createPanel),
        targets = setupTop.topDesign(data.dataArray, tweenObjects),
        renderer = renderers.CSS(document.getElementById('container')),
        controls = -1,
        camToSave = {};

    setupTop.startTopAnimation(objects, targets, scene, camera, renderer, controls, tweenAnimate, windowResize);
    storeObjects = {
        camera: camera,
        scene: scene,
        objects: objects,
        targets: targets,
        renderer: renderer,
        controls: controls,
        reset: camToSave
    };
    storeCallback(storeObjects);
}


function ContentPagesSetup(storeCallback) {
    $('div#container').addClass('setupPageBase');
    var storeObjects,
        pagePlane = createPageObjects.createBackgroundPlane(),
        cameraP = Cameras.WebGl(),
        sceneP = new THREE.Scene(),
        lightH = lights.HemisphereLight(),
        lightD = lights.DirectionalLight(),
        rendererP = renderers.WebGl();


    window.addEventListener('resize', windowResize, false);
    storeObjects = {
        pagePlane: pagePlane,
        cameraP: cameraP,
        lightH: lightH,
        lightD: lightD,
        sceneP: sceneP,
        rendererP: rendererP
    };
    storeCallback(storeObjects);
}

// Begin Setup
store({data: data.dataObject});
if (window.innerHeight > window.innerWidth) {
    portrait = true;
}
store({portrait: portrait});
store({selectedList: []});
store({beginningLocation: 'index'});

$('div#container').addClass('setupPageBase');

new MainPageSetup(data, store);
new ContentPagesSetup(store);

buttonControl.init(store());
jqueryTop();

urlHandler.checkInitUrl(data.reverseId, window.location.search.substring(1), function (vars) {
    store({selectedList: [vars]});
    runCreateOrDestroy.initialPageAdd(vars);
});

urlHandler.handleBackForward(function (varsPage, beginningLocation) {
    if (beginningLocation == true && store().beginningLocation == true) {
    } else {
        if (beginningLocation) {
            store().beginningLocation = true;
        }
        store().scene.add(store().objects[store().selectedList[store().selectedList.length - 1]]);
        runCreateOrDestroy.AnimateAddPageObjects(store, String(varsPage));
    }
}, function () {
    runCreateOrDestroy.removePageRebuildMain();
});


