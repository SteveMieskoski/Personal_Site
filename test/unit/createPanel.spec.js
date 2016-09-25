if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {
    'use strict';
    var expect = require('vendor/chai').expect,
        createPanel = require('../../src/top/createPanel'),
        info = {
            title: "Background",
            loc: 'background',
            icon: 'collections',
            id: 0,
            caption: 'Suspendisse commodo sem eget fermentum interdum.',
            template: './src/page/templates/background.html',
            col: 1,
            row: 1
        };

    describe('createPanel:', function () {

        it('should create an Html element populated with the id of the data object supplied', function () {
            // SM note: MainPagePanel is htmldivelement object
            var MainPagePanel = createPanel.create(info);
            // some what not true to an unit test
            expect(MainPagePanel.outerHTML).to.contain('id="0');
        });

        it('should create an Html element populated with the icon property  of the data object supplied', function () {
            var MainPagePanel = createPanel.create(info);
            // some what not true to an unit test
            expect(MainPagePanel.innerHTML).to.contain(info.icon);
        });

        it('should create an Html element populated with the title property of the data object supplied', function () {
            var MainPagePanel = createPanel.create(info);
            // some what not true to an unit test
            expect(MainPagePanel.innerHTML).to.contain(info.title);
        });

        it('should create an Html element populated with the caption property  of the data object supplied', function () {
            var MainPagePanel = createPanel.create(info);
            // some what not true to an unit test
            expect(MainPagePanel.innerHTML).to.contain(info.caption);
        });

    });


});