'use strict';

var $ = require("../lib/jquery.min.js");

var store = require("../store");
var tweenAnimate = require("../scripts/tweenAnimate");

module.exports = function () {
    var element,
        object,
        objects = [],
        target,
        toggleButton,
        xmlRequest,
        orientation,
        pageElement,
        landscapeMessage,
        pageCreatedEvent,
        targets = [];

    element = document.createElement('div');
    element.className = 'element contactElement';
    element.id = 'contactElement';
    element.style.backgroundColor = 'rgb(37, 81, 118)';

    if (window.innerHeight > window.innerWidth) {
        orientation = window.innerHeight > window.innerWidth;
    }

    pageElement = document.createElement('div');
    pageElement.className = 'ContactForm';
    xmlRequest = new XMLHttpRequest();

    xmlRequest.onreadystatechange = function () {
        if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
            $(element).html(xmlRequest.responseText);
            toggleButton = document.createElement('button');
            toggleButton.textContent = 'Close';
            toggleButton.className = 'template-return-button mdl-button-return  mdl-js-button mdl-js-ripple-effect';
            element.querySelector('div#closeContact').appendChild(toggleButton);
        }
    };

    xmlRequest.open('GET', './src/page/templates/contactForm.html', true);
    xmlRequest.send();
    xmlRequest.addEventListener('loadend', afterLoadendSetups, false);

    function afterLoadendSetups() {
        if (orientation) {
            landscapeMessage = document.createElement('span');
            landscapeMessage.textContent = 'To better view site rotate to landscape ';
            landscapeMessage.className = 'better-view-message';
            if (element.querySelector('div.messageAttach') !== null) {
                element.querySelector('div.messageAttach').appendChild(landscapeMessage);
            }
        }
        // dispatch event to button control to attach listeners to template buttons
        pageCreatedEvent = new Event('ContentPageCreated');
        document.dispatchEvent(pageCreatedEvent);
    }

    object = new THREE.CSS3DObject(element);
    object.position.x = -7000;
    object.position.y = 2975;
    object.position.z = -8000;
    store().scene.add(object);
    store().renderer.render(store().scene, store().camera);

    objects.push(object);

    target = new THREE.Object3D();
    target.position.x = 0;
    target.position.y = 0;
    target.position.z = 100;
    target.rotation.y = Math.PI * 2;
    targets.push(target);

    tweenAnimate.Run(objects, targets, store().scene, store().camera, store().renderer, 1000, [6, 6], 9999, false);

};

