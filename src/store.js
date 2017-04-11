// mutable store versus the immutable type used in a true reactive/redux design pattern


'use strict';
var variableStore = {};
module.exports = function (variableObject) {
    variableStore = Object.assign({}, variableStore, variableObject);
    return variableStore;
};
