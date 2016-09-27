'use strict';
define(['require', 'jquery', 'scripts/runCreateOrDestroy', 'scripts/createPageContent', 'top/setupTop', 'top/data', 'store', 'scripts/removePage', 'scripts/tweenAnimate', 'top/displayFrame'], function (require, $, runCreateOrDestroy, createPageContent, setupTop, data, store, removePage, tweenAnimate, displayFrame) {
    var store = require('../store');
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
           // var topFunctions = require('./runCreateOrDestroy'),
            //    data = require('../top/data');

            $('button.mdl-button-mod').click(function () {
                if ($(this).attr('id').match(/\d+/)[0] < 9) {
                    $("div.cd-layout__drawer").toggleClass("cd-not-visible").toggleClass("cd-is-visible");
                    //$("div.cd-layout__drawer").toggleClass("cd-is-visible");

                    /*     if (store().sceneP.length > 0) {
                     removePage.Objects();
                     }*/
                    runCreateOrDestroy.AnimateAddPageObjects(store, $(this).attr('id').match(/\d+/)[0]);
                    // todo fix view/ camera zoomed in issue following menu link from one page to another.
                }
            });

            document.getElementById('nav9')
                .addEventListener('click', function () {
                    $("div.cd-layout__drawer").toggleClass("cd-not-visible").toggleClass("cd-is-visible");
                    //$("div.cd-layout__drawer").toggleClass("cd-is-visible");
                });


            // todo LOW IMPORTANCE change so that it appears even when the drawer is open before the canvas is created
            if ($("div.cd-layout__drawer").hasClass("cd-is-visible") && $('canvas').hasClass('currentPageDisplay')) {
                $('#nav10').removeClass('hide-element');
                document.getElementById('nav10')
                    .addEventListener('click', function () {
                        runCreateOrDestroy.removePageRebuildMain();
                        $('#nav9').addClass('hide-element');
                        $("div.cd-layout__drawer").toggleClass("cd-not-visible").toggleClass("cd-is-visible");
                        //$("div.cd-layout__drawer").toggleClass("cd-is-visible");
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

                $('button.template-return-button').click(function () {
                    runCreateOrDestroy.removePageRebuildMain();
                });

                // If preparation page template add click listener for demo-app-0 dialog
                if (regex.test(window.location.search.substring(1))) {
                    $('div#demo-app-0').click(function () {
                        displayFrame('http://steve-mieskoski-demo-app-2.herokuapp.com');
                    });
                }
                if (regex.test(window.location.search.substring(1))) {
                    $('div#demo-app-1').click(function () {
                        displayFrame('http://steve-mieskoski.herokuapp.com/home');
                    });
                }
            }
        },

        contactButton: function(){
            $('button#contactButton').click(function () {
                displayFrame('./src/page/templates/contactForm.html');
            });
        }


    };

    return new ButtonControl;
});