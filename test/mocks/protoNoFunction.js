if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(){


    function EmptyFunction(){
    };

    EmptyFunction.prototype ={
        constructor: EmptyFunction,

        create: function(variables){
            return variables;
        }

    };

    return new EmptyFunction;
});