define(function (require) {

    var pages, bkgnd,
        assert = require('vendor/chai').assert,
        createPageObjects = require('../../src/page/createPageObjects');

    describe('create Page Objects Tests:', function () {

        describe('createPageObjects', function () {

            it('should create an object for each page', function () {
                pages = createPageObjects.createBackgroundPlane();
                assert.equal(pages.length, 9);
            });

            it('should have an object for the background page', function () {
                bkgnd = createPageObjects.createBackgroundPlane();
                assert.equal(bkgnd[0].name, 'background');
            });

        });
    });

});