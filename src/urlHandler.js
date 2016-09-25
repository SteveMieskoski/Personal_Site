if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
//require, $, data, runCreateOrDestroy, store
define(['require', 'top/data'], function (require) {
    'use strict';
    var data = require('top/data');
    // var $ = require('jquery)');
    // var store = require('./store');
    function urlHandler() {
    }

    urlHandler.prototype = {
        constructor: urlHandler,

        checkNavState: function (data, keepId) {
            var sessionHistory, locationListArray, addNewItem, stateObj;
            console.log('URLHANDLER: checknav state accessed'); // todo remove debug item

            sessionHistory = sessionStorage.getItem('locationList');
            locationListArray = JSON.parse(sessionHistory);

            if (keepId < 9000) {
                // todo simplify this code (combine/string some things together
                addNewItem = locationListArray.concat([data[Number(keepId)].loc]);
                //    console.log('addNewItem', addNewItem); // todo remove debug item
                sessionStorage.setItem('locationList', JSON.stringify(addNewItem));

                stateObj = {location: data[Number(keepId)].loc};
                history.pushState(stateObj, data[Number(keepId)].loc, '?' + data[Number(keepId)].loc);

            } else {

                addNewItem = locationListArray.concat(['MainPage']);  // todo simplify this code (combine/string some things together
                //     console.log('addNewItem', addNewItem); // todo remove debug item
                sessionStorage.setItem('locationList', JSON.stringify(addNewItem));

                stateObj = {location: 'MainPage'};
                history.pushState(stateObj, 'Steve Mieskoski Profile Home', '?MainPage');
            }
        },

        checkInitUrl: function (data, locationSubstring, callBack) {
            console.log('URLHANDLER: checkInitUrl accessed'); // todo remove debug item

            var sessionStorageInit = JSON.stringify([locationSubstring]);
            sessionStorage.setItem('locationList', sessionStorageInit);

            if (locationSubstring in data) {
                if (data[locationSubstring] < 100) {

                    callBack(data[locationSubstring]);
                }
            }
        },

        handleBackForward: function (callBackPage, callBackMain) {
            var beginningLocation, data = require('./top/data');

            window.addEventListener('popstate', function () {
                var sessionHistory, locationListArray, historyItem;
                sessionHistory = sessionStorage.getItem('locationList');
                locationListArray = JSON.parse(sessionHistory);

                if (locationListArray.length > 1) {
                    locationListArray.pop();
                    historyItem = locationListArray[locationListArray.length - 1];
                    locationListArray.pop();

                    if (locationListArray.length === 0) {
                        beginningLocation = true;
                    } else {
                        beginningLocation = false;
                    }

                    sessionStorage.setItem('locationList', JSON.stringify(locationListArray));
                } else {
                    historyItem = locationListArray[0];
                    beginningLocation = true;
                    sessionStorage.setItem('locationList', JSON.stringify(locationListArray));
                }

                if (historyItem !== 'MainPage') {
                    console.log('CALLBACK ONE'); // todo remove debug item
                    callBackPage(data.reverseId[historyItem], beginningLocation);
                } else {
                    callBackMain();
                }

            });
        }

    };

    return new urlHandler;
});

/*
 console.log('data location item urlHandler', data.dataObject[Number(keepId)]); // todo remove debug item
 console.log('urlHandler keepId', keepId); // todo remove debug item
 console.log(data.dataObject); // todo remove debug item
 console.log(data); // todo remove debug item
 */


/*
 function urlHandler(){

 };

 urlHandler.prototype ={
 constructor: urlHandler,

 checkNavState: function (data, keepId) {
 console.log('URLHANDLER: checknav state accessed'); // todo remove debug item
 var data = require('./top/data');

 var sessionHistory = sessionStorage.getItem('locationList');
 var locationListArray = JSON.parse(sessionHistory);

 if (keepId < 9000) {
 // todo simplify this code (combine/string some things together
 var addNewItem =  locationListArray.concat([data.dataObject[Number(keepId)].loc]);
 //    console.log('addNewItem', addNewItem); // todo remove debug item
 sessionStorage.setItem('locationList', JSON.stringify(addNewItem));

 var stateObj = {location: data.dataObject[Number(keepId)].loc};
 history.pushState(stateObj, data.dataObject[Number(keepId)].loc, '?' + data.dataObject[Number(keepId)].loc);

 } else {

 var addNewItem =  locationListArray.concat(['MainPage']);  // todo simplify this code (combine/string some things together
 //     console.log('addNewItem', addNewItem); // todo remove debug item
 sessionStorage.setItem('locationList', JSON.stringify(addNewItem));

 var stateObj = {location: 'MainPage'};
 history.pushState(stateObj, 'Steve Mieskoski Profile Home', '?MainPage');
 }
 },

 checkInitUrl: function (data){
 console.log('URLHANDLER: checkInitUrl accessed'); // todo remove debug item
 var  topFunctions = require('./scripts/runCreateOrDestroy');

 var locationSubstring = window.location.search.substring(1);
 var sessionStorageInit = JSON.stringify([locationSubstring]);
 sessionStorage.setItem('locationList', sessionStorageInit);

 if(locationSubstring in data) {
 if(data[locationSubstring] < 100){
 topFunctions.AddPageObjects(data[locationSubstring]);
 }
 }
 },

 AlthandleBackForward: function() {
 window.addEventListener('unload', function () {
 alert('on unload' + window.location.search.substring(1));
 });
 },
 handleBackForward: function() {
 var data = require('./top/data');
 var  topFunctions = require('./scripts/runCreateOrDestroy');

 window.addEventListener('popstate', function () {

 // todo set-up a bypass if on the last item, in addition to the present enforced minimum.
 var sessionHistory = sessionStorage.getItem('locationList');
 var locationListArray = JSON.parse(sessionHistory);

 if(locationListArray.length > 1){
 locationListArray.pop();
 var historyItem = locationListArray[locationListArray.length-1];
 locationListArray.pop();
 sessionStorage.setItem('locationList', JSON.stringify(locationListArray));
 } else {
 var historyItem = locationListArray[0];
 sessionStorage.setItem('locationList', JSON.stringify(locationListArray));
 }

 if(historyItem !== 'MainPage'){
 topFunctions.AddPageObjects(data.reverseId[historyItem]);
 } else {
 topFunctions.removePageRebuildMain();
 }

 });
 }

 };

 return new urlHandler;
 });
 */
