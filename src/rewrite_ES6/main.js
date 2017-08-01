import sceneSetup from "./sceneSetupClass.js";
import urlHandler from "./urlHandler.js";




class PersonalSite{
	constructor(THREE, TWEEN, cssContainerId, dataArray, dataObject, dataReverseIds){
		// Initial Setup 
		this.Threejs = THREE; // capture Three.js as an internal object
		this.Tweenjs = TWEEN; // capture Tween.js as an internal object
		this.keepId = null;
		this.dataArray = dataArray;
		this.dataObject = dataObject;
		this.dataReverseId = dataReverseIds;
		this.portrait = window.innerHeight > window.innerWidth;
		this.urlHandler = new urlHandler(dataObject, dataReverseIds);

		this.display = new sceneSetup(THREE, cssContainerId, dataArray);
		this.scene = this.display.scene;
		this.sceneP = this.display.sceneP;
		this.camera = this.display.camera;
		this.cameraP = this.display.cameraP;
		this.renderer = this.display.renderer;
		this.rendererP = this.display.rendererP;
		this.lightH = this.display.lightH;
		this.lightD = this.display.lightD;
		this.objects = this.display.objects;
		this.targets = this.display.targets;
		this.pagePlane = this.display.pagePlane;

		this.buttonListeners();
		this.TemplateButtonListeners();
	}
	
	buttonListeners() {
		document.getElementById('table')
			.addEventListener('click', function (event) {
				this.tweenAnimate(this.targets, 2000, [16, 16]);
			}, false);

		document.getElementById('sphere')
			.addEventListener('click', function (event) {
				this.tweenAnimate(this.targets, 2000, [16, 16]);
			}, false);

		document.getElementById('helix')
			.addEventListener('click', function (event) {
				this.tweenAnimate(this.targets, 2000, [16, 16]);
			}, false);

		document.getElementById('grid')
			.addEventListener('click', function (event) {
				this.tweenAnimate(this.targets, 2000, [16, 16]);
			}, false);
	}

	TemplateButtonListeners() {
		var regex = new RegExp('preparation');
		var programmingRegex = new RegExp('languages');

		$('button.template-return-button').click(function () {
			runCreateOrDestroy.removePageRebuildMain();
		});

		// If preparation page template add click listener for demo-app-0 dialog
		if (regex.test(window.location.search.substring(1))) {
			$('div#demo-app-0').click(function () {
				this.exampleButtonClicked('http://steve-mieskoski-demo-app-2.herokuapp.com');
			});
		}
		if (regex.test(window.location.search.substring(1))) {
			$('div#demo-app-1').click(function () {
				this.exampleButtonClicked('http://steve-mieskoski.herokuapp.com/home');
			});

			if (programmingRegex.test(window.location.search.substring(1))) {
				$('div#circleJavascript').append('<div class="circular"></div>');
				var JSLevel = document.querySelector('#circleJavascript');

				JSLevel.appendChild('<div class="circular"></div>')
			}
		}
	}

	exampleButtonClicked(url) {
		var dialog = document.createElement('dialog');
		dialog.style.cssText = 'width: 95%; height: 95%; z-index: 1; overflow: visible;  overflow-y: scroll; ';
		dialog.id = 'exampleDialog';


		var dialogIframe = document.createElement('iframe');
		dialogIframe.src = url;
		dialogIframe.style.cssText = 'width: 95%; height: 95%; z-index: 1; overflow: visible;  overflow-y: scroll; ';
		dialogIframe.id = 'exampleIframe';

		var closeButton = document.createElement('button');


		document.getElementById('attachOutputs').appendChild(dialog);
		document.getElementById('exampleDialog').appendChild(dialogIframe);

		var closeButtonScript = [
			'<button id="closeDialog"  style="position:absolute; right: 2%; top: 2%;">Close</button>',
			'<script>',
			'var closeDialog = document.getElementById("closeDialog");',
			'closeDialog.addEventListener("click", function() {',
			'exampleDialog.close();',
			' });',
			'</script>'
		].join('\n');

		$(dialog).append(closeButtonScript);

		dialog.showModal();

	}

	tweenAnimate (targets, duration, tweenRate, keepId, incrementStop, cb) {
		return new Promise((resolve, reject) => {
			var i, counter, tweening, Render, object, target;
			var runCreateOrDestroy = require("./runCreateOrDestroy");

			counter = 0;
			this.Tweenjs.removeAll();
			if (incrementStop) {
				runCreateOrDestroy.RemoveBackground();
			}
			for (i = 0; i < this.objects.length; i++) {

				object = this.objects[i];
				target = targets[i];

				new this.Tweenjs.Tween(object.position)
					.to({
						x: target.position.x,
						y: target.position.y,
						z: target.position.z
					}, duration)
					.easing(this.Tweenjs.Easing.Quadratic.Out)
					.start();

				new this.Tweenjs.Tween(object.rotation)
					.to({
						x: target.rotation.x,
						y: target.rotation.y,
						z: target.rotation.z
					}, duration)
					.easing(this.Tweenjs.Easing.Quadratic.InOut)
					.start();

			}

			Render = function () {
				counter++;
				if (counter > 90 && incrementStop) {
					tweening.stop();
					runCreateOrDestroy.AddPageObjects(keepId);
				}
				this.renderer.render(this.scene, this.camera);
			};

			tweening = new this.Tweenjs.Tween(this)

				.to({}, duration * 2)
				.onUpdate(Render)
				.onComplete(function () {
					console.log('Tween Complete');
					if (cb !== undefined) {
						resolve(keepId);
					}
				})
				.start();
		})
	};


	initialPageAdd (keepId) {
		var i;
		for (i = 0; i < this.scene.children.length; i++) {
			if (this.scene.children[i].name === Number(keepId)) {
				this.scene.remove(this.scene.children[i]);
			}
		}
		if (window.innerWidth > window.innerHeight) {
			this.AnimateAddPageObjects(keepId);

		} else {
			this.AnimateAddPageObjectsVertical(keepId);

		}
	}

	/**
	 * remove objects that make up the top level animations and navigation. (i.e. Add Page with Content)
	 * and add the HTML and content to fill page background
	 * */
	AddPageObjects (keepId) {

		this.urlHandler.checkNavState(keepId);

		var rendererAttach = document.getElementById('container');

		this.ClearScene(keepId)
			.then(
			this.addPageObjects(keepId, rendererAttach).then(() => {
				var classes, templatePath;
				templatePath = this.data[keepId].template;
				if (this.portrait) {
					classes = 'page page-vertical';
				} else {
					classes = 'page page-horizontal';
				}
				this.loadHtmlFile(templatePath, classes, this.scene, this.camera, this.renderer, this.portrait);
			})
			);

		this.camera.position.z = 1000;

		this.renderer.setSize(window.innerWidth, window.innerHeight, true);

		this.renderer.render(this.scene, this.camera); // to c&p

		this.backgroundPlacer();
	}

	AnimateAddPageObjects (keepId, fromResize) {

		this.ClearScene(keepId);

		var i, j, objectfly,
			selectFly = [],
			panelPositions = [],
			panelPositionList = [{x: 1000, y: 0}, {x: 1000, y: -200}, {x: -1000, y: -600}, {
				x: -1000,
				y: -200
			}, {x: -1000, y: 200}, {x: -1000, y: 0}, {x: -1000, y: 400}, {x: -1000, y: -400}];

		for (j = panelPositionList.length - 1; j >= 0; j--) {
			panelPositions.push(panelPositionList.splice(j, 1)[0]);
		}

		for (i = 0; i < this.objects.length; i++) {
			objectfly = new this.threejs.Object3D();
			if (i === Number(keepId)) {
				objectfly.position.z = 750;
				objectfly.rotation.y = Math.PI * 2;
			} else {

				objectfly.position.x = panelPositions[i].x;
				objectfly.position.y = panelPositions[i].y;
				objectfly.position.z = Math.random() - 1000;

			}
			selectFly.push(objectfly);
		}


		if (fromResize) {

			this.tweenAnimate(this.objects, selectFly, this.scene, this.camera, this.renderer, 2000, [6, 6], keepId, false);
		} else {
			this.tweenAnimate(this.objects, selectFly, this.scene, this.camera, this.renderer, 2000, [6, 6], keepId, true);
		}

	}


	AnimateAddPageObjectsVertical (keepId, fromResize) {
		this.ClearScene(keepId);
		var i, j, xFly, objectfly, picked,
			selectFly = [],
			panelPositions = [],
			panelPositionList = [{x: -1000, y: -400}, {x: -1000, y: 0}, {x: -1000, y: 200}, {
				x: -1000,
				y: 400
			}, {x: 1000, y: -400}, {x: 1000, y: 0}, {x: 1000, y: 200}, {x: 1000, y: 400}, {x: 1000, y: -600}];
//
		for (j = panelPositionList.length - 1; j >= 0; j--) {
			picked = Math.floor(Math.random() * panelPositionList.length);
			panelPositions.push(panelPositionList.splice(picked, 1)[0]);
		}

		for (i = 0; i < this.objects.length; i++) {
			objectfly = new this.threejs.Object3D();
			if (i === Number(keepId)) {
				objectfly.position.z = 750;
				objectfly.rotation.y = Math.PI * 2;

			} else {
				xFly = Math.round(Math.random() * 2 - 1);
				if (Math.abs(xFly) === 0) {
					xFly = -1;
				}
				objectfly.position.x = -290;
				objectfly.position.y = -i * 180 + 500;
				objectfly.position.z = Math.random() - 1000;

			}
			selectFly.push(objectfly);
		}

		if (fromResize) {
			tweenAnimate.Run(this.objects, selectFly, this.scene, this.camera, this.renderer, 2000, [6, 6], keepId, false);
		} else {
			tweenAnimate.Run(this.objects, selectFly, this.scene, this.camera, this.renderer, 2000, [6, 6], keepId, true);
		}
	}

	RemoveBackground () {
		this.rendererP.render(this.sceneP, this.camera);
	}

	/**
	 * return (add back) the objects that made up the top level animations and navigation. (i.e. Remove Page with Content)
	 * */
	removePageRebuildMain () {
		var varyTransitions = [this.targets.table, this.targets.sphere, this.targets.helix, this.targets.grid],
			transition = varyTransitions[Math.floor(Math.random()) + Math.floor(Math.random()) + Math.floor(Math.random())];


		removePage.Objects();

		urlHandler.checkNavState();

		removePage.RebuildMainPage(store);

		tweenAnimate.Run(this.objects, transition, this.scene, this.camera, this.renderer, 500, [6, 6]);
	}

	ClearScene (keepId, returnResult) {
		return new Promise((resolve, reject) =>{
			if (this.selectedList.hasOwnProperty('length')) {
				if (this.selectedList.length > 0) {
					if (this.selectedList[this.selectedList.length - 1] !== keepId) {
						this.ClearableElementsPresent(keepId);
					}
				} else {
					this.selectedList = keepId;
				}
			}
			if (returnResult) {
				resolve(keepId);
			} else {
				resolve();
			}
		})

	}

	ClearableElementsPresent (keepId) {
		var i;

		for (i = 0; i < this.scene.children.length; i++) {
			if (this.scene.children[i].name === 'html') {
				this.scene.remove(this.scene.children[i]);
			}
		}
		for (i = this.sceneP.children.length - 1; i >= 0; i--) {
			this.sceneP.remove(this.sceneP.children[i]);
		}
		this.selectedList = keepId;
	}


	addPageObjects (keepId, Attach, callback) {
		return new Promise((resolve, reject) =>{
			var i;

			for (i = 0; i < this.scene.children.length; i++) {
				if (this.scene.children[i].name === Number(keepId)) {
					this.scene.remove(this.scene.children[i]);
				}
			}

			$('span.page-title-name').addClass('hide-element');
			for (i = 0; i < this.pagePlane[keepId].children.length; i++) {
				this.sceneP.add(this.pagePlane[keepId].children[i].clone(true));
			}

			this.sceneP.add(this.lightD.clone(true));
			this.rendererP.render(this.sceneP, this.camera);
			this.rendererP.domElement.className = 'currentPageDisplay';
			Attach.appendChild(this.rendererP.domElement);
			$("canvas").addClass('currentPageDisplay');

			resolve(keepId);
		})

	}

	addHtmlContent (store, keepId, callBack) {
		var classes, templatePath;
		templatePath = this.data[keepId].template;
		if (this.portrait) {
			classes = 'page page-vertical';
		} else {
			classes = 'page page-horizontal';
		}
		callBack(templatePath, classes, this.scene, this.camera, this.renderer, this.portrait);
	}

	resetCamera (position, rotation, controlCenter) {
		this.camera.position.set(position.x, position.y, position.z);
		this.camera.rotation.set(rotation.x, rotation.y, rotation.z);
		this.controls.center.set(controlCenter.x, controlCenter.y, controlCenter.z);
		this.controls.update();
		this.renderer.render();
	}


	backgroundPlacer () {
		this.portrait = window.innerHeight > window.innerWidth;
		this.cameraP.aspect = window.innerWidth / window.innerHeight;
		this.cameraP.updateProjectionMatrix();
		this.rendererP.setSize(window.innerWidth, window.innerHeight);

		if ($('canvas').hasClass('currentPageDisplay')) {
			if (window.innerHeight > window.innerWidth) {
				$('span.better-view-message').detach();

				$('div.page').addClass('page-vertical').removeClass('page-horizontal');
				$('canvas').addClass('canvasVertical');
				this.camera.aspect = window.innerHeight / window.innerWidth;
				this.renderer.setSize(window.innerHeight, window.innerWidth, true);
			}
			else {
				$('div.page').removeClass('page-vertical').addClass('page-horizontal');
				$('canvas').removeClass('canvasVertical');
				this.camera.aspect = window.innerWidth / window.innerHeight;
				this.renderer.setSize(window.innerWidth, window.innerHeight, true);
			}
			this.camera.position.z = 1000;
			this.camera.updateProjectionMatrix();
			this.rendererP.render(this.sceneP, this.camera);
		} else {
			this.camera.updateProjectionMatrix();
			this.rendererP.render(this.sceneP, this.camera);
		}
		if ($('canvas').hasClass('currentPageDisplay')) {
			this.camera.position.z = 1000;
		}
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight, true);
		this.renderer.render(this.scene, this.camera);
	};

	loadHtmlFile (filename, classes, scene, camera, renderer, orientation) {

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


}

