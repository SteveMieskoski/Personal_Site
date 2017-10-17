'use strict';

var $ = require("../lib/jquery.min.js");

var runCreateOrDestroy = require("../scripts/runCreateOrDestroy");
var createPageContent = require("../scripts/createPageContent");
var setupTop = require('../top/setupTop');
var data = require("../top/data");
var store = require('../store');
var removePage = require("./removePage");
var tweenAnimate = require('scripts/tweenAnimate');
var displayFrame = require("../top/displayFrame");

var stack = [];
var selectedId;

/**
 *
 * Used by setup, jqueryTop,
 *
 */

function ButtonControl() {
}

ButtonControl.prototype = {
    constructor: ButtonControl,

    init: function () {
        this.bindDesignControls(store());
        this.templateButtons();
    },

    bindDesignControls: function () {
        document.getElementById('table')
            .addEventListener('click', function (event) {
                tweenAnimate.Run(store().objects, store().targets.table, store().scene, store().camera, store().renderer, 2000, [16, 16]);
            }, false);

        document.getElementById('sphere')
            .addEventListener('click', function (event) {
                tweenAnimate.Run(store().objects, store().targets.sphere, store().scene, store().camera, store().renderer, 2000, [16, 16]);
            }, false);

        document.getElementById('helix')
            .addEventListener('click', function (event) {
                tweenAnimate.Run(store().objects, store().targets.helix, store().scene, store().camera, store().renderer, 2000, [16, 16]);
            }, false);

        document.getElementById('grid')
            .addEventListener('click', function (event) {
                tweenAnimate.Run(store().objects, store().targets.grid, store().scene, store().camera, store().renderer, 2000, [16, 16]);
            }, false);
    },


    bindMenuButtons: function () {

        $('button.mdl-button-mod').click(function () {
            if ($(this).attr('id').match(/\d+/)[0] < 9) {
                $("div.cd-layout__drawer").toggleClass("cd-not-visible").toggleClass("cd-is-visible");
                runCreateOrDestroy.AnimateAddPageObjects(store, $(this).attr('id').match(/\d+/)[0]);
            }
        });

        document.getElementById('nav9')
            .addEventListener('click', function () {
                $("div.cd-layout__drawer").toggleClass("cd-not-visible").toggleClass("cd-is-visible");
            });


        // todo LOW IMPORTANCE change so that it appears even when the drawer is open before the canvas is created
        if ($("div.cd-layout__drawer").hasClass("cd-is-visible") && $('canvas').hasClass('currentPageDisplay')) {
            $('#nav10').removeClass('hide-element');
            document.getElementById('nav10')
                .addEventListener('click', function () {
                    runCreateOrDestroy.removePageRebuildMain();
                    $('#nav9').addClass('hide-element');
                    $("div.cd-layout__drawer").toggleClass("cd-not-visible").toggleClass("cd-is-visible");
                });
        }

        document.getElementById('nav11')
            .addEventListener('click', function () {
                displayFrame('./src/page/templates/dataInput.html');
            });
    },

    templateButtons: function () {

        document.addEventListener('ContentPageCreated', TemplateButtonListeners, true); // attach click listener to Return Button

        function TemplateButtonListeners() {
            var regex = new RegExp('preparation');
            var programmingRegex = new RegExp('languages');

            $('button.template-return-button').click(function () {
                runCreateOrDestroy.removePageRebuildMain();
            });

            // If preparation page template add click listener for demo-app-0 dialog
            if (regex.test(window.location.search.substring(1))) {
                $('div#demo-app-0').click(function () {
                    displayFrame('http://jhuntr.com');
                });

	            $('div#demo-app-1').click(function () {
		            displayFrame('http://www.vrpassport.io');
	            });

	            $('div#demo-app-2').click(function () {
		            displayFrame('https://stevemieskoski.github.io/TriviaGame/');
	            });

	            $('div#demo-app-2_1').click(function () {
		            displayFrame('https://stevemieskoski.github.io/TriviaGame/');
	            });

            }
            if (regex.test(window.location.search.substring(1))) {
                if (programmingRegex.test(window.location.search.substring(1))) {
                    $('div#circleJavascript').append('<div class="circular"></div>');
                    var JSLevel = document.querySelector('#circleJavascript');

                    JSLevel.appendChild('<div class="circular"></div>')
                }
            }
        }
    },

    contactForm: function () {

        document.addEventListener('ContactFormActive', ContactFormSubmitListen, true); // attach click listener to Return Button

        function ContactFormSubmitListen() {
            $('button.template-return-button').click(function () {
                runCreateOrDestroy.removePageRebuildMain();
            });
        }
    }


};

module.exports = new ButtonControl;