

'use strict';


var storage = {
    state: {},
    update: function (variableObject) {
	    this.state = Object.assign({}, this.state, variableObject);
	    return this.state;
    }
};




module.exports = storage;