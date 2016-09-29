define(['jquery'], function ($) {

    function createPageContent() {
    }

    createPageContent.prototype = {
        constructor: createPageContent,

        loadHtmlFile: function (filename, classes, scene, camera, renderer, orientation) {

            if (orientation === undefined) {
                orientation = window.innerHeight > window.innerWidth;
            }
            var xmlRequest,
                pageElement = document.createElement('div');
            pageElement.className = classes;
            xmlRequest = new XMLHttpRequest();

            xmlRequest.onreadystatechange = function () {

                if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {

                    $(pageElement).html(xmlRequest.responseText);

                    var toggleButton = document.createElement('button');
                    toggleButton.textContent = 'Return';
                    toggleButton.className = 'template-return-button mdl-button-return  mdl-js-button mdl-js-ripple-effect';

                    pageElement.querySelector('div.button-attach').appendChild(toggleButton);
                }

                xmlRequest.onload = function () {
                    var object = new THREE.CSS3DObject(pageElement);
                    object.position.x = 0;
                    object.position.y = 0;
                    object.position.z = 10;
                    object.rotation.y = -0.2;
                    object.name = 'html';
                    scene.add(object);
                    renderer.render(scene, camera);
                };
            };

            xmlRequest.open('GET', filename, true);
            xmlRequest.send();

            xmlRequest.addEventListener('loadend', afterLoadendSetups, false);

            function afterLoadendSetups() {
                if (orientation) {
                    var landscapeMessage = document.createElement('span');
                    landscapeMessage.textContent = 'To better view site rotate to landscape ';
                    landscapeMessage.className = 'better-view-message';
                    if (pageElement.querySelector('div.messageAttach') !== null) {
                        pageElement.querySelector('div.messageAttach').appendChild(landscapeMessage);
                    }
                }
                // dispatch event to button control to attach listeners to template buttons
                var pageCreatedEvent = new Event('ContentPageCreated');
                document.dispatchEvent(pageCreatedEvent);
            }
        }


    };
    return new createPageContent;
});

/*
 Introduction: function () {
 var element = document.createElement('div');
 element.className = 'page';
 element.id = 'IntrodctionPage';

 var heading = document.createElement('h2');
 heading.className = 'h2-page-content';
 heading.textContent = "Introduction";
 element.appendChild(heading);

 var headline = document.createElement('span');
 headline.className = 'introduction';
 headline.textContent = 'text';
 element.appendChild(headline);

 var object = new THREE.CSS3DObject(element);
 object.position.x = 0;
 object.position.y = 0;
 object.position.z = 10;
 object.name = 'IntrodctionPage';
 store().scene.add(object);
 }
 */