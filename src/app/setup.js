requirejs([
    'top/data',
    'jquery',
    'top/setupTop',
    'scripts/runCreateOrDestroy',
    'scripts/buttonControl',
    'top/jqueryTop',
    'urlHandler',
    'store',
    'scripts/cameras',
    'scripts/tweenAnimate',
    'top/windowResize',
    'top/tweenObjects',
    'top/createPanel',
    'page/createPageObjects',
    'scripts/renderers',
    'scripts/lights',
    'scripts/removePage',
    'scripts/createNewPage'], function (data, $, setupTop, runCreateOrDestroy, buttonControl,
                                 jqueryTop, urlHandler, store,
                                 Cameras, tweenAnimate, windowResize, tweenObjects,
                                 createPanel, createPageObjects, renderers, lights, removePage, createNewPage) {
    'use strict';
    var portrait;

    function MainPageSetup(data, storeCallback) {
        console.log('begin setuptop init'); // todo remove debug item
        var storeObjects,
            camera = Cameras.CSS(),
            scene = new THREE.Scene(),
            objects = setupTop.createTopElements(data.dataArray, scene, createPanel),
            targets = setupTop.topDesign(data.dataArray, tweenObjects),
            renderer = renderers.CSS(document.getElementById('container')),
            controls = -1,
            camToSave = {};
        if(window.location.search.substring(1) === 'do3D'){
            var ExperNotice = document.createElement('h2');
            ExperNotice.textContent = 'This is Experimental! To Reset Views (Mostly) Use Reset Button in Animate Display Menu! ';
            var attachNotice = document.querySelector('#printButton');
            attachNotice.appendChild(ExperNotice);
            controls = setupTop.createTopControls(scene, camera, renderer);
            camToSave.position = camera.position.clone();
            camToSave.rotation = camera.rotation.clone();
            camToSave.controlCenter = controls.center.clone();
        }

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
        if(window.location.search.substring(1) === 'do3D'){
            pagePlane = createPageObjects.createBackgroundSphere();
        }
        console.log('CONTENT PAGES SETUP'); // todo remove debug item
        sceneP.add(lightH);
        sceneP.add(lightD);
        window.addEventListener('resize', windowResize, false);
        storeObjects = {
            pagePlane: pagePlane,
            cameraP: cameraP,
            sceneP: sceneP,
            rendererP: rendererP
        };
        storeCallback(storeObjects);
    }

    // Begin Setup
    document.addEventListener('ContactButton', buttonControl.contactButton(), true);
    console.log(window.location.search.substring(1));
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


    console.log('store check 1 in setup', store());  // todo remove debug item
    buttonControl.init(store());
    jqueryTop();

    urlHandler.checkInitUrl(data.reverseId, window.location.search.substring(1), function (vars) {
        store({selectedList: [vars]});
        runCreateOrDestroy.initialPageAdd(vars);
    });

    urlHandler.handleBackForward(function (varsPage, beginningLocation) {
        if(beginningLocation == true && store().beginningLocation == true) {
        } else {
            if(beginningLocation){
                store().beginningLocation = true;
            }
            store().scene.add(store().objects[store().selectedList[store().selectedList.length - 1]]);
            runCreateOrDestroy.AnimateAddPageObjects(store, String(varsPage));
        }
    }, function () {
        runCreateOrDestroy.removePageRebuildMain();
    });



});
/** requirejs closing for setup.js */
