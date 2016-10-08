
define(['require', 'jquery'], function (require, $) {

    'use strict';
    function CreateNewPage() {
    }

    // todo change from using data as an input variable to just using the filePath.
    CreateNewPage.prototype = {
        constructor: CreateNewPage,

        ClearScene: function (store, keepId, callback) {
            if (store().selectedList.hasOwnProperty('length')) {
                if (store().selectedList.length > 0) {
                    if (store().selectedList[store().selectedList.length - 1] !== keepId) {
                        this.ClearableElementsPresent(store, keepId);
                    } else {
                        console.log('same keepid in clearScene selectedList', store().selectedList); // todo remove debug item
                    }
                } else {
                    store({selectedList: keepId});
                }
            }
            if (typeof callback === "function") {
                callback(store, keepId);
            }
        },

        ClearableElementsPresent: function (store, keepId) {
            var i;

            for (i = 0; i < store().scene.children.length; i++) {
                if (store().scene.children[i].name === 'html') {
                    store().scene.remove(store().scene.children[i]);
                }
            }
            for (i = store().sceneP.children.length - 1; i >= 0; i--) {
                store().sceneP.remove(store().sceneP.children[i]);
            }
            store({selectedList: keepId});
        },


        addPageObjects: function (store, keepId, Attach, callback) {
            var i;

            for (i = 0; i < store().scene.children.length; i++) {
            if (store().scene.children[i].name === Number(keepId)) {
                store().scene.remove(store().scene.children[i]);
            }}

            $('span.page-title-name').addClass('hide-element');
            for (i = 0; i < store().pagePlane[keepId].children.length; i++) {
                store().sceneP.add(store().pagePlane[keepId].children[i].clone(true));
            }
            //store().sceneP.add(store().lightH.clone(true));
            store().sceneP.add(store().lightD.clone(true));
            //store().sceneP.add(new THREE.DirectionalLightHelper(store().lightD.clone(true), 1000));

            store().rendererP.render(store().sceneP, store().camera);
            store().rendererP.domElement.className = 'currentPageDisplay';
            Attach.appendChild(store().rendererP.domElement);
            $("canvas").addClass('currentPageDisplay');

            callback(store, keepId);
            return store();
        },

        addHtmlContent: function (store, keepId, callBack) {
            var classes, templatePath;
            templatePath = store().data[keepId].template;
            if (store().portrait) {
                classes = 'page page-vertical';
            } else {
                classes = 'page page-horizontal';
            }
            callBack(templatePath, classes, store().scene, store().camera, store().renderer, store().portrait);
        },

        resetCamera: function (position, rotation, controlCenter){
        store().camera.position.set(position.x, position.y, position.z);
        store().camera.rotation.set(rotation.x, rotation.y, rotation.z);
        store().controls.center.set(controlCenter.x, controlCenter.y, controlCenter.z);
        store().controls.update();
        store().renderer.render();
    }

    };


    return new CreateNewPage;

});
