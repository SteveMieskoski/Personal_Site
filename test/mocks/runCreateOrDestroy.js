if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function () {

    function PageCreateAndDestroy() {
    }

    PageCreateAndDestroy.prototype = {
        constructor: PageCreateAndDestroy,

        AddPageObjects: function (keepId) {
        },

        removePageRebuildMain: function () {
        }

    };

    return new PageCreateAndDestroy;


});