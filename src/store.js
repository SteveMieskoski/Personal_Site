// mutable store versus the immutable type used in a true reactive/redux design pattern

define([], function () {
    'use strict';
    var variableStore = {};
    return function (variableObject) {
        variableStore = Object.assign({}, variableStore, variableObject);
        return variableStore;
    };
});