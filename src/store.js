

'use strict';
var variableStore = {};
module.exports = function (variableObject) {
    variableStore = Object.assign({}, variableStore, variableObject);
    return variableStore;
};
