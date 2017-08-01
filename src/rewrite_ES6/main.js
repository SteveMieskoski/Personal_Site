import sceneSetup from "./sceneSetupClass.js";
import UrlHandler from "./urlHandler.js";

const _ = require('lodash');
const $ = require("../lib/jquery.min.js");

export class PersonalSite {
	constructor(THREE, TWEEN, cssContainerId, dataArray) {
		// Initial Setup 
		this.Threejs = THREE; // capture Three.js as an internal object
		this.Tweenjs = TWEEN; // capture Tween.js as an internal object
		this.keepId = null;
		this.dataArray = dataArray;
		this.dataTemp = this.derivedDataItems(dataArray);

		this.dataObject = this.dataTemp.dataObject;
		this.dataReverseIds = this.dataTemp.dataReverseIds;
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
		//	this.mainMenuListener();


		//
		this.initBrowserNav();

	}

	// TODO FIGURE OUT WHY historyItem  IS SCREED UP WHEN NAVIGATING VIA BACK BUTTON TO HOME PAGE (& ALSO POSSIBLY WHERE MAIN PAGE IS LAST ITEM IN HISTORY) (i.e. when user started site navigation at he home page.
	derivedDataItems(arrayData) {
		let holdingVariable = {};
		let reverseIds = {MainPage: 9999};
		for (let i = 0; i < arrayData.length; i++) {
			//var j = arrayData[i].id;
			arrayData[i].id = i;
			holdingVariable[i] = arrayData[i];
			reverseIds[arrayData[i].loc] = i;
		}
		console.log('dataObject', holdingVariable, 'reverseIds', reverseIds);
		return {dataObject: holdingVariable, dataReverseIds: reverseIds};

	}

	//setup Top
	init() {

		//function start() {


		let windowResize = () =>{
			this.perspectiveCorrect();
		};
		let innerTween = this.Tweenjs;

		window.addEventListener('resize', windowResize, false);
		this.renderer.render(this.scene, this.camera);
		this.urlInit();
		/*.then((result) => {
			if (result === 'MainPage') {
				this.tweenAnimate(target, 2000)
					.then(() => {

					});
			} else {
				this.initialPageAdd(result);
			}
			animate();

			function animate() {
				requestAnimationFrame(animate);
				innerTween.update();
			}
		});*/
		this.mainMenuListener();
	}

	urlInit() {
		//return new Promise((resolve, reject) => {
		let target;
		if (window.innerWidth < window.innerHeight) {
			target = this.targets.column;
		} else {
			target = this.targets.table;
		}

		this.urlHandler.checkInitUrl()
			.then((vars) => {
				console.log(vars);
				let innerTween = this.Tweenjs;
				this.selectedList = [vars];
				if (vars === 'MainPage') {
					this.tweenAnimate(target, 2000)
						.then(() => {

						});
				} else {
					this.initialPageAdd(vars);
				}

				animate();

				function animate() {
					requestAnimationFrame(animate);
					innerTween.update();
				}
			});
	}


	initBrowserNav() {
		this.urlHandler.handleBackForward((varsPage, beginningLocation) => {
			if (beginningLocation) {
				console.log('init url in init browser nav');
				this.urlHandler.checkInitUrl()
					.then((result) =>{
						this.selectedList = [result];
						this.scene.add(this.objects[this.selectedList[this.selectedList.length - 1]]);
						this.AnimateAddPage(String(result), false, false);
					})
			} else {
				this.scene.add(this.objects[this.selectedList[this.selectedList.length - 1]]);
				this.AnimateAddPage(String(varsPage), false, false);
			}
		}, () => {
			console.log('rebuild main from urlHandler callback');
			this.removePageRebuildMain();
		});
	}

	animateForOrientation(keepId, resized) {
		if (window.innerWidth > window.innerHeight) {
			this.AnimateAddPage(keepId, resized, false);
		} else {
			this.AnimateAddPage(keepId, resized, true);
		}
	}

	// Button Control
	mainMenuListener() {
		// listen for click event on a topic panel
		$('div.element').click((evt) => {
			let selectedId = "div#" + $(evt.currentTarget).attr('id');
			$('div.element').not(selectedId).detach(); // keep the clicked topic panel and remove the rest
			this.beginningLocation = false; // todo Figure out why this is here.  Believe it is to signify that further click are not from the main menu.
			this.scene.add(this.objects[$(evt.currentTarget).attr('id')]);
			this.scene.add(this.objects[this.selectedList[this.selectedList.length - 1]]);
			this.animateForOrientation($(evt.currentTarget).attr('id'), false)
			// if (window.innerWidth > window.innerHeight) {
			// 	this.AnimateAddPage($(evt.currentTarget).attr('id'), false, false);
			// } else {
			// 	this.AnimateAddPage($(evt.currentTarget).attr('id'), false, true);
			// }
		});

		/**
		 * Handle opening the display examples drawer with buttons to manipulate the orientation of panel elements
		 */
		$("#Main-Display-Animations").click(() => {
			let drawerElement = $("div.cd-layout__drawer-display");
			drawerElement.toggleClass("cd-not-visible").toggleClass("cd-is-visible");
			if (window.innerWidth < 1024) {
				drawerElement.toggleClass("drawer-small-screen-display");
			}
			document.addEventListener('click', closeMenuClickVert);
		});

		function closeMenuClickVert(event) {
			let navHeight = Math.floor(window.innerHeight * 0.2),
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
		// create anonymous closures to preserve 'this' context/value
		let addPageContent = () => {
			this.AddPageObjects(this.keepId)
		};
		let waitToAdd = () => {
			setTimeout(addPageContent, 250);
		};
		document.addEventListener('AddPageObjects', waitToAdd);
		// create anonymous closure to preserve 'this' context/value
		let ContentPageCreated = () => {
			this.TemplateButtonListeners();
		};
		document.addEventListener('ContentPageCreated', ContentPageCreated);
	}

	buttonListeners() {
		document.getElementById('table')
			.addEventListener('click', (event) => {
				this.tweenAnimate(this.targets.table, 2000);
			}, false);

		document.getElementById('sphere')
			.addEventListener('click', (event) => {
				this.tweenAnimate(this.targets.sphere, 2000);
			}, false);

		document.getElementById('helix')
			.addEventListener('click', (event) => {
				this.tweenAnimate(this.targets.helix, 2000);
			}, false);

		document.getElementById('grid')
			.addEventListener('click', (event) => {
				this.tweenAnimate(this.targets.grid, 2000);
			}, false);
	}

	TemplateButtonListeners() {
		let regex = new RegExp('preparation');
		let programmingRegex = new RegExp('languages');

		$('button.template-return-button').click(() => {
			this.removePageRebuildMain();
		});

		// If preparation page template add click listener for demo-app-0 dialog
		if (regex.test(window.location.search.substring(1))) {
			$('div#demo-app-0').click(() => {
				this.exampleButtonClicked('http://steve-mieskoski-demo-app-2.herokuapp.com');
			});
			$('div#demo-app-1').click(() => {
				this.exampleButtonClicked('http://steve-mieskoski.herokuapp.com/home');
			});
		}
		if (programmingRegex.test(window.location.search.substring(1))) {
			$('div#circleJavascript').append('<div class="circular"></div>');
			let JSLevel = document.querySelector('#circleJavascript');

			JSLevel.appendChild('<div class="circular"></div>')
		}

	}

	exampleButtonClicked(url) {
		let dialog = document.createElement('dialog');
		dialog.style.cssText = 'width: 95%; height: 95%; z-index: 1; overflow: visible;  overflow-y: scroll; ';
		dialog.id = 'exampleDialog';
		let dialogIframe = document.createElement('iframe');
		dialogIframe.src = url;
		dialogIframe.style.cssText = 'width: 95%; height: 95%; z-index: 1; overflow: visible;  overflow-y: scroll; ';
		dialogIframe.id = 'exampleIframe';
		let closeButton = document.createElement('button');
		document.getElementById('attachOutputs').appendChild(dialog);
		document.getElementById('exampleDialog').appendChild(dialogIframe);

		let closeButtonScript = [
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
	tweenAnimate(targets, duration, keepId, incrementStop) {
		return new Promise((resolve, reject) => {
			let pageAdded = false;
			let i, counter, tweening, Render, object, target;
			console.log('tween animate"');
			counter = 0;
			this.Tweenjs.removeAll();
			if (incrementStop) {
				this.rendererP.render(this.sceneP, this.camera);
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
				if (counter > 90 && incrementStop && !pageAdded) {
					//tweening.stop();
					pageAdded = true;
					this.keepId = keepId;
					let pageCreatedEvent = new Event('AddPageObjects');
					document.dispatchEvent(pageCreatedEvent);
				}
				this.renderer.render(this.scene, this.camera);
			};

			tweening = new this.Tweenjs.Tween(this)

				.to({}, duration * 2)
				.onUpdate(Render)
				.onComplete(() => {
					console.log('Tween Complete');
					resolve(keepId);
				})
				.start();
		})
	};

	// runCreateOrDestroy
	initialPageAdd(keepId) {
		this.removeSelectedChild(Number(keepId));
		this.animateForOrientation(keepId, false)
		// if (window.innerWidth > window.innerHeight) {
		// 	this.AnimateAddPage(keepId, false, false);
		// } else {
		// 	this.AnimateAddPage(keepId, false, true);
		// }
	}

	/**
	 * remove objects that make up the top level animations and navigation. (i.e. Add Page with Content)
	 * and add the HTML and content to fill page background
	 * */
	AddPageObjects(keepId) {
		this.urlHandler.checkNavState(keepId);
		let rendererAttach = document.getElementById('container');
		this.ClearScene(keepId)
			.then(
				this.addPageObjects(keepId, rendererAttach).then(() => {
					let classes, templatePath;
					templatePath = this.dataObject[keepId].template;
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
		this.perspectiveCorrect(true);
	}

	AnimateAddPage(keepId, fromResize, vertical) {
		let panelPositionList;
		if (vertical) {
			panelPositionList = [{x: 1000, y: 0}, {x: 1000, y: -200}, {x: -1000, y: -600}, {
				x: -1000,
				y: -200
			}, {x: -1000, y: 200}, {x: -1000, y: 0}, {x: -1000, y: 400}, {x: -1000, y: -400}];
		} else {
			panelPositionList = [{x: 1000, y: 0}, {x: 1000, y: -200}, {x: -1000, y: -600}, {
				x: -1000,
				y: -200
			}, {x: -1000, y: 200}, {x: -1000, y: 0}, {x: -1000, y: 400}, {x: -1000, y: -400}];
		}

		this.ClearScene(keepId);

		let objectfly,
			selectFly = [],
			panelPositions = [];

		for (let j = panelPositionList.length - 1; j >= 0; j--) {
			panelPositions.push(panelPositionList.splice(j, 1)[0]);
		}

		for (let i = 0; i < this.objects.length; i++) {
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
			this.tweenAnimate(selectFly, 2000, keepId, false);
		} else {
			this.tweenAnimate(selectFly, 2000, keepId, true);
		}

	}


	// create new page
	ClearScene(keepId, returnResult) {
		return new Promise((resolve, reject) => {
			if (_.size(this.selectedList) > 0) {
				if (this.selectedList[this.selectedList.length - 1] !== keepId) {
					this.removeSelectedChild('html');
					this.removeSceneChildren(this.sceneP);
					this.selectedList = [keepId];
				}
			} else {
				this.selectedList = [keepId];
			}

			if (returnResult) {
				resolve(keepId);
			} else {
				resolve();
			}
		})

	}

	addPageObjects(keepId, Attach) {
		return new Promise((resolve, reject) => {
			this.removeSelectedChild(Number(keepId));
			$('span.page-title-name').addClass('hide-element');
			for (let i = 0; i < this.pagePlane[keepId].children.length; i++) {
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

	// create page content
	loadHtmlFile(filename, classes) {
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

		let afterLoadendSetups = () => {
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
		};

		xmlRequest.addEventListener('loadend', afterLoadendSetups, false);
	}

	/**
	 * return (add back) the objects that made up the top level animations and navigation. (i.e. Remove Page with Content)
	 * */
	removePageRebuildMain() {
		let varyTransitions = [this.targets.table, this.targets.sphere, this.targets.helix, this.targets.grid],
			transition = varyTransitions[Math.floor(Math.random()) + Math.floor(Math.random()) + Math.floor(Math.random())];
		this.removeSceneChildren(this.sceneP);
		$('span.page-title-name').removeClass('hide-element');
		$("canvas").remove();
		this.rendererP.render(this.sceneP, this.camera);
		this.urlHandler.checkNavState();
		let replaceObject = Object.assign({}, this.objects);
		$('div.primary-view').removeClass('primary-view');
		$('div.navItems >  button.togglePage').remove();
		this.removeSceneChildren(this.scene);
		for (let i = 0; i < this.objects.length; i++) {
			replaceObject[i].position.x = -1800;
			replaceObject[i].position.y = Math.random() * 50 - 425;
			replaceObject[i].position.z = -3300;
			this.scene.add(replaceObject[i]);
		}
		this.camera.position.z = 1000;
		this.tweenAnimate(transition, 500, [6, 6]);
	}

	removeSelectedChild(match) {
		for (let i = 0; i < this.scene.children.length; i++) {
			if (this.scene.children[i].name === match) {
				this.scene.remove(this.scene.children[i]);
			}
		}
	}

	removeSceneChildren(scene) {
		for (let i = scene.children.length - 1; i >= 0; i--) {
			scene.remove(scene.children[i]);
		}
	}


	perspectiveCorrect(noAnimate) {
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
		if (!noAnimate || noAnimate === undefined) {
			this.animateForOrientation(this.selectedList, true);
			// if (window.innerHeight > window.innerWidth) {
			// 	this.AnimateAddPage(this.selectedList, true, false);
			// } else {
			// 	this.AnimateAddPage(this.selectedList, true, true);
			// }
		}

	};

}

