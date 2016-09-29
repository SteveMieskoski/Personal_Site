define(function (require) {

    var assert = require('vendor/chai').assert,
        expect = require('vendor/chai').expect,
        Squire = require('vendor/Squire'),
        setupTop = require('../../src/top/setupTop'),
        stubcreatePanel = require('../../src/top/createPanel'),
        fakeScene = {
            add: function (inputs) {
                return inputs;
            }
        };

    function check(done, f) {
        try {
            f();
            done();
        } catch (e) {
            done(e);
        }
    }


    describe('setupTop Tests:', function () {


        describe('createTopElements:', function () {

            it('should confirm correct values created by setupTop.createTopElements', function () {
                var returnValue, fakePanelResult, fakeData;

                fakePanelResult = document.createElement('div');
                fakeData = [{id: 900}];

                sinon.spy(fakeScene, 'add');
                sinon.stub(stubcreatePanel, 'create').returns(fakePanelResult);

                returnValue = setupTop.createTopElements(fakeData, fakeScene, stubcreatePanel); //method under test

                assert.equal(true, fakeScene.add.calledOnce);
                assert.equal(1, returnValue.length);
                assert.equal(900, returnValue[0].name);
                assert.equal('Object3D', returnValue[0].type);
                assert.equal(1, fakeScene.add.firstCall.args.length);
                assert.equal('Object3D', fakeScene.add.firstCall.returnValue.type);

            });


            it('should operate with only data faked', function () {
                var returnValue,
                    createPanelElements = require('../../src/top/createPanel'),
                    scene = new THREE.Scene(),
                    testData = [
                        {
                            title: "TestTitle1",
                            loc: 'background',
                            icon: 'collections',
                            id: 0,
                            caption: 'Suspendisse commodo sem eget fermentum interdum.',
                            template: './src/page/templates/background.html',
                            col: 1,
                            row: 1
                        },
                        {
                            title: "TestTitle2",
                            loc: 'experience',
                            icon: 'work',
                            id: 1,
                            caption: 'Integer a ante et justo varius lacinia.',
                            template: './src/page/templates/experience.html',
                            col: 2,
                            row: 3
                        },
                        {
                            title: "TestTitle3",
                            loc: 'aboutMe',
                            icon: 'perm_identity',
                            id: 2,
                            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            template: './src/page/templates/aboutMe.html',
                            col: 3,
                            row: 1
                        }];

                sinon.spy(scene, 'add');

                returnValue = setupTop.createTopElements(testData, scene, createPanelElements); //method under test

                expect(scene).to.be.an.instanceof(THREE.Scene);
                assert.equal(3, returnValue.length, 'createTopElements method returned fewer items than contained in the data supplied');
                assert.equal(scene.add.callCount, returnValue.length, 'scene.add was called fewer times than the length of items supplied');
                assert.equal(0, returnValue[0].name);
                assert.equal('Object3D', returnValue[0].type);
            });

        }); // closing createTopElements: describe


        describe('topDesign:', function () {

            it('should confirm correct values created by setupTop.topDesign', function () {
                var returnValue,
                    tweenObjects = require('../../src/top/tweenObjects'),
                    testData = [
                        {
                            title: "TestTitle1",
                            loc: 'background',
                            icon: 'collections',
                            id: 0,
                            caption: 'Suspendisse commodo sem eget fermentum interdum.',
                            template: './src/page/templates/background.html',
                            col: 1,
                            row: 1
                        },
                        {
                            title: "TestTitle2",
                            loc: 'experience',
                            icon: 'work',
                            id: 1,
                            caption: 'Integer a ante et justo varius lacinia.',
                            template: './src/page/templates/experience.html',
                            col: 2,
                            row: 3
                        },
                        {
                            title: "TestTitle3",
                            loc: 'aboutMe',
                            icon: 'perm_identity',
                            id: 2,
                            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                            template: './src/page/templates/aboutMe.html',
                            col: 3,
                            row: 1
                        }];

                sinon.spy(tweenObjects, 'tableDesign');
                sinon.spy(tweenObjects, 'helixDesign');
                sinon.spy(tweenObjects, 'gridDesign');
                sinon.spy(tweenObjects, 'sphereDesign');

                returnValue = setupTop.topDesign(testData, tweenObjects); //method under test

                assert.equal(1, tweenObjects.tableDesign.callCount, 'tableDesign call count');
                assert.equal(1, tweenObjects.helixDesign.callCount, 'helixDesign call count');
                assert.equal(1, tweenObjects.gridDesign.callCount, 'gridDesign call count');
                assert.equal(1, tweenObjects.sphereDesign.callCount, 'sphereDesign call count');

                assert.equal(3, returnValue.table.length, 'returned table array length');
                assert.equal(3, returnValue.helix.length, 'returned helix array length');
                assert.equal(3, returnValue.grid.length, 'returned grid array length');
                assert.equal(3, returnValue.sphere.length, 'returned sphere array length');
            });

        });


        describe('createTopRenderer:', function () {

            it('should confirm correct values created by setupTop.createTopRenderer', function () {
                var appendTo, returnValue;
                appendTo = document.createElement('div');

                returnValue = setupTop.createTopRenderer(appendTo); //method under test

                assert.equal(window.innerWidth, returnValue.getSize().width);
                assert.equal(window.innerHeight, returnValue.getSize().height);
                assert.equal('absolute', returnValue.domElement.style.position);
            });
        });


        describe.skip('createTopControls:', function () {

            // explicitly set variables to undefined to preempt any leakage from previous tests.
            before(function () {
                var scene = undefined,
                    camera = undefined,
                    renderer = undefined;
            });

            it('should confirm correct values created by setupTop.createTopControls', function () {
                var returnValue,
                    scene = new THREE.Scene(),
                    camera = new THREE.PerspectiveCamera(100, 100, 100, 40, 1, 10000),
                    renderer = new THREE.CSS3DRenderer();

                returnValue = setupTop.createTopControls(scene, camera, renderer); //method under test

                expect(returnValue).to.have.ownProperty('update');
                expect(returnValue).to.have.ownProperty('noRotate');
                expect(returnValue).to.have.ownProperty('noPan');
            });
        });


        describe('startTopAnimation:', function () {

            // explicitly set variables to undefined to preempt any leakage from previous tests.
            before(function () {
                var objects = undefined,
                    targets = undefined,
                    scene = undefined,
                    camera = undefined,
                    renderer = undefined,
                    returnValue = undefined,
                    windowResize = undefined,
                    fakeTweenAnimate = undefined;
            });


            it('should confirm setupTop.startTopAnimation passes correct values to tweenAnimate  ', function (done) {
                var windowResize,
                    fakeTweenAnimate = {
                        Run: function (variable) {
                            return variable;
                        }
                    },
                    TWEEN = require('../../src/lib/Tween'),
                    objects = ['object1', 'object2'],
                    targets = {
                        table: ['fake table target'],
                        sphere: ['fake sphere target'],
                        helix: ['fake helix target'],
                        grid: ['fake grid target']
                    },
                    scene = new THREE.Scene(),
                    camera = new THREE.PerspectiveCamera(100, 100, 100, 40, 1, 10000),
                    renderer = new THREE.CSS3DRenderer(),
                    controls = new THREE.TrackballControls(camera, renderer.domElement);

                sinon.spy(fakeTweenAnimate, 'Run');
                sinon.spy(controls, 'update');
                sinon.spy(renderer, 'render');
                sinon.spy(TWEEN, 'update');

                windowResize = sinon.stub();

                setupTop.startTopAnimation(objects, targets, scene, camera, renderer, controls, fakeTweenAnimate, windowResize); //method under test

                // check for call to tweenAnimate from startAnimation method
                expect(fakeTweenAnimate.Run.calledOnce).to.equal(true, 'tweenAnimate.Run was not called');
                expect(fakeTweenAnimate.Run.firstCall.args[0]).to.equal(objects, 'objects not supplied to TweenAnimate');
                expect(fakeTweenAnimate.Run.firstCall.args[1]).to.equal(targets.table, 'objects not supplied to TweenAnimate');
                expect(fakeTweenAnimate.Run.firstCall.args[2]).to.contain(scene, 'scene not supplied to TweenAnimate');
                expect(fakeTweenAnimate.Run.firstCall.args[3]).to.equal(camera, 'camera not supplied to TweenAnimate');
                expect(fakeTweenAnimate.Run.firstCall.args[4]).to.equal(renderer, 'renderer not supplied to TweenAnimate');

                // check for call to renderer.render from startAnimation method
                expect(renderer.render.calledOnce).to.equal(true, 'renderer.render was not called');
                expect(renderer.render.firstCall.args[0]).to.contain(scene, 'scene not supplied to renderer.render');
                expect(renderer.render.firstCall.args[1]).to.contain(camera, 'camera not supplied to renderer.render');

                // check for call to controls.update from startAnimation method internal function animate
                // (the internal function animate contains the requestAnimationFrame function)
                expect(controls.update.calledOnce).to.equal(true, 'controls.update  was not called in animate function containing request animation frame');

                setTimeout(function () {
                    check(done, function () {

                        // check for eventListener call to windowResize on window resize event.  event listener added in startAnimation method
                        window.dispatchEvent(new Event('resize'));
                        expect(windowResize.calledOnce).to.equal(true, 'windowResize was not called on resize even');

                    });
                }, 50);
            });
            it('should fail if errors occur in the request animation frame loop or if any other animation started here would break')

        });
    });

});

