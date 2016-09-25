//'use strict';
define(['jquery', 'scripts/runCreateOrDestroy', 'scripts/buttonControl', 'store', 'scripts/print', 'scripts/download', 'scripts/tweenAnimate'], function ($, runCreateOrDestroy, buttonControl, store, print, download, tweenAnimate) {


    return function (event) {

        /**
         * Handle click on Main Menu panel item
         */
        $('div.element').click(function () {
            if ($("div.cd-layout__drawer").hasClass("cd-not-visible")) {
                var selectedId = "div#" + $(this).attr('id');

                $('div.element').not(selectedId).detach();
                store({beginningLocation: false});
                if (window.innerWidth > window.innerHeight) {
                    console.log(store().selectedList.length); // todo remove debug item

                    store().scene.add(store().objects[store().selectedList[store().selectedList.length - 1]]);
                    runCreateOrDestroy.AnimateAddPageObjects(store, $(this).attr('id'));
                } else {
                    store().scene.add(store().objects[store().selectedList[store().selectedList.length - 1]]);
                    runCreateOrDestroy.AnimateAddPageObjectsVertical(store, $(this).attr('id'));
                }
            }
        });

        /**
         * Handle print button
         */
        $('div#printButton').click(function () {
            print();
        });

        /**
         * Handle download button
         */
        $('button#downloadButton').click(function () {
            download();
        });


        /**
         *  get action or response behavior with manual trigger [ignore JSlint/hint for this item]
         */
        $('button.testActionBtn').click(function () {
            var panelPositionList = {x: -1000, y: 0, z: -3000};
            var Titems = [];
            for (var j = 0; j < 4; j++) {
                var objectThing = new THREE.Object3D();
                objectThing.position.x = panelPositionList.x;
                objectThing.position.y = panelPositionList.y;
                objectThing.position.z = panelPositionList.z;
                Titems.push(objectThing)
            }
            tweenAnimate.Run3d(store().sceneP.children, Titems, store().sceneP, store().camera, store().rendererP, 1000, [6, 6], 0, false);

        });

        /**
         * Display the store object's contents [ignore JSlint/hint for this item]
         */
        // todo figure out a good method to get events from elements when created, but are not yet created.
        $('button.StoreView').click(function () {
            var store = require('store');
            console.log(store());
            var allbuttons = document.getElementsByClassName('template-return-button');
            console.log('all buttons', allbuttons); // todo remove debug item
        });

        /**
         * Handle opening the menu drawer
         */
        // todo find a manner to handle click events in the Iframe to close the menu drawer
        $("#nav-drawer").click(function () {
            var menuDrawer = $("div.cd-layout__drawer");
            menuDrawer.toggleClass("cd-not-visible").toggleClass("cd-is-visible");
            buttonControl.bindMenuButtons();
            if (window.innerWidth < 500) {
                menuDrawer.addClass("drawer-very-small-screen").removeClass("drawer-normal-width");
            } else if (window.innerWidth < 1024) {
                menuDrawer.addClass("drawer-small-screen").removeClass("drawer-normal-width");
            } else {
                menuDrawer.addClass("drawer-normal-width").removeClass("drawer-small-screen");
            }
            document.addEventListener('click', closeMenuClick);

            function closeMenuClick(event) {
                var navWidth = Math.floor(window.innerWidth * 0.2);
                var xPosClick = event.clientX;
                if (navWidth < xPosClick && $("div.cd-layout__drawer").hasClass("cd-is-visible")) {
                    $("div.cd-layout__drawer").toggleClass("cd-not-visible").toggleClass("cd-is-visible");
                }
            }
        });

        /**
         * Handle opening the drawer with buttons to manipulate the presentation of the panel elements
         */
        $("#Main-Display-Animations").click(function () {
            var drawerElement = $("div.cd-layout__drawer-display");
            drawerElement.toggleClass("cd-not-visible").toggleClass("cd-is-visible");
            if (window.innerWidth < 1024) {
                drawerElement.toggleClass("drawer-small-screen-display");
            }
            document.addEventListener('click', closeMenuClickVert);

            function closeMenuClickVert(event) {
                var navHeight = Math.floor(window.innerHeight * 0.2),
                    yPosClick = window.innerHeight - event.clientY,
                    drawerElementVert = $("div.cd-layout__drawer-display");

                if (event.clientX < window.innerWidth - 100) {
                    if (navHeight < yPosClick && drawerElementVert.hasClass("cd-is-visible")) {
                        drawerElementVert.toggleClass("cd-not-visible").toggleClass("cd-is-visible");
                    }
                }
            }
        });

        /**
         * Handle the button animations for the Icon to open the drawer with buttons to manipulate the presentation of the main menu
         */
        $('img.displayOptionIcon').hover(function () {
                $('img.displayOptionIconLL').addClass('display-Option-Icon-Animate-LL');
                $('img.displayOptionIconLU').addClass('display-Option-Icon-Animate-LU');
                $('img.displayOptionIconRL').addClass('display-Option-Icon-Animate-RL');
                $('img.displayOptionIconRU').addClass('display-Option-Icon-Animate-RU');
                $('img.displayOptionIcon').addClass('displayOptionIconArrow');
            },
            function () {
                $('img.displayOptionIconLL').removeClass('display-Option-Icon-Animate-LL');
                $('img.displayOptionIconLU').removeClass('display-Option-Icon-Animate-LU');
                $('img.displayOptionIconRL').removeClass('display-Option-Icon-Animate-RL');
                $('img.displayOptionIconRU').removeClass('display-Option-Icon-Animate-RU');
                $('img.displayOptionIcon').removeClass('displayOptionIconArrow');
            }
        );

        $('img.displayOptionIcon').on('click', function () {

        });

    };

});