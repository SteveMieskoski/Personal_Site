define(['require', 'vendor/jquery', 'vendor/Squire', 'vendor/chai'], function (require, $, Squire, chai) {

    var assert, expect, injector, camera, scene, renderer, server, classes, filename;
    assert = chai.assert;
    expect = chai.expect;

    function check(done, f) {
        try {
            f();
            done();
        } catch (e) {
            done(e);
        }
    }

    describe('createPageContent Test:', function () {

        beforeEach('add init Mock to sessionStorage', function () {
            injector = new Squire();
        });

        afterEach('remove Mock and Item from sessionStorage', function () {
            injector.remove();
        });


        describe('loadHtmlFile method:', function () {

            beforeEach('setup test fixtures/mocks/etc.', function () {
                server = sinon.fakeServer.create();
                server.respondWith(/\/MockTemplate/,
                    function (xhr) {
                        xhr.respond(200, {"Content-Type": "text/html"},
                            '<title>Mock Title</title><div class="messageAttach"></div><div class="button-attach"></div> ');
                    });

                scene = {
                    add: function (variable) {
                        return variable;
                    }
                };

                renderer = {
                    render: function (variable1, variable2) {
                        return [variable1, variable2];
                    }
                };

                sinon.stub(scene, 'add');
                sinon.stub(renderer, 'render');
                sinon.spy(THREE, 'CSS3DObject');
            });


            afterEach('tear down test setup', function () {
                server.restore();
                scene.add.restore();
                renderer.render.restore();
                THREE.CSS3DObject.restore();

            });


            it('should load and create page content based on template file', function (done) {
                var actualButtonText, orientationMessage;

                camera = {name: 'MockCamera'};
                classes = 'MockClass';
                filename = './mocks/MockTemplate.html';

                setTimeout(function () {
                    injector
                        .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                        .require(['vendor/jquery', '../src/scripts/createPageContent'], function ($, createPageContent) {

                            createPageContent.loadHtmlFile(filename, classes, scene, camera, renderer, false);  //method under test
                            server.respond();

                            assert.isAbove(THREE.CSS3DObject.args[0][0].children.length, 0, 'page not created from template');

                            actualButtonText = THREE.CSS3DObject.args[0][0].getElementsByClassName('template-return-button');
                            assert.lengthOf(actualButtonText, 1, 'template button should exist');

                            orientationMessage = THREE.CSS3DObject.args[0][0].getElementsByClassName('better-view-message')[0];
                            expect(orientationMessage).to.equal(undefined, 'better view message incorrectly created in landscape orientation');

                            check(done, function () {
                                server.restore();
                                orientationMessage = undefined;
                            });
                        });
                }, 100);
            });  // closing test 'it'


            it('should display better view message in portrait orientation', function (done) {
                var orientationMessage;

                camera = {name: 'MockCamera'};
                classes = 'MockClass';
                filename = './mocks/MockTemplate.html';

                setTimeout(function () {
                    injector
                        .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                        .require(['vendor/jquery', '../src/scripts/createPageContent'], function ($, createPageContent) {

                            createPageContent.loadHtmlFile(filename, classes, scene, camera, renderer, true);  //method under test
                            server.respond();

                            orientationMessage = THREE.CSS3DObject.args[0][0].getElementsByClassName('better-view-message')[0];
                            expect(orientationMessage).to.exist;

                            check(done, function () {
                                orientationMessage = undefined;
                                server.restore();
                            });
                        });
                }, 100);
            });  // closing test 'it'


            it('should call Three.js methods with template page elements', function (done) {
                camera = {name: 'MockCamera'};
                classes = 'MockClass';
                filename = './mocks/MockTemplate.html';

                setTimeout(function () {
                    injector
                        .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                        .require(['vendor/jquery', '../src/scripts/createPageContent'], function ($, createPageContent) {

                            createPageContent.loadHtmlFile(filename, classes, scene, camera, renderer, false);  //method under test
                            server.respond();

                            assert.equal(THREE.CSS3DObject.calledOnce, true, 'THREE.CSS3DObject not called once');
                            assert.equal(scene.add.calledOnce, true, 'scene.add not called once');
                            assert.equal(renderer.render.calledOnce, true, 'renderer.render not called once');
                            expect(scene.add.args[0][0].type).to.be.equal('Object3D', 'scene.add argument not of type Object3D');
                            expect(renderer.render.args[0][1].name).to.be.equal('MockCamera', 'camera not passed to renderer.render');

                            check(done, function () {
                                server.restore();
                            });
                        });
                }, 100);
            });  // closing test 'it'


            it('should emit event to activate template click listeners in buttonControl.js', function (done) {
                var createdEventTriggered = sinon.stub();
                classes = 'MockClass';
                filename = './mocks/MockTemplate.html';


                setTimeout(function () {
                    injector
                        .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                        .require(['vendor/jquery', '../src/scripts/createPageContent'], function ($, createPageContent) {

                            window.addEventListener('ContentPageCreated', createdEventTriggered, true);

                            createPageContent.loadHtmlFile(filename, classes, scene, camera, renderer, false);  //method under test
                            server.respond();

                            assert.equal(createdEventTriggered.calledOnce, true, 'event was not emitted');

                            check(done, function () {

                            });
                        });
                }, 100);
            });  // closing test 'it'


        });  // closing method describe
    }); // closing createPageContent describe
});

