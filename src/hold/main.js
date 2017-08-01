import sceneSetup from "./sceneSetupClass.js";
import UrlHandler from "./urlHandler.js";

var _ = require('lodash');
var $ = require("../lib/jquery.min.js");

export class PersonalSite {
	constructor(THREE, TWEEN, cssContainerId, dataArray, dataObject, dataReverseIds) {
		// Initial Setup 
		this.Threejs = THREE; // capture Three.js as an internal object
		this.Tweenjs = TWEEN; // capture Tween.js as an internal object
		this.keepId = null;
		this.dataArray = dataArray;
		this.dataObject = dataObject;
		this.dataReverseIds = dataReverseIds;
		this.portrait = window.innerHeight > window.innerWidth;
		this.cssContainerId = cssContainerId;
		this.beginningLocation = "index";
		this.selectedList = [];
		$('div#' + cssContainerId).addClass('setupPageBase');

		this.urlHandler = new UrlHandler(this.dataObject, this.dataReverseIds);

		// scene / page content setups
		this.display = new sceneSetup(this.Threejs, this.cssContainerId, this.dataArray, this.dataObject);
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
		//	this.mainMenuListener();


		this.urlInit();
	}

	//setup Top
	init() {

		//function start() {
		var target;
		if (window.innerWidth < window.innerHeight) {
			target = this.targets.column;
		} else {
			target = this.targets.table;
		}


		let windowResize = this.onWindowResize();
		let innerTween = this.Tweenjs;

		window.addEventListener('resize', windowResize, false);
		this.renderer.render(this.scene, this.camera);
		this.mainMenuListener();
		this.tweenAnimate(target, 2000, [16, 16])
			.then(() => {

			});
		animate();

		function animate() {
			requestAnimationFrame(animate);
			innerTween.update();
		}

	}

	urlInit() {
		this.urlHandler.checkInitUrl(this.dataReverseIds, window.location.search.substring(1), function (vars) {
			console.log(vars);
			this.selectedList = [vars];
			this.initialPageAdd(vars);
		});

		this.urlHandler.handleBackForward(function (varsPage, beginningLocation) {
			if (beginningLocation == true && this.beginningLocation == true) {
			} else {
				if (beginningLocation) {
					this.beginningLocation = true;
				}
				this.scene.add(this.objects[this.selectedList[this.selectedList.length - 1]]);
				this.AnimateAddPageObjects(String(varsPage));
			}
		}, function () {
			this.removePageRebuildMain();
		});

	}

	// Button Control
	mainMenuListener() {
		// listen for click event on a topic panel
		$('div.element').click((evt) => {
			console.log(evt);
			//if ($("div.cd-layout__drawer").hasClass("cd-not-visible")) {
			var selectedId = "div#" + $(evt.target).attr('id');

			$('div.element').not(selectedId).detach(); // keep the clicked topic panel and remove the rest
			this.beginningLocation = false; // todo Figure out why this is here.  Believe it is to signify that further click are not from the main menu.
			console.log(this.objects, this.objects[$(evt.target).attr('id')]);
			this.scene.add(this.objects[$(evt.target).attr('id')]);
			if (window.innerWidth > window.innerHeight) {
				/*if(_.size(this.selectedList) > 0){
					this.scene.add(this.objects[this.selectedList[this.selectedList.length - 1]]);
				} */

				this.AnimateAddPageObjects($(evt.target).attr('id'));
			} else {
				//this.scene.add(this.objects[this.selectedList[this.selectedList.length - 1]]);
				this.AnimateAddPageObjectsVertical($(evt.target).attr('id'));
			}
			//}
		});

		/**
		 * Handle opening the drawer with buttons to manipulate the presentation of the panel elements
		 */
		$("#Main-Display-Animations").click(() => {
			var drawerElement = $("div.cd-layout__drawer-display");
			drawerElement.toggleClass("cd-not-visible").toggleClass("cd-is-visible");
			if (window.innerWidth < 1024) {
				drawerElement.toggleClass("drawer-small-screen-display");
			}
			document.addEventListener('click', closeMenuClickVert);
		});

		function closeMenuClickVert(event) {
			var navHeight = Math.floor(window.innerHeight * 0.2),
				yPosClick = window.innerHeight - event.clientY,
				drawerElementVert = $("div.cd-layout__drawer-display");

			if (event.clientX < window.innerWidth - 100) {
				if (navHeight < yPosClick && drawerElementVert.hasClass("cd-is-visible")) {
					drawerElementVert.toggleClass("cd-not-visible").toggleClass("cd-is-visible");
				}
			}
		};

		/**
		 * Handle the button animations for the Icon to open the drawer with buttons to manipulate the presentation of the main menu
		 */
		$('img.displayOptionIcon').hover(() => {
				$('img.displayOptionIconLL').addClass('display-Option-Icon-Animate-LL');
				$('img.displayOptionIconLU').addClass('display-Option-Icon-Animate-LU');
				$('img.displayOptionIconRL').addClass('display-Option-Icon-Animate-RL');
				$('img.displayOptionIconRU').addClass('display-Option-Icon-Animate-RU');
				$('img.displayOptionIcon').addClass('displayOptionIconArrow');
			},
			() => {
				$('img.displayOptionIconLL').removeClass('display-Option-Icon-Animate-LL');
				$('img.displayOptionIconLU').removeClass('display-Option-Icon-Animate-LU');
				$('img.displayOptionIconRL').removeClass('display-Option-Icon-Animate-RL');
				$('img.displayOptionIconRU').removeClass('display-Option-Icon-Animate-RU');
				$('img.displayOptionIcon').removeClass('displayOptionIconArrow');
			}
		);

		$('img.displayOptionIcon').on('click', () => {

		});
	}

	buttonListeners() {
		document.getElementById('table')
			.addEventListener('click', (event) => {
				this.tweenAnimate(this.targets, 2000, [16, 16]);
			}, false);

		document.getElementById('sphere')
			.addEventListener('click', (event) => {
				this.tweenAnimate(this.targets, 2000, [16, 16]);
			}, false);

		document.getElementById('helix')
			.addEventListener('click', (event) => {
				this.tweenAnimate(this.targets, 2000, [16, 16]);
			}, false);

		document.getElementById('grid')
			.addEventListener('click', (event) => {
				this.tweenAnimate(this.targets, 2000, [16, 16]);
			}, false);
	}

	TemplateButtonListeners() {
		var regex = new RegExp('preparation');
		var programmingRegex = new RegExp('languages');

		$('button.template-return-button').click(function () {
			this.removePageRebuildMain();
		});

		// If preparation page template add click listener for demo-app-0 dialog
		if (regex.test(window.location.search.substring(1))) {
			$('div#demo-app-0').click(() => {
				this.exampleButtonClicked('http://steve-mieskoski-demo-app-2.herokuapp.com');
			});
		}
		if (regex.test(window.location.search.substring(1))) {
			$('div#demo-app-1').click(() => {
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

	// Tween Animate
	tweenAnimate(targets, duration, tweenRate, keepId, incrementStop, cb) {
		return new Promise((resolve, reject) => {
			var i, counter, tweening, Render, object, target;
			console.log('tween animate"');
			counter = 0;
			this.Tweenjs.removeAll();
			if (incrementStop) {
				this.RemoveBackground();
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

			Render = () => {
				counter++;
				if (counter > 90 && incrementStop) {
					tweening.stop();
					this.AddPageObjects(keepId);
				}
				this.renderer.render(this.scene, this.camera);
			};

			tweening = new this.Tweenjs.Tween(this)

				.to({}, duration * 2)
				.onUpdate(Render)
				.onComplete(() => {
					console.log('Tween Complete');
					if (cb !== undefined) {
						resolve(keepId);
					} else {
						resolve();
					}
				})
				.start();
		})
	};

	// runCreateOrDestroy
	initialPageAdd(keepId) {
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
	AddPageObjects(keepId) {

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
					this.loadHtmlFile(templatePath, classes);
				})
			);

		this.camera.position.z = 1000;

		this.renderer.setSize(window.innerWidth, window.innerHeight, true);

		this.renderer.render(this.scene, this.camera); // to c&p

		this.backgroundPlacer();
	}

	AnimateAddPageObjects(keepId, fromResize) {

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
			objectfly = new this.Threejs.Object3D();
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

			this.tweenAnimate(selectFly, 2000, [6, 6], keepId, false);
		} else {
			this.tweenAnimate(selectFly, 2000, [6, 6], keepId, true);
		}

	}


	AnimateAddPageObjectsVertical(keepId, fromResize) {
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
			objectfly = new this.Threejs.Object3D();
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
			this.tweenAnimate(selectFly, 2000, [6, 6], keepId, false);
		} else {
			this.tweenAnimate(selectFly, 2000, [6, 6], keepId, true);
		}
	}

	RemoveBackground() {
		this.rendererP.render(this.sceneP, this.camera);
	}

	/**
	 * return (add back) the objects that made up the top level animations and navigation. (i.e. Remove Page with Content)
	 * */
	removePageRebuildMain() {
		var varyTransitions = [this.targets.table, this.targets.sphere, this.targets.helix, this.targets.grid],
			transition = varyTransitions[Math.floor(Math.random()) + Math.floor(Math.random()) + Math.floor(Math.random())];


		this.RebuildObjects();

		this.urlHandler.checkNavState();

		this.RebuildMainPage();

		this.tweenAnimate(transition, 500, [6, 6]);
	}

	// create new page
	ClearScene(keepId, returnResult) {
		return new Promise((resolve, reject) => {
			if (this.selectedList.hasOwnProperty('length')) {
				if (this.selectedList.length > 0) {
					if (this.selectedList[this.selectedList.length - 1] !== keepId) {
						this.ClearableElementsPresent(keepId);
					}
				} else {
					this.selectedList = [keepId];
				}
			}
			if (returnResult) {
				resolve(keepId);
			} else {
				resolve();
			}
		})

	}

	ClearableElementsPresent(keepId) {
		var i;

		for (i = 0; i < this.scene.children.length; i++) {
			if (this.scene.children[i].name === 'html') {
				this.scene.remove(this.scene.children[i]);
			}
		}
		for (i = this.sceneP.children.length - 1; i >= 0; i--) {
			this.sceneP.remove(this.sceneP.children[i]);
		}
		this.selectedList = [keepId];
	}

	addPageObjects(keepId, Attach) {
		return new Promise((resolve, reject) => {
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

	addHtmlContent(keepId, callBack) {
		var classes, templatePath;
		templatePath = this.data[keepId].template;
		if (this.portrait) {
			classes = 'page page-vertical';
		} else {
			classes = 'page page-horizontal';
		}
		callBack(templatePath, classes, this.scene, this.camera, this.renderer, this.portrait);
	}

	resetCamera(position, rotation, controlCenter) {
		this.camera.position.set(position.x, position.y, position.z);
		this.camera.rotation.set(rotation.x, rotation.y, rotation.z);
		//this.controls.center.set(controlCenter.x, controlCenter.y, controlCenter.z);
		//this.controls.update();
		this.renderer.render();
	}

	// background placer
	backgroundPlacer() {
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

	// create page content
	loadHtmlFile(filename) {
		//, this.scene, this.camera, this.renderer, this.portrait
		if (this.portrait === undefined) {
			this.portrait = window.innerHeight > window.innerWidth;
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
				var object = new this.Threejs.CSS3DObject(pageElement);
				object.position.x = 0;
				object.position.y = 0;
				object.position.z = 10;
				object.rotation.y = -0.2;
				object.name = 'html';
				this.scene.add(object);
				this.renderer.render(this.scene, this.camera);
			};
		};

		xmlRequest.open('GET', filename, true);
		xmlRequest.send();

		xmlRequest.addEventListener('loadend', afterLoadendSetups, false);

		function afterLoadendSetups() {
			if (this.portrait) {
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

	// remove page
	RebuildObjects() {
		var i;
		for (i = this.sceneP.children.length - 1; i >= 0; i--) {
			this.sceneP.remove(this.sceneP.children[i]);
		}

		$('span.page-title-name').removeClass('hide-element');
		$("canvas").remove();
		this.rendererP.render(this.sceneP, this.camera);
	}

	RebuildMainPage() {
		var i,
			replaceObject = Object.assign({}, this.objects);

		$('div.primary-view').removeClass('primary-view');
		$('div.navItems >  button.togglePage').remove();
		for (i = this.scene.children.length - 1; i >= 0; i--) {
			this.scene.remove(this.scene.children[i]);
		}

		for (i = 0; i < this.objects.length; i++) {
			replaceObject[i].position.x = -1800;
			replaceObject[i].position.y = Math.random() * 50 - 425;
			replaceObject[i].position.z = -3300;

			this.scene.add(replaceObject[i]);
		}
		this.camera.position.z = 1000;
	}


	onWindowResize() {
		console.log('window resize');
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
			} else {

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
		if (window.innerHeight > window.innerWidth) {
			this.AnimateAddPageObjectsVertical(this.selectedList, true);
		} else {
			this.AnimateAddPageObjects(this.selectedList, true);
		}


	};

}

