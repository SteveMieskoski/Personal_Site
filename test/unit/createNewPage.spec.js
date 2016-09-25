if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['require', 'vendor/jquery', 'vendor/Squire', 'vendor/chai', 'mocks/mockStore'], function (require, $, Squire, chai, mockStore) {

    var injector, assert, Store;

    assert = require('vendor/chai').assert;
    mocha.setup({globals: ['assert']});

    Store = mockStore;


    describe('createNewPage Test:', function () {

        beforeEach(function () {
            injector = new Squire();
        });

        afterEach(function () {
            injector.remove();
        });


        it('should clear and replace presented items in the scene', function (done) {
            var originalLength = Store().scene.children.length;
            setTimeout(function () {
                injector
                    .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                    .mock('jquery', 'vendor/jquery')
                    .require(['vendor/jquery', '../src/scripts/createNewPage'], function ($, createNewPage) {

                        createNewPage.ClearScene(Store);  //method under test

                        assert.equal(originalLength, Store().scene.children.length, 'scene items were not replaced. The number of scene items after should equal number prior');
                        done();
                    });
            }, 100);
        });  // closing test 'it'


        it('should load the background plane for the item selected', function (done) {
            setTimeout(function () {
                injector
                    .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                    .require(['vendor/jquery', '../src/scripts/createNewPage'], function ($, createNewPage) {
                        var cbStub, attach, returnValue, argsPassedToCallback;

                        cbStub = sinon.stub();
                        attach = document.createElement('div');

                        returnValue = createNewPage.addPageObjects(Store, 0, attach, cbStub);  //method under test

                        argsPassedToCallback = cbStub.args[0];

                        assert.equal(argsPassedToCallback[1], 0, 'initially passed keepId was not passed through to callback');
                        assert.equal(typeof argsPassedToCallback[0], "function", 'store as function not passed to callback');
                        assert.equal(Store().pagePlane[0].children.length, Store().sceneP.children.length, 'pagePlane items were not added');
                        assert.equal(returnValue.rendererP.domElement.className, 'currentPageDisplay', 'canvas class was not added to renderer domElement');
                        assert.equal(returnValue.sceneP.children[0].name, 0, 'items added differ from item selected');
                        assert.equal(returnValue.sceneP.children[1].name, 0, 'items added differ from item selected');
                        done();
                    });
            }, 100);
        });  // closing test 'it'


        it('should provide the landscape class, templatePath, and pass Store().scene, Store().camera, Store().renderer, and Store().portrait to callback', function (done) {
            setTimeout(function () {
                Store({portrait: true});
                injector
                    .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                    .mock('jquery', 'vendor/jquery')
                    .require(['vendor/jquery', '../src/scripts/createNewPage'], function ($, createNewPage) {

                        createNewPage.addHtmlContent(Store, 0, function (templatePath, classes, scene, camera, renderer, portrait) {
                            assert.equal('./src/page/templates/background.html', templatePath, 'incorrect template fetched and passed');
                            assert.equal('page page-horizontal', classes, 'incorrect class selected and passed');
                            assert.equal(Store().scene, scene, 'scene should not mutate');
                            var cameraX = camera.getWorldDirection().x,
                                cameraY = camera.getWorldDirection().y,
                                cameraZ = camera.getWorldDirection().z;
                            assert.equal(cameraX, 0, 'camera look towards X=0');
                            assert.equal(cameraY, 0, 'camera look towards Y=0');
                            assert.equal(cameraZ, -1, 'camera look towards Z=0');
                            assert.equal(Store().renderer, renderer, 'renderer should not mutate');
                            assert.isBoolean(portrait, 'view orientation should be boolean')
                        });  //method under test
                        done();
                    });
            }, 100);
        });  // closing test 'it'


        it('should provide the class for portrait orientation', function (done) {
            // mockStore2 changes portrait value to true from mockStore false value
            function mockStore2() {
                return Object.assign(Store(), {portrait: true});
            }

            setTimeout(function () {
                injector
                    .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                    .mock('jquery', 'vendor/jquery')
                    .require(['vendor/jquery', '../src/scripts/createNewPage'], function ($, createNewPage) {
                        //var attach;

                        var returnValue = createNewPage.addHtmlContent(mockStore2, 0, function (templatePath, classes, scene, camera, renderer, portrait) {
                            assert.equal('page page-vertical', classes, 'incorrect class selected and passed');
                            assert.isBoolean(portrait, 'view orientation should be boolean');
                            assert.equal(mockStore2().portrait, portrait, 'view orientation should not mutate');
                        });  //method under test
                        done();
                    });
            }, 100);
        });  // closing test 'it'


    });
});


/*

 var variableStore = {};

 var Store =  function (variableObject){
 return variableStore = Object.assign({}, variableStore, variableObject);
 }

 var scene = new THREE.Scene();
 console.log(scene); // todo remove debug item
 Store({scene: scene});


 before(function(){
 var scene = new THREE.Scene();
 Store({scene: scene});
 console.log(Store()); // todo remove debug item
 for (var j = 0; j < 9; j++) {
 var mesh2 = new THREE.Object3D();
 Store().scene.add(mesh2);
 }



 console.log(Store().scene); // todo remove debug item
 });

 */