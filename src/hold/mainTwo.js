import sceneSetup from "./sceneSetupClass.js";
import UrlHandler from "./urlHandler.js";

let _ = require('lodash');
let $ = require("../lib/jquery.min.js");

export class PersonalSite {
	constructor(THREE, TWEEN, cssContainerId, dataArray, dataObject, dataReverseIds) {
		// Setup
		this.Threejs = THREE; // capture Three.js as an internal object
		this.Tweenjs = TWEEN; // capture Tween.js as an internal object

		// Setup Initial values
		this.keepId = 9999;
		this.dataArray = dataArray;
		this.dataObject = dataObject;
		this.dataReverseIds = dataReverseIds;
		this.portrait = window.innerHeight > window.innerWidth;
		this.cssContainerId = cssContainerId;
		this.beginningLocation = "index";
		this.selectedList = [];
		this.nonViewingArrange = [{x: 1000, y: 0}, {x: 1000, y: -200}, {x: -1000, y: -600}, {
			x: -1000, y: -200
		}, {x: -1000, y: 200}, {x: -1000, y: 0}, {x: -1000, y: 400}, {x: -1000, y: -400}];
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

		//	this.buttonListeners();
		//	this.TemplateButtonListeners();
		//	this.mainMenuListener();


		this.urlInit();
	}

	//setup Top
	init() {

		//function start() {
		let target;
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
		this.urlHandler.checkInitUrl(this.dataReverseIds, window.location.search.substring(1), (value) => {
			if(value === "MainPage") {
				this.removePageRebuildMain();
			} else {
				console.log('initial Page');
				this.selectedList = [value];
				this.initialPageAdd(value);
			}
		});

		this.urlHandler.handleBackForward((valuePage, beginningLocation) => {
			if (beginningLocation == true && this.beginningLocation == true) {
			} else {
				if (beginningLocation) {
					this.beginningLocation = true;
				}
				this.scene.add(this.objects[this.selectedList[this.selectedList.length - 1]]);
				this.AnimateAddPageObjects(String(valuePage));
			}
		}, () => {
			this.removePageRebuildMain();
		});

	}

	// Button Control
	mainMenuListener() {
		// listen for click event on a topic panel
		$('div.element').click((evt) => {
			console.log(evt);
			let selectedId = "div#" + $(evt.target).attr('id');

			$('div.element').not(selectedId).detach(); // keep the clicked topic panel and remove the rest
			this.beginningLocation = false; // todo Figure out why this is here.  Believe it is to signify that further click are not from the main menu.
			console.log(this.objects, this.objects[$(evt.target).attr('id')]);
			this.keepId = $(evt.target).attr('id');
			this.scene.add(this.objects[$(evt.target).attr('id')]);
			this.AnimateAddPageObjects($(evt.target).attr('id'));
			if (window.innerWidth > window.innerHeight) {
			}
		});
	}

	// Tween Animate
	tweenAnimate(targets, duration, tweenRate, incrementStop, cb) {
		return new Promise((resolve, reject) => {
			let i, counter, tweening, Render, object, target;
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
					this.AddPageObjects(this.keepId);
				}
				this.renderer.render(this.scene, this.camera);
			};

			tweening = new this.Tweenjs.Tween(this)

				.to({}, duration * 2)
				.onUpdate(Render)
				.onComplete(() => {
					console.log('Tween Compvare');
					if (cb !== undefined) {
						resolve(this.keepId);
					} else {
						resolve();
					}
				})
				.start();
		})
	};

	// runCreateOrDestroy
	initialPageAdd() {
		let i;
		for (i = 0; i < this.scene.children.length; i++) {
			if (this.scene.children[i].name === Number(this.keepId)) {
				this.scene.remove(this.scene.children[i]);
			}
		}
		this.AnimateAddPageObjects(this.keepId);
		if (window.innerWidth > window.innerHeight) {
		}
	}

	/**
	 * remove objects that make up the top level animations and navigation. (i.e. Add Page with Content)
	 * and add the HTML and content to fill page background
	 * */
	AddPageObjects() {

		this.urlHandler.checkNavState(this.keepId);

		let rendererAttach = document.getElementById('container');

		this.ClearScene()
			.then(() => {
				this.addPageObjects(rendererAttach)
					.then(() => {
						let classes, templatePath;
						templatePath = this.dataObject[this.keepId].template;
						if (this.portrait) {
							classes = 'page page-vertical';
						} else {
							classes = 'page page-horizontal';
						}
						this.loadHtmlFile(templatePath, classes);
					})
					.catch((err) => {
						console.log(err);
					})
			})
			.catch((err) => {
				console.log(err);
			});

		this.camera.position.z = 1000;

		this.renderer.setSize(window.innerWidth, window.innerHeight, true);

		this.renderer.render(this.scene, this.camera); // to c&p

		this.backgroundPlacer();
	}

	AnimateAddPageObjects(fromResize) {

		this.ClearScene()
			.then((resultId) => {
				let i, j, objectfly,
					selectFly = [],
					panelPositions = [],
					panelPositionList = this.nonViewingArrange;

				for (j = panelPositionList.length - 1; j >= 0; j--) {
					panelPositions.push(panelPositionList.splice(j, 1)[0]);
				}

				for (i = 0; i < this.objects.length; i++) {
					objectfly = new this.Threejs.Object3D();
					if (i === Number(resultId)) {
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
					this.tweenAnimate(selectFly, 2000, [6, 6], resultId, false);
				} else {
					this.tweenAnimate(selectFly, 2000, [6, 6], resultId, true);
				}
			})
			.catch((err) => {
				console.log(err);
			})
	}

	RemoveBackground() {
		this.rendererP.render(this.sceneP, this.camera);
	}

	/**
	 * return (add back) the objects that made up the top level animations and navigation. (i.e. Remove Page with Content)
	 * */
	removePageRebuildMain() {
		let varyTransitions = [this.targets.table, this.targets.sphere, this.targets.helix, this.targets.grid],
			transition = varyTransitions[Math.floor(Math.random()) + Math.floor(Math.random()) + Math.floor(Math.random())];


		this.RebuildObjects();

		this.urlHandler.checkNavState();

		this.RebuildMainPage();

		this.tweenAnimate(transition, 500, [6, 6]);
	}

	// create new page
	ClearScene(returnResult) {
		return new Promise((resolve, reject) => {
			if (_.size(this.selectedList) > 0) {
				if (_.last(this.selectedList) !== this.keepId) { // check if the selected item is the current item todo is this necessary??
					console.log('clear scene', this.scene, this.pagePlane);
					this.ClearableElementsPresent();
				}
			} else {
				this.selectedList.push(this.keepId);
			}
			if(returnResult){
				resolve(this.keepId);
			} else {
				resolve();
			}

		})

	}

	ClearableElementsPresent() {
		let i;

		for (i = 0; i < this.scene.children.length; i++) {
			if (this.scene.children[i].name === 'html') {
				this.scene.remove(this.scene.children[i]); // remove the page content cssScene object from the cssScene
			}
		}
		for (i = this.sceneP.children.length - 1; i >= 0; i--) {
			this.sceneP.remove(this.sceneP.children[i]); // remove all the threeJS objects from the scene (prevents the display of multiple at any time)
		}

		this.selectedList.push(this.keepId);
	}

	addPageObjects(Attach) {
		return new Promise((resolve, reject) => {
			let i;
			console.log('addPageObjects scene', this.scene, this.pagePlane);
			for (i = 0; i < this.scene.children.length; i++) {
				if (this.scene.children[i].name === Number(this.keepId)) {
					this.scene.remove(this.scene.children[i]);
				}
			}
			console.log('addPageObjects page plane',this.pagePlane.children);
			$('span.page-title-name').addClass('hide-element');
			for (i = 0; i < this.pagePlane[this.keepId].children.length; i++) {
				this.sceneP.add(this.pagePlane[this.keepId].children[i].clone(true));
			}

			this.sceneP.add(this.lightD.clone(true));
			this.rendererP.render(this.sceneP, this.camera);
			this.rendererP.domElement.className = 'currentPageDisplay';
			Attach.appendChild(this.rendererP.domElement);
			$("canvas").addClass('currentPageDisplay');
			resolve(this.keepId);
		})

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
		let xmlRequest,
			pageElement = document.createElement('div');
		pageElement.className = classes;
		xmlRequest = new XMLHttpRequest();

		xmlRequest.onreadystatechange = () => {

			if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {

				$(pageElement).html(xmlRequest.responseText);

				let toggleButton = document.createElement('button');
				toggleButton.textContent = 'Return';
				toggleButton.className = 'template-return-button mdl-button-return  mdl-js-button mdl-js-ripple-effect';

				pageElement.querySelector('div.button-attach').appendChild(toggleButton);
			}

			xmlRequest.onload = () => {
				let object = new this.Threejs.CSS3DObject(pageElement);
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
				let landscapeMessage = document.createElement('span');
				landscapeMessage.textContent = 'To better view site rotate to landscape ';
				landscapeMessage.className = 'better-view-message';
				if (pageElement.querySelector('div.messageAttach') !== null) {
					pageElement.querySelector('div.messageAttach').appendChild(landscapeMessage);
				}
			}
			// dispatch event to button control to attach listeners to template buttons
			let pageCreatedEvent = new Event('ContentPageCreated');
			document.dispatchEvent(pageCreatedEvent);
		}
	}

	// remove page
	RebuildObjects() {
		let i;
		for (i = this.sceneP.children.length - 1; i >= 0; i--) {
			this.sceneP.remove(this.sceneP.children[i]);
		}

		$('span.page-title-name').removeClass('hide-element');
		$("canvas").remove();
		this.rendererP.render(this.sceneP, this.camera);
	}

	RebuildMainPage() {
		let i,
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
			//this.AnimateAddPageObjectsVertical(this.selectedList, true);
		} else {
			this.AnimateAddPageObjects(this.selectedList, true);
		}


	};

}

