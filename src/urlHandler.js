'use strict';

var $ = require("./lib/jquery.min.js");

var data = require('./top/data');




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


module.exports = new urlHandler;
