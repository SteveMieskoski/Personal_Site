define(function (require) {

    var injector, pages, bkgnd, dataMock, pageDesign, testData,
        assert = require('vendor/chai').assert,
        Squire = require('../../test/vendor/Squire');

   // createPAgeObjects = require('../../src/page/createPageObjects'),
    function check(done, f) {
        try {
            f();
            done();
        } catch (e) {
            done(e);
        }
    }

    pageDesign = {
        '0': {color: 0x3371FF, name: 'background', image: 'img/mountain_sinrise_blue-gray_scale.png'},
        '1': {color: 0x2f576d, name: 'experience', image: 'img/mountain_sinrise_aqua_scale.png'},
        '2': {color: 0x8A8077, name: 'aboutMe', image: 'img/mountain_sinrise_green_scale.png'}
    };
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

    dataMock = {dataArray: testData, dataObject: pageDesign};
    describe('create Page Objects Tests:', function () {


        describe('createNewPage Test:', function () {

            beforeEach(function () {
                injector = new Squire();
            });

            afterEach(function () {
                injector.remove();
            });


            describe('createPageObjects', function () {

                it('should create an object for each page', function (done) {
                    setTimeout(function () {
                        injector
                            .mock('top/data', dataMock)
                            .require(['../src/page/createPageObjects'], function (createPageObjects) {
                                pages = createPageObjects.createBackgroundPlane();
                                console.log(pages);
                                assert.equal(pages.length, 3);
                                done();
                              /*  check(done, function () {
                                    assert.equal(pages.length, 6);
                                    assert.equal(0,1);
                               });*/
                            });
                    }, 100);
                });

                it('should create an object for each page', function (done) {
                    setTimeout(function () {
                        injector
                            .mock('top/data', dataMock)
                            .require(['../src/page/createPageObjects'], function (createPageObjects) {
                                bkgnd = createPageObjects.createBackgroundPlane();
                                assert.equal(bkgnd[0].name, 'background');
                                done();
                            });
                    }, 100);
                });

                /*    it('should have an object for the background page', function () {
                 bkgnd = createPageObjects.createBackgroundPlane();
                 assert.equal(bkgnd[0].name, 'background');
                 }); */

            });
        });
    });

});