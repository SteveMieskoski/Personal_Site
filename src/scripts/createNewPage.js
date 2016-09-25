
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
          //  store().scene.add(store().objects[store().selectedList[store().selectedList.length - 1]]);
            var i;

            for (i = 0; i < store().scene.children.length; i++) {


                if (store().scene.children[i].name === 'html') {
                    // gave a  Cannot read property 'name' of undefined
                    store().scene.remove(store().scene.children[i]);
                }
            }
            for (i = store().sceneP.children.length - 1; i >= 0; i--) {
                store().sceneP.remove(store().sceneP.children[i]);
            }
            store({selectedList: keepId});
        },


        addPageObjects: function (store, keepId, Attach, callback) {
            for (var i = 0; i < store().scene.children.length; i++) {
            if (store().scene.children[i].name === Number(keepId)) {
                store().scene.remove(store().scene.children[i]);
            }}

            $('span.page-title-name').addClass('hide-element');
            console.log('store in addpageobjects',store()); // todo remove debug item
            console.log('store().pagePlane in addpageobjects', store().pagePlane); // todo remove debug item
            for (var i = 0; i < store().pagePlane[keepId].children.length; i++) {
                store().sceneP.add(store().pagePlane[keepId].children[i].clone(true));
            }

            store().rendererP.render(store().sceneP, store().camera);
            store().rendererP.domElement.className = 'currentPageDisplay';
            Attach.appendChild(store().rendererP.domElement);
            $("canvas").addClass('currentPageDisplay');

            callback(store, keepId);
            return store();
        },

        addHtmlContent: function (store, keepId, callBack) {
            var classes;
            var templatePath = store().data[keepId].template;

            if (store().portrait) {
                classes = 'page page-vertical';
            } else {
                classes = 'page page-horizontal';
            }

            callBack(templatePath, classes, store().scene, store().camera, store().renderer, store().portrait);
        }

    };


    return new CreateNewPage;

});

/*
 ClearScene: function(store, keepId){
 if(store().selectedList[store().selectedList.length-1] !== keepId) {


 console.log(store().objects[store().selectedList.length -2]); // todo remove debug item
 for (var i = 0; i < store().scene.children.length; i++) {
 if (store().scene.children[i].name === Number(keepId)) {
 console.log('top panel to remove', store().scene.children[i]); // todo remove debug item
 // store().scene.children[i].visible = false;
 store().scene.remove(store().scene.children[i]);
 }

 for (var i = 0; i < store().scene.children.length; i++) {
 if (store().scene.children[i].name === Number(keepId)) {
 console.log('top panel to remove', store().scene.children[i]); // todo remove debug item
 store().scene.remove(store().scene.children[i]);
 }
 }

 if (store().scene.children[i].name === 'html') {
 // gave a  Cannot read property 'name' of undefined
 console.log('html to remove', store().scene.children[i]); // todo remove debug item
 store().scene.remove(store().scene.children[i]);
 }
 }
 //   for (var i = store().sceneP.children.length - 1; i >= 0; i--) {
 //       store().sceneP.remove(store().sceneP.children[i]);
 //  }
 } else {

 }

 //     for (var i = store().scene.children.length - 1; i >= 0; i--){
 //          store().scene.remove(store().scene.children[i]);
 //      }
 },
 */